import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./Firebase";

//function to login
export const loginUser = async ({ email, password }) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

//function to create user
export const registerUser = async ({ name, email, password }) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);

  if (response.user) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  }
  return response;
};

export const getUser = () => {
  if (auth.currentUser === null) return;
  const { currentUser } = auth;
  console.log(currentUser);
  return {
    name: currentUser.displayName,
    email: currentUser.email,
    verified: currentUser.emailVerified,
    userID: currentUser.uid,
  };
};
