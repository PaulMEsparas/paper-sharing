import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { provinces, papers, grades, types } from "../services/app";
import { addPaper } from "../services/Paper";

function UploadPaper() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paper, setPaper] = useState({
    name: "",
    year: "",
    subject: "",
    grade: "",
    provinces: "",
    type: "",
  });

  const [file, setFile] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPaper({
      ...paper,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.target.disabled = true;
    setIsLoading(true);
    e.preventDefault();
    try {
      await addPaper(paper, file);
      setIsLoading(true);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      e.target.disabled = true;
    }
  };

  return (
    <>
      <div className="container mx-auto my-3 ">
        <Link
          to="/profile"
          className="rounded-lg border-green-900 bg-green-900 text-white text-sm py-3 px-5 mx-1"
        >
          Go Back
        </Link>
      </div>
      <div className="container mx-auto  my-5 ">
        <form className="flex flex-col" action="">
          <input
            placeholder="Paper"
            type="text"
            name="name"
            onChange={handleUserInput}
            className="outline-none my-2 border  border-slate-300 rounded-lg text-sm px-2 py-3 focus:border-slate-500"
          />
          <input
            placeholder="Year"
            type="text"
            name="year"
            onChange={handleUserInput}
            className="outline-none my-2 border  border-slate-300 rounded-lg text-sm px-2 py-3 focus:border-slate-500"
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
          <Select
            name="provinces"
            handleChange={handleUserInput}
            options={provinces}
          />
          <Select name="type" handleChange={handleUserInput} options={types} />
          {/* <select
            className="outline-none my-2 border  border-slate-300 rounded-lg text-sm px-2 py-3"
            name="grade"
            onChange={handleUserInput}
          >
            <option value="">Choose Grade</option>
            <option value="">Grade 10</option>
            <option value="">Grade 11</option>
            <option value="">Grade 12</option>
          </select>
          <select
            className="outline-none my-2 border  border-slate-300 rounded-lg text-sm px-2 py-3"
            name="type"
            onChange={handleUserInput}
          >
            <option value="">Choose Type </option>
            <option value="">Memo</option>
            <option value="">Question</option>
          </select> */}
          <input
            accept="application/pdf"
            type="file"
            onChange={handleFileInput}
            className="border my-2 block rounded-lg  border-slate-300 px-3 py-1 outline-none focus:border-slate-500"
          />
          <button
            onClick={handleSubmit}
            className=" disabled:bg-green-800 rounded-lg border-green-900 bg-green-900 text-white text-sm py-3 px-5 mx-1"
          >
            {isLoading ? "Submitting . . ." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default UploadPaper;
