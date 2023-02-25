import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

const Nav = () => {
  const user = auth.currentUser;
  return (
    <nav className="container mx-auto flex justify-between p-5">
      <h2 className="font-semibold text-orange-400 ">
        <Link to="/">OldPapers</Link>
      </h2>
      <div className="flex gap-5 justify-center flex-row items-center">
        <Link to="/" className="text-orange-800">
          Home
        </Link>
        <Link
          to={user ? "/profile" : "/login"}
          className="bg-orange-400 text-white py-3 px-2 rounded-xl shadow-lg"
        >
          {user ? "Profile" : "Get Started"}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
