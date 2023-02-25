import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Select from "../components/Select";
import { grades, papers, provinces } from "../services/app";
import { getPapers } from "../services/papers";

const Home = () => {
  const [filters, setFilters] = useState({
    province: "-1",
    subject: "-1",
    grade: "-1",
  });

  const [values, setValues] = useState([]);
  const fetchPapers = async () => {
    const papers = await getPapers(filters);
    setValues(papers);
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFiltering = async () => {
    try {
      await fetchPapers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <div className="h-56 container mx-auto bg-orange-400 text-white rounded-xl shadow-lg flex items-center flex-col justify-center p-10 text-center">
        <h1 className="text-3xl font-bold">
          Find All The Previous Question Papers from G10 - 12
        </h1>
        <p>You can upload all the question papers and memos you have!</p>
      </div>
      <div className="container mx-auto my-4">
        <Select
          name="subject"
          handleChange={handleUserInput}
          options={papers}
        />
        <Select name="grade" handleChange={handleUserInput} options={grades} />
        <Select
          name="province"
          handleChange={handleUserInput}
          options={provinces}
        />
        <button
          onClick={handleFiltering}
          className="rounded-lg border border-green-900 bg-green-900 text-white text-sm py-3 px-5 mx-1"
        >
          Filter
        </button>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2">
        {values.map((value) => (
          <div
            key={value.id}
            className="w-full border border-slate-100 rounded-lg shadow-sm px-3 py-6"
          >
            <small className="text-xs">{value.type}</small>
            <h2 className="font-semibold">{value.name}</h2>
            <p>
              {grades.find((grade) => grade.value === value.grade).name}, Year{" "}
              {value.year}
            </p>
            <p>
              {provinces.find((prov) => prov.value === value.province).name}
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
      </div>
    </>
  );
};

export default Home;
