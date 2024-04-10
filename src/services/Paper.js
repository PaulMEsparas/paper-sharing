import { getUser } from "./User";
import {
  getDownloadURL,
  ref,
  getStorage,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";
import { provinces } from "./app";

const paperRef = collection(db, "papers");

const uploadPaper = async (file) => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `papers/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

//paper is all the details and file is the pdf file itself
export const addPaper = async (paper, file) => {
  const { userID } = getUser();

  const fileUrl = await uploadPaper(file);

  if (!fileUrl) throw new Error("Failed to upload your file. Try again");

  const newPaper = {
    ...paper,
    userID,
    fileUrl,
  };

  const response = await addDoc(paperRef, newPaper);
  return response;
};

//get data from firestore for the user who is logged in
export const getPapersByUser = async () => {
  const { userID } = getUser();
  const data = [];
  const simpleQuery = query(paperRef, where("userID", "==", userID));
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

//get all data from firestore for all the users
// filters = {
//     grade : "",
//     provinces:'',
//     subject :""
// }

export const getPapers = async (filters) => {
  let compoundQuery = query(paperRef);
  if (filters?.grade !== "-1" && filters?.grade) {
    compoundQuery = query(compoundQuery, where("grade", "==", filters.grade));
  }
  if (filters?.provinces !== "-1" && filters?.provinces) {
    compoundQuery = query(
      compoundQuery,
      where("provinces", "==", filters.provinces)
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

//delete storage and doc

export const deletePaper = async (paperID, fileUrl) => {
  // delete the document
  const docRef = doc(db, "papers", paperID);
  await deleteDoc(docRef);

  // delete the file from storage
  const storage = getStorage();
  const fileRef = ref(storage, fileUrl);
  await deleteObject(fileRef);
};
