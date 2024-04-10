import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/Firebase";
function Nav() {
  const user = auth.currentUser;
  return (
    <nav className="container mx-auto flex justify-between p-5">
      <h2 className="font-bold text-xl text-orange-500">
        <Link to="/">Old Papers</Link>
      </h2>
      <div className="flex gap-5 justify-center flex-row items-center">
        <Link to="/" className="text-orange-800">
          Home
        </Link>
        <Link
          to={user ? "/profile" : "/login"}
          className="bg-orange-400 text-white py-1 px-3 rounded-xl shadow-lg"
        >
          {user ? "Profile" : "Get Started"}
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
