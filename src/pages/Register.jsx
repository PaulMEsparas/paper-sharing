import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { registerUser } from "../services/users";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loggedIn, setLoggedIn] = useState(null);

  //
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setLoggedIn(user);
    });

    if (loggedIn) {
      navigate("/profile");
    }

    return () => unsub();
  });

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUserRegistration = async (e) => {
    e.target.disabled = true;
    e.preventDefault();
    try {
      await registerUser(user);
    } catch (error) {
      console.log(error);
      e.target.disabled = false;
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <form>
        <h2 className="text-orange-400 font-bold text-3xl">REGISTER</h2>
        <input
          name="name"
          onChange={handleUserInput}
          placeholder="Enter your name"
          type="text"
          className="border border-slate-300 rounded-lg w-96 px-3 py-2 outline-none focus:border-slate-500 block my-2"
        />
        <input
          name="email"
          onChange={handleUserInput}
          placeholder="Enter your email"
          type="email"
          className="border border-slate-300 rounded-lg w-96 px-3 py-2 outline-none focus:border-slate-500 block my-2"
        />
        <input
          onChange={handleUserInput}
          name="password"
          placeholder="Create your password"
          type="password"
          className="border border-slate-300 rounded-lg w-96 px-3 py-2 outline-none focus:border-slate-500 block my-2"
        />
        <button
          onClick={handleUserRegistration}
          type="submit"
          className="disabled:bg-orange-200 border-none rounded-lg w-96 px-3 py-2 outline-none focus:border-slate-500 block my-2 bg-orange-400 text-white"
        >
          Submit
        </button>
        <Link to="/login" className="text-sm text-slate-500">
          Have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
