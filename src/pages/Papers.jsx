import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { grades, provinces } from "../services/app";
import { deletePaper, getPapersByUser } from "../services/papers";

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const fetchPapers = async () => {
    const values = await getPapersByUser();
    setPapers(values);
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleDeletePaper = async (paperID, fileUrl) => {
    if (!confirm("Are you sure you want to delete this paper?")) return;
    try {
      await deletePaper(paperID, fileUrl);
      window.location.href = "/profile";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto my-3">
        <Link
          to="/profile/new"
          className="rounded-lg border border-green-900 bg-green-900 text-white text-sm py-3 px-5 mx-1 inline-block"
        >
          Add New Paper
        </Link>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 my-3">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="w-full border border-slate-100 rounded-lg shadow-sm px-3 py-6"
          >
            <small className="text-xs">{paper.type}</small>
            <h2 className="font-semibold">{paper.name}</h2>
            <p>
              {grades.find((grade) => grade.value === paper.grade).name}, Year{" "}
              {paper.year}
            </p>
            <p>
              {provinces.find((prov) => prov.value === paper.province).name}
            </p>
            <a
              href={paper.fileUrl}
              download
              className="text-blue-500 text-sm underline"
            >
              Download
            </a>
            <button
              onClick={() => {
                handleDeletePaper(paper.id, paper.fileUrl);
              }}
              className="text-red-600 text-sm mx-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Papers;
