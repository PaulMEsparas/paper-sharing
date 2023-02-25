import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { loginUser } from "../services/users";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(null);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setLoggedIn(user);
    });

    if (loggedIn) {
      navigate("/profile");
    }

    return () => unsub();
  });

  const handleLoginUser = async (e) => {
    e.target.disabled = true;
    e.preventDefault();
    try {
      await loginUser(user);
    } catch (error) {
      console.log(error);
      e.target.disabled = false;
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <form>
        <h2 className="text-orange-400 font-bold text-3xl">LOGIN</h2>
        <input
          placeholder="Enter your email"
          type="email"
          name="email"
          onChange={handleUserInput}
          className="border border-slate-300 rounded-lg w-96 px-3 py-2 outline-none focus:border-slate-500 block my-2"
        />
        <input
          name="password"
          onChange={handleUserInput}
          placeholder="Enter your password"
          type="password"
          className="border border-slate-300 rounded-lg w-96 px-3 py-2 outline-none focus:border-slate-500 block my-2"
        />
        <button
          onClick={handleLoginUser}
          type="submit"
          className="border-none rounded-lg w-96 px-3 py-2 outline-none focus:border-slate-500 block my-2 bg-orange-400 text-white disabled:bg-orange-200"
        >
          Submit
        </button>
        <Link to="/register" className="text-sm text-slate-500">
          Don't have an account? Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
