import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Papers from "./Papers";
import UploadPaper from "./UploadPaper";
import { AuthContext } from "../Context/AuthProvider";
import { useContext } from "react";

function Profile() {
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <Nav />
      <div className=" relative container mx-auto flex items-center flex-col justify-center bg-orange-400 text-white rounded-xl shadow-lg text-center p-10">
        <h1 className="text-3xl font-bold">All the papers you have uploaded</h1>
        <p>You can manage profile here, uploading and deleting your papers</p>
        <button
          onClick={signOut}
          className="absolute right-3 bottom-3 bg-white text-orange-500 rounded-lg px-2 py-1 text-sm"
        >
          Sign out
        </button>
      </div>

      <Outlet />
    </>
  );
}

export default Profile;
