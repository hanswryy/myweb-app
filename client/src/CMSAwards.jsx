import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import SideBarCMS from './components/SideBarCMS';
import axios from 'axios';

function Awards() {
  const [awards, setAwards] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    country_id: '',
    year: '',
    award: ''
  });
  const [editAwardId, setEditAwardId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const awardsPerPage = 10;

  useEffect(() => {
    fetchAwards();
    fetchCountries();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterYear, filterCountry]);

  // Fetch awards from API
  const fetchAwards = async () => {
    try {
      const response = await axios.get('/award');
      setAwards(response.data);
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  const fetchCountries = async () => {
    try {
        const response = await fetch('/country'); // Ambil data dari endpoint country
        const data = await response.json();
        setCountries(data); // Simpan data negara dalam state
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleYearFilterChange = (e) => {
    setFilterYear(e.target.value);
  };

  const handleCountryFilterChange = (e) => {
    setFilterCountry(e.target.value);
  };

  const filterAwards = () => {
    let filtered = awards;
    if (searchTerm) {
      filtered = filtered.filter(award =>
        award.award.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterYear) {
      filtered = filtered.filter(award => award.year === filterYear);
    }
    if (filterCountry) {
      filtered = filtered.filter(award => award.country_id === parseInt(filterCountry));
    }
    return filtered;
  };

  const paginatedAwards = filterAwards().slice(
    (currentPage - 1) * awardsPerPage,
    currentPage * awardsPerPage
  );

  const totalPages = Math.ceil(filterAwards().length / awardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle form submission to add a new award
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editAwardId) {
        // Jika dalam mode edit, update award
        await axios.put(`/award/${editAwardId}`, formData);
        setEditAwardId(null);
      } else {
        // Jika tidak dalam mode edit, tambahkan award baru
        await axios.post('/award', formData);
      }
      setFormData({ country_id: '', year: '', award: '' }); // Reset form
      fetchAwards(); // Refresh awards list
    } catch (error) {
      console.error('Error adding or editing award:', error);
    }
  };

  // Handle deleting an award
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/award/${id}`);
      fetchAwards(); // Refresh awards list after deletion
    } catch (error) {
      console.error('Error deleting award:', error);
    }
  };

  // Load award data into form for editing
  const handleEdit = (award) => {
    setFormData({
      country: award.country_id,
      year: award.year,
      award: award.award,
    });
    setEditAwardId(award.id);
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">DramaKu</h1>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/6">
            <SideBarCMS selectedOption="awards" />
          </div>

          <div className="w-5/6">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="country_id" className="text-md mr-4">Country</label>
                  <select
                    type="text"
                    id="country_id"
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    style={{ maxWidth: "300px", padding: "4px" }}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="year" className="text-md mr-4">Year</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    style={{ maxWidth: "300px", padding: "4px" }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="award" className="text-md mr-5">Awards</label>
                <input
                  type="text"
                  id="award"
                  name="award"
                  value={formData.award}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  style={{ maxWidth: "300px", padding: "4px" }}
                />
              </div>
              <div className="mb-4 text-md">
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ff8636",
                    color: "white",
                    borderRadius: "10px",
                    padding: "4px 12px",
                    marginRight: "10px"
                  }}
                >
                  {editAwardId ? "Update" : "Submit"}
                </button>
                {editAwardId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditAwardId(null);
                      setFormData({ country_id: '', year: '', award: '' });
                    }}
                    style={{
                      backgroundColor: "#ccc",
                      color: "black",
                      borderRadius: "10px",
                      padding: "4px 12px",
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-2 mb-4 flex-wrap justify-between">
                            <div className="flex flex-row">
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="filterCountry" className="block text-base mb-2">Filtered by Country:</label>
                                    <select
                                      id="filterCountry"
                                      value={filterCountry}
                                      onChange={handleCountryFilterChange}
                                      className="border border-gray-300 rounded-md px-4 py-2 text-center"
                                      // style={{ maxWidth: "200px", padding: "4px" }}
                                    >
                                    <option value="">All Countries</option>
                                      {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                          {country.name}
                                        </option>
                                      ))}
                                    </select>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                    <label htmlFor="filterYear" className="block text-base mb-2">Filtered by Year:</label>
                                    <select
                                      id="filterYear"
                                      value={filterYear}
                                      onChange={handleYearFilterChange} 
                                      className="border border-gray-300 rounded-md px-4 py-2 text-center"
                                      // style={{ maxWidth: "80px", padding: "4px" }}
                                    >
                                    <option value="">All Years</option>
                                      {[...new Set(awards.map((award) => award.year))].map((year, idx) => (
                                        <option key={idx} value={year}>
                                          {year}
                                        </option>
                                      ))}
                                    </select>
                                </div>
                            </div>  
                            <input
                                type="text"
                                id="searchTerm"
                                placeholder="Search Awards"
                                className="border border-gray-300 rounded-full px-4 py-2 w-64"
                                // style={{ maxWidth: "200px", padding: "4px" }}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

            <table className="w-full table-auto text-md shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-600 table-header-group">
                <tr className="text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Countries</th>
                  <th className="p-2">Years</th>
                  <th className="p-2">Awards</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAwards.map((award, index) => (
                  <tr key={award.id} className={index % 2 === 0 ? "bg-red-50" : "bg-gray-50"}>
                    <td className="p-2">{(currentPage - 1) * awardsPerPage + index + 1}</td>
                    <td className="p-2">{countries.find(country => country.id === award.country_id)?.name || ''}</td>
                    <td className="p-2">{award.year}</td>
                    <td className="p-2">{award.award}</td>
                    <td className="p-2 actions">
                      <button 
                        className="text-red-500 mr-2"
                        onClick={() => handleEdit(award)}
                      >    
                        Edit
                      </button>
                      <button
                        className="text-red-500 mr-2"
                        onClick={() => handleDelete(award.id)}
                      >
                        | Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between my-4">
              <button 
                onClick={handlePreviousPage} 
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded-md text-gray-700"
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded-md text-gray-700"
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
