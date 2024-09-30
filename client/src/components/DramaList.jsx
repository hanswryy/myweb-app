import React, { useEffect, useState } from "react";
import Card from "./Card";

const DramaList = () => {
  const [dramas, setDramas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/dramas?page=${currentPage}&limit=${itemsPerPage}`);
        const result = await response.json();
        setDramas(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching dramas:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dramas.map(drama => (
          <Card key={drama.id} drama={drama} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DramaList;