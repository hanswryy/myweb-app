import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import SideBarMain from './components/SideBarMain';

function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [dramas, setDramas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalCount, setTotalCount] = useState(0); // Total count state
  const dramasPerPage = 12; // Dramas per page
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  useEffect(() => {
    const fetchDramas = async () => {
      const response = await fetch(`/dramas?page=${currentPage}&limit=${dramasPerPage}`);
      const data = await response.json();
      setDramas(data); // Get dramas from API response
    };

    const fetchTotalCount = async () => {
      const response = await fetch('/count');
      const data = await response.json();
      setTotalCount(data.count); // Get total count from API response
    };

    fetchDramas();
    fetchTotalCount();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPage]); // Dependency array includes currentPage

  const totalPages = Math.ceil(totalCount / dramasPerPage); // Calculate total pages

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold z-10">DramaKu</h1>
          <div>
            <input
              type="text"
              placeholder="Search Drama"
              className="border border-gray-300 rounded-full px-4 py-2 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="w-1/5 hidden lg:block h-full absolute top-0 left-0 p-20 bg-blue-200">
            <SideBarMain selectedOption="dramas"/>
          </div>

          <div className="lg:w-1/6"/>

          <div className="w-full lg:w-5/6">
            <div>
            <div>
              {isMobile ? (
                <div className='block lg:hidden items-center justify-between'>
                  <div className="flex items-start justify-between">
                    <SideBarMain selectedOption="dramas"/>
                    <button
                      className="bg-blue-400 text-white px-4 py-2 rounded mb-4 mr-2"
                      onClick={() => setFiltersExpanded(!filtersExpanded)}
                    >
                    {filtersExpanded ? 'Hide Filters' : 'Show Filters'}
                    </button>
                  </div>
                  {filtersExpanded && (
                    <div className="flex flex-col space-y-2 mb-4">
                      <select className="border border-gray-300 rounded px-4 py-2">
                        <option>Year</option>
                      </select>
                      <select className="border border-gray-300 rounded px-4 py-2">
                        <option>Genre</option>
                      </select>
                      <select className="border border-gray-300 rounded px-4 py-2">
                        <option>Status</option>
                      </select>
                      <select className="border border-gray-300 rounded px-4 py-2">
                        <option>Availability</option>
                      </select>
                      <select className="border border-gray-300 rounded px-4 py-2">
                        <option>Award</option>
                      </select>
                      <select className="border border-gray-300 rounded px-4 py-2">
                        <option>Sorted by: Alphabetics</option>
                      </select>
                      <button className="bg-blue-400 text-white px-4 py-2 rounded">
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-row space-x-2 mb-4 flex-wrap">
                  <select className="border border-gray-300 rounded px-4 py-2">
                    <option>Year</option>
                  </select>
                  <select className="border border-gray-300 rounded px-4 py-2">
                    <option>Genre</option>
                  </select>
                  <select className="border border-gray-300 rounded px-4 py-2">
                    <option>Status</option>
                  </select>
                  <select className="border border-gray-300 rounded px-4 py-2">
                    <option>Availability</option>
                  </select>
                  <select className="border border-gray-300 rounded px-4 py-2">
                    <option>Award</option>
                  </select>
                  <select className="border border-gray-300 rounded px-4 py-2">
                    <option>Sorted by: Alphabetics</option>
                  </select>
                  <button className="bg-blue-400 text-white px-4 py-2 rounded">
                    Submit
                  </button>
                </div>
              )}
            </div>

              <div className={searchTerm ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                {dramas.map(drama => (
                  <Card key={drama.id} drama={drama} />
                ))}
              </div>

              {/* Pagination Buttons */}
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  className="bg-blue-400 text-white px-4 py-2 rounded"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button
                  className="bg-blue-400 text-white px-4 py-2 rounded"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
