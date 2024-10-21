import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import SideBarMain from './components/SideBarMain';
// import jwt decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';

function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [dramas, setDramas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalCount, setTotalCount] = useState(0); // Total count state
  const dramasPerPage = 12; // Dramas per page
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    genre: "",
    platform: "",
    title: ""
  });
  const [role, setRole] = useState(null); // Role of the user
  const [userID, setUserID] = useState(null); // User ID
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User logged in state

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role); // Extract role from token
        setUserID(decodedToken.id); // Extract user ID from token
        setIsLoggedIn(true); // Set user as logged in
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    const fetchDramasAndCount = async () => {
      const query = new URLSearchParams({
        page: currentPage,
        limit: dramasPerPage,
        ...filters,
      }).toString();

      try {
        const response = await fetch(`/dramas?${query}`);
        const data = await response.json();
        setDramas(data.dramas); // Update dramas from API response
        setTotalCount(data.total); // Update total count from API response
      } catch (error) {
        console.error("Error fetching dramas:", error);
      }
    };

    fetchDramasAndCount();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPage, filters]); // Dependency array includes currentPage

  const totalPages = Math.ceil(totalCount / dramasPerPage); // Calculate total pages

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      title: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page when filters are applied
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setRole(null);
    window.location.reload();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end items-center mb-6 space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-green-400 text-white px-4 py-2 rounded"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </>
          ) : (
            <>
              {role === 0 && (
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded"
                  onClick={() => navigate('/cms')}
                >
                  CMS
                </button>
              )}
              {role === 1 && (
                <button
                  className="bg-purple-400 text-white px-4 py-2 rounded"
                  onClick={() => navigate('/watchlist')}
                >
                  Watchlist
                </button>
              )}
              <button
                className="bg-red-400 text-white px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
          <input
            type="text"
            placeholder="Search Drama"
            className="border border-gray-300 rounded-full px-4 py-2 w-64"
            value={filters.title}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="w-1/5 hidden lg:block fixed top-0 left-0 p-20 bg-blue-200">
            <Link className="text-2xl font-bold z-10" onClick={"/"}>DramaKu</Link>
            <SideBarMain selectedOption="dramas" />
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
                    <form className="flex flex-col space-y-2 mb-4" onSubmit={handleSubmit}>
                      <select
                        name="year"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={filters.year}
                        onChange={handleFilterChange}
                      >
                        <option value="">Year</option>
                        {/* Add year options */}
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                      </select>
                      <select
                        name="genre"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={filters.genre}
                        onChange={handleFilterChange}
                      >
                        <option value="">Genre</option>
                        {/* Add genre options */}
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                      </select>
                      {/* <select
                        name="status"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={filters.status}
                        onChange={handleFilterChange}
                      >
                        <option value="">Status</option>
                      </select> */}
                      <select
                        name="platform"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={filters.platform}
                        onChange={handleFilterChange}
                      >
                        <option value="">Availability</option>
                        {/* Add availability options */}
                        <option value="Netflix">Netflix</option>
                        <option value="Prime">Amazon Prime</option>
                        <option value="Crunchyroll">Crunchyroll</option>
                      </select>
                      {/* <select
                        name="award"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={filters.award}
                        onChange={handleFilterChange}
                      >
                        <option value="">Award</option>
                      </select> */}
                      {/* <select
                        name="sortBy"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={filters.sortBy}
                        onChange={handleFilterChange}
                      >
                        <option value="Alphabetics">Sorted by: Alphabetics</option>\
                      </select> */}
                      {/* <button
                        className="bg-blue-400 text-white px-4 py-2 rounded"
                        type="submit"
                      >
                        Submit
                      </button> */}
                    </form>
                  )}
                </div>
              ) : (
                <form className="flex flex-row space-x-2 mb-4 flex-wrap" onSubmit={handleSubmit}>
                  <select
                    name="year"
                    className="border border-gray-300 rounded px-4 py-2"
                    value={filters.year}
                    onChange={handleFilterChange}
                  >
                    <option value="">Year</option>
                    {/* Add year options */}
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                  </select>
                  <select
                    name="genre"
                    className="border border-gray-300 rounded px-4 py-2"
                    value={filters.genre}
                    onChange={handleFilterChange}
                  >
                    <option value="">Genre</option>
                    {/* Add genre options */}
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                  </select>
                  {/* <select
                    name="status"
                    className="border border-gray-300 rounded px-4 py-2"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">Status</option>
                  </select> */}
                  <select
                    name="platform"
                    className="border border-gray-300 rounded px-4 py-2"
                    value={filters.platform}
                    onChange={handleFilterChange}
                  >
                    <option value="">Availability</option>
                    {/* Add availability options */}
                    <option value="Netflix">Netflix</option>
                    <option value="Prime">Amazon Prime</option>
                    <option value="Crunchyroll">Crunchyroll</option>
                  </select>
                  {/* <select
                    name="award"
                    className="border border-gray-300 rounded px-4 py-2"
                    value={filters.award}
                    onChange={handleFilterChange}
                  >
                    <option value="">Award</option>
                  </select> */}
                  {/* <select
                    name="sortBy"
                    className="border border-gray-300 rounded px-4 py-2"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                  >
                    <option value="Alphabetics">Sorted by: Alphabetics</option>\
                  </select> */}
                  {/* <button
                    className="bg-blue-400 text-white px-4 py-2 rounded"
                    type="submit"
                  >
                    Submit
                  </button> */}
                </form>
              )}
            </div>

              <div className={searchTerm ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                {dramas.map(drama => (
                  <Card key={drama.id} drama={drama} user={userID} />
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
