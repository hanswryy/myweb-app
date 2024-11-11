import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import SideBarCMS from './components/SideBarCMS';

function Genres() {
  const [genres, setGenres] = useState([]); // State untuk menyimpan data negara
  const [newGenre, setNewGenre] = useState('');
  const [editingGenre, setEditingGenre] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk menyimpan error
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman aktif
  const itemsPerPage = 10; // Jumlah item per halaman

  const fetchGenres = async () => {
    try {
      const response = await fetch('/genre'); // Mengambil data dari endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data); // Simpan data ke state
      setFilteredGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading menjadi false setelah fetch
    }
  };

  useEffect(() => {
    fetchGenres(); // Panggil fungsi fetchCountries saat komponen di-mount
  }, []);

  const addGenre = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/genre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre: newGenre })
      });
      if (!response.ok) {
        throw new Error('Failed to add genre');
      }
      const addedGenre = await response.json();
      setGenres([addedGenre, ...genres]); // Update state dengan genre baru
      setFilteredGenres([addedGenre, ...filteredGenres]);
      setNewGenre('');
    } catch (error) {
      console.error('Error adding genre:', error);
    }
  };

  const updateGenre = async (id, newName) => {
    try {
      const response = await fetch(`/genre/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre: newName })
      });
      if (!response.ok) {
        throw new Error('Failed to update genre');
      }
      const updatedGenre = await response.json();
      const updatedGenres = genres.map((genre) =>
        genre.id === id ? updatedGenre : genre
      );
      setGenres(updatedGenres);
      setFilteredGenres(updatedGenres);
      setEditingGenre(null);
      setEditName('');
    } catch (error) {
      console.error('Error updating genre:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingGenre(null);
    setEditName(''); // Reset nama genre yang sedang diedit
  };

  const deleteGenre = async (id) => {
    try {
      const response = await fetch(`/genre/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete genre');
      }
      const updatedGenres = genres.filter((genre) => genre.id !== id);
      setGenres(updatedGenres);
      setFilteredGenres(updatedGenres);
    } catch (error) {
      console.error('Error deleting genre:', error);
      setError(error.message);
    }
  };

  // Fungsi untuk mencari genre berdasarkan input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setFilteredGenres(
        genres.filter((genre) =>
          genre.genre.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredGenres(genres);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGenres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGenres.length / itemsPerPage);

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
            <SideBarCMS selectedOption="genres"/>
          </div>

          <div className="w-5/6">
            <form onSubmit={addGenre} className="mb-4 text-md">
              <div className="flex items-center">
                <label htmlFor="genre" className="text-md mr-4">Genre</label>
                    <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 mr-4 w-full"
                    style={{ maxWidth: "300px", padding: "4px" }}
                    />
                    <button
                    type="submit"
                    style={{
                        backgroundColor: "#ff8636",
                        color: "white",
                        borderRadius: "10px",
                        padding: "4px 12px"
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
                                        <option>40</option>
                                        <option>50</option>
                                    </select>
                                </div>
                            </div>   */}
                            <input
                                type="text"
                                placeholder="Search Genres"
                                className="border border-gray-300 rounded-full px-4 py-2 w-64"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

            <table className="w-full table-auto text-md shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-600 table-header-group">
                <tr className="text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Genres</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
              {currentItems.map((genre, index) => (
                  <tr key={genre.id} className={index % 2 === 0 ? 'bg-red-50' : 'bg-gray-50'}>
                    <td className="p-2">{indexOfFirstItem + index + 1}</td>
                    <td className="p-2">
                    {editingGenre === genre.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onBlur={() => updateGenre(genre.id, editName)}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        genre.genre
                      )}
                    </td>
                    <td className="p-2 actions">
                    {editingGenre === genre.id ? (
                        <>
                          <button
                            className="text-blue-500 mr-2"
                            onClick={() => updateGenre(genre.id, editName)}
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
                          onClick={() => {
                            setEditingGenre(genre.id);
                            setEditName(genre.genre); // Set nama genre yang sedang diedit
                          }}
                          className="text-red-500 mr-2"
                        >
                          Rename |
                        </button>
                      )}
                      <button
                        onClick={() => deleteGenre(genre.id)}
                        className="text-red-500"
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

export default Genres;
