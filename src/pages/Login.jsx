import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/User";
import { auth } from "../services/Firebase";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loggedIn, setLoggedIn] = useState(null);

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

  const handleUserLogin = async (e) => {
    e.target.disabled = true;
    e.preventDefault();
    try {
      await loginUser(user);
    } catch (err) {
      console.error(err.messsage);
      e.target.disabled = false;
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <form>
        <h2 className="text-orange-400 font-bold text-3xl ">Login</h2>

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
          onClick={handleUserLogin}
          type="submit"
          className="border-none my-2 block rounded-lg w-96 border-slate-300 px-3 py-1 outline-none focus:border-slate-500 bg-orange-400 text-white disabled:bg-orange-200"
        >
          Submit
        </button>
        <Link to="/register" className="text-sm text-slate-500 ">
          Don't have an account? Register...
        </Link>
      </form>
    </div>
  );
}

export default Login;
