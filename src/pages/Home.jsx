import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { getPapers } from "../services/Paper";
import { auth } from "../services/Firebase";
import Select from "../components/Select";
import { provinces, papers, grades } from "../services/app";

function Home() {
  const [filters, setFilters] = useState({
    subject: "-1",
    grades: "-1",
    provinces: "-1",
  });

  const [values, setValues] = useState([]);

  const fetchPapers = async () => {
    const values = await getPapers(filters);
    setValues(values);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) fetchPapers();
    });
  }, []);

  // console.log(values);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  console.log(filters, values);

  const handleFiltering = async () => {
    try {
      await fetchPapers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto flex items-center flex-col justify-center bg-orange-400 text-white rounded-xl shadow-lg text-center p-10">
        <h1 className="text-3xl font-bold">
          Find all the previous question papers from G10-12
        </h1>
        <p>You can upload all the question papers and memos you have!</p>
        <p>Sign in using user@user.com with the password 123456 hello</p>
      </div>
      <div className="container mx-auto my-4 ">
        <Select
          name="subject"
          handleChange={handleUserInput}
          options={papers}
        />
        <Select name="grade" handleChange={handleUserInput} options={grades} />
        <Select
          name="provinces"
          handleChange={handleUserInput}
          options={provinces}
        />
        {/* <select
          className="outline-none border rounded-lg text-sm px-2 py-3 mr-1"
          name=""
          id=""
        >
          <option value="">Choose Subject</option>
          <option value="">Mathermatics</option>
          <option value="">Science</option>
          <option value="">Accounting</option>
          <option value="">Physical Science</option>
        </select>
        <select
          className="outline-none border rounded-lg text-sm px-2 py-3 mr-1"
          name=""
          id=""
        >
          <option value="">Choose Grade</option>
          <option value="">Grade 10</option>
          <option value="">Grade 11</option>
          <option value="">Grade 12</option>
        </select>
        <select
          className="outline-none border rounded-lg text-sm px-2 py-3 mr-1"
          name=""
          id=""
        >
          <option value="">Choose ... </option>
          <option value="">National</option>
          <option value="">Isabel</option>
          <option value="">Marvel</option>
          <option value="">Tulay</option>
        </select> */}
        <button
          onClick={handleFiltering}
          className="rounded-lg border-green-900 bg-green-900 text-white text-sm py-3 px-5 mx-1"
        >
          Filter
        </button>
        <div className="container mx-auto grid grid-cols-1 gap-3 my-5 md:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.id}
              className="w-full border border-slate-100 rounded-lg shadow-sm px-3 py-6"
            >
              <small className="text-xs">{value.type}</small>
              <h2 className="font-semibold">
                {papers.find((paper) => paper.value === value.subject).name}
              </h2>
              <p>
                {grades.find((grade) => grade.value === value.grade).name}, Year{" "}
                {value.year}
              </p>
              <p>
                {
                  provinces.find(
                    (province) => province.value === value.provinces
                  ).name
                }
              </p>
              <a
                href={value.fileUrl}
                download="true"
                target={"_blank"}
                className="text-blue-500 text-sm block underline"
              >
                Download
              </a>
            </div>
          ))}

          {/* <div className="w-full border border-slate-100 rounded-lg shadow-sm px-3 py-6">
            <small className="text-xs">Memo</small>
            <h2 className="font-semibold">Mathermatics Paper 2</h2>
            <p>Grade</p>
            <p>place</p>
            <a
              href=""
              download
              className="text-blue-500 text-sm block underline"
            >
              Download
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
