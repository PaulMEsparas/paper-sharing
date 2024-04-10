import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/User";
import { auth } from "../services/Firebase";

function Register() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setLoggedIn(user);
    });
    if (loggedIn) {
      navigate("/profile");
    }

    return () => unsub();
  });

  //gets all info from the register form
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // gets all the values and register using email and password
  const handleUserRegistration = async (e) => {
    e.target.disabled = true;
    e.preventDefault();
    try {
      await registerUser(user);
    } catch (err) {
      console.error(err.messsage);
      e.target.disabled = false;
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <form>
        <h2 className="text-orange-400 font-bold text-3xl ">Register</h2>
        <input
          onChange={handleUserInput}
          placeholder="Name"
          name="name"
          type="text"
          className="border my-2 block rounded-lg w-96 border-slate-300 px-3 py-1 outline-none focus:border-slate-500"
        />
        <input
          onChange={handleUserInput}
          placeholder="Email"
          name="email"
          type="email"
          className="border my-2 block rounded-lg w-96 border-slate-300 px-3 py-1 outline-none focus:border-slate-500"
        />
        <input
          onChange={handleUserInput}
          placeholder="Password"
          name="password"
          type="password"
          className="border my-2 block rounded-lg w-96 border-slate-300 px-3 py-1 outline-none focus:border-slate-500"
        />
        <button
          onClick={handleUserRegistration}
          type="submit"
          className="border-none my-2 block rounded-lg w-96 border-slate-300 px-3 py-1 outline-none focus:border-slate-500 bg-orange-400 text-white disabled:bg-orange-200"
        >
          Submit
        </button>
        <Link to="/login" className="text-sm text-slate-500 ">
          Have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
