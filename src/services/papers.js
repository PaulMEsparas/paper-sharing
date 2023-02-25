import { getUser } from "./users";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const papersRef = collection(db, "papers");

const uploadPaper = async (file) => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `papers/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addPaper = async (paper, file) => {
  const { userID } = getUser();
  const fileUrl = await uploadPaper(file);
  if (!fileUrl) throw new Error("Failed to upload your file. Try again.");
  const newPaper = {
    ...paper,
    userID,
    fileUrl,
  };
  const response = await addDoc(papersRef, newPaper);
  return response;
};

export const getPapersByUser = async () => {
  const { userID } = getUser();
  const data = [];
  const simpleQuery = query(papersRef, where("userID", "==", userID));
  const results = await getDocs(simpleQuery);
  results.forEach((result) => {
    if (result.exists()) {
      data.push({
        id: result.id,
        ...result.data(),
      });
    }
  });
  return data;
};

// filters = {
//   grade: "G11",
//   province: "LIM",
//   subject: "MAT"
// }
export const getPapers = async (filters) => {
  let compoundQuery = query(papersRef);
  if (filters?.grade !== "-1" && filters?.grade) {
    compoundQuery = query(compoundQuery, where("grade", "==", filters.grade));
  }

  if (filters?.province !== "-1" && filters?.province) {
    compoundQuery = query(
      compoundQuery,
      where("province", "==", filters.province)
    );
  }
  if (filters?.subject !== "-1" && filters?.subject) {
    compoundQuery = query(
      compoundQuery,
      where("subject", "==", filters.subject)
    );
  }
  const results = await getDocs(compoundQuery);
  const data = [];
  results.forEach((result) => {
    if (result.exists()) {
      data.push({
        id: result.id,
        ...result.data(),
      });
    }
  });
  return data;
};

export const deletePaper = async (paperID, fileUrl) => {
  const docRef = doc(db, "papers", paperID);
  await deleteDoc(docRef);

  //Delete the file from sotrage
  const storage = getStorage();
  const fileRef = ref(storage, fileUrl);
  await deleteObject(fileRef);
};
