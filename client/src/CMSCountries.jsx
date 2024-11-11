import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import SideBarCMS from './components/SideBarCMS';

function Countries() {
  const [countries, setCountries] = useState([]); // State untuk menyimpan data negara
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk menyimpan error
  const [newCountry, setNewCountry] = useState(''); // State untuk country baru
  const [editingCountry, setEditingCountry] = useState(null); // State untuk country yang sedang diedit
  const [editName, setEditName] = useState(''); // State untuk nama country yang sedang diedit
  const [filteredCountries, setFilteredCountries] = useState([]); // State untuk menyimpan negara yang difilter
  const [searchTerm, setSearchTerm] = useState(''); // State untuk pencarian
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman aktif
  const itemsPerPage = 10; // Jumlah item per halaman

  const fetchCountries = async () => {
    try {
      const response = await fetch('/country'); // Mengambil data dari endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data); // Simpan data ke state
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading menjadi false setelah fetch
    }
  };

  useEffect(() => {
    fetchCountries(); // Panggil fungsi fetchCountries saat komponen di-mount
  }, []);

  // Fungsi untuk menambahkan negara baru
  const handleAddCountry = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/country', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCountry }),
      });
      if (!response.ok) {
        throw new Error('Failed to add country');
      }
      const addedCountry = await response.json();
      setCountries([addedCountry, ...countries]); // Update state dengan negara baru
      setFilteredCountries([addedCountry, ...filteredCountries]);
      setNewCountry(''); // Reset input field
    } catch (error) {
      console.error('Error adding country:', error);
      setError(error.message);
    }
  };

  // Fungsi untuk memulai edit negara
  const startEditing = (country) => {
    setEditingCountry(country.id);
    setEditName(country.name);
  };

  // Fungsi untuk menyimpan perubahan negara
  const handleUpdateCountry = async (id) => {
    try {
      const response = await fetch(`/country/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });
      if (!response.ok) {
        throw new Error('Failed to update country');
      }
      const updatedCountry = await response.json();
      const updatedCountries = countries.map((country) =>
        country.id === id ? updatedCountry : country
      );
      setCountries(updatedCountries);
      setFilteredCountries(updatedCountries);
      setEditingCountry(null);
    } catch (error) {
      console.error('Error updating country:', error);
      setError(error.message);
    }
  };

  // Fungsi untuk membatalkan proses edit
  const handleCancelEdit = () => {
    setEditingCountry(null);
    setEditName(''); // Reset nama negara yang sedang diedit
  };

  // Fungsi untuk menghapus negara
  const handleDeleteCountry = async (id) => {
    try {
      const response = await fetch(`/country/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete country');
      }
      const updatedCountries = countries.filter((country) => country.id !== id);
      setCountries(updatedCountries);
      setFilteredCountries(updatedCountries);
    } catch (error) {
      console.error('Error deleting country:', error);
      setError(error.message);
    }
  };

  // Fungsi untuk mencari negara berdasarkan input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredCountries(countries);
    }
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>; // Tampilkan loading saat data sedang diambil
  }

  if (error) {
    return <div className="text-center">An error occurred: {error}</div>; // Tampilkan pesan error
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">DramaKu</h1>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/6">
            <SideBarCMS selectedOption="countries" />
          </div>

          <div className="w-5/6">
            <form className="mb-4 text-md" onSubmit={handleAddCountry}>
              <div className="flex items-center">
                <label htmlFor="country" className="text-md mr-4">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 mr-4 w-full"
                  style={{ maxWidth: "300px", padding: "4px" }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ff8636",
                    color: "white",
                    borderRadius: "10px",
                    padding: "4px 12px",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>

            <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-2 mb-4 flex-wrap justify-end">
                            {/* <div className="flex flex-row">
                                <div className="flex items-center space-x-2">
                                    <label className="block text-base mb-2">Shows</label>
                                    <select className="border border-gray-300 rounded-md px-4 py-2 text-center" value={showCount} onChange={handleShowCountChange}>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </div>
                            </div>   */}
                            <input
                                type="text"
                                placeholder="Search Countries"
                                className="border border-gray-300 rounded-full px-4 py-2 w-64"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

            <table className="w-full table-auto text-md shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-600 table-header-group">
                <tr className="text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Countries</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((country, index) => (
                  <tr key={country.id} className={index % 2 === 0 ? 'bg-red-50' : 'bg-gray-50'}>
                    <td className="p-2">{indexOfFirstItem + index + 1}</td>
                    <td className="p-2">
                      {editingCountry === country.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        country.name
                      )}
                    </td>
                    <td className="p-2 actions">
                      {editingCountry === country.id ? (
                        <>
                          <button
                          className="text-blue-500 mr-2"
                          onClick={() => handleUpdateCountry(country.id)}
                          >
                            Save
                          </button>
                          <button
                          className="text-gray-500 mr-2"
                          onClick={handleCancelEdit}
                          >
                          | Cancel |
                          </button>
                        </>
                      ) : (
                        <button
                          className="text-red-500 mr-2"
                          onClick={() => startEditing(country)}
                        >
                          Rename | 
                        </button>
                      )}
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteCountry(country.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded-md text-gray-700"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
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

export default Countries;
