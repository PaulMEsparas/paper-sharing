import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { grades, papers, provinces, types } from "../services/app";
import { addPaper } from "../services/papers";

const UploadPaper = () => {
  const [paper, setPaper] = useState({
    name: "",
    year: "",
    subject: "",
    grade: "",
    type: "",
    province: "",
  });

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPaper({
      ...paper,
      [name]: value,
    });
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.target.disabled = true;
    e.preventDefault();
    try {
      await addPaper(paper, file);
      navigate("/profile");
    } catch (error) {
      e.target.disabled = true;
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto my-3">
        <Link
          to={"/profile"}
          className="rounded-lg inline-block border border-green-900 bg-green-900 text-white text-sm py-3 px-5"
        >
          Go back
        </Link>
      </div>
      <div className="container mx-auto  my-3">
        <form className="flex flex-col gap-2">
          <input
            placeholder="Paper"
            type="text"
            name="name"
            onChange={handleUserInput}
            className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500 block mr-1"
          />
          <input
            placeholder="Year"
            type="text"
            name="year"
            onChange={handleUserInput}
            className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500 block mr-1"
          />
          <Select
            name="subject"
            handleChange={handleUserInput}
            options={papers}
          />
          <Select
            name="grade"
            handleChange={handleUserInput}
            options={grades}
          />
          <Select name="type" handleChange={handleUserInput} options={types} />
          <Select
            name="province"
            handleChange={handleUserInput}
            options={provinces}
          />
          <input
            type="file"
            onChange={handleFileInput}
            accept="application/pdf"
            className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500 block mr-1"
          />
          <button
            onClick={handleSubmit}
            className="disabled:bg-green-200 border border-green-900 rounded-lg px-3 py-2 outline-none bg-green-900 text-white focus:border-slate-500 block mr-1"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadPaper;
