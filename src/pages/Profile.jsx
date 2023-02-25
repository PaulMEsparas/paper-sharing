import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <Nav />
      <div className="relative h-56 container mx-auto bg-orange-400 text-white rounded-xl shadow-lg flex items-center flex-col justify-center p-10 text-center">
        <h1 className="text-3xl font-bold">
          All the papers you have already uploaded
        </h1>
        <p>
          You can manage profile here... Uploading and deleting your papers.
        </p>
        <button
          onClick={signOut}
          className="absolute right-3 bottom-3 bg-white text-orange-500 rounded-lg px-4 py-1 text-sm"
        >
          Sign Out
        </button>
      </div>
      {/* You can alternatively wrap this OUTLET with the auth provider...  */}
      <Outlet />
    </>
  );
};

export default Profile;
