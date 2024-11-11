import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import SideBarCMS from './components/SideBarCMS';

function Actors() {
  const [actor, setActor] = useState([]);
  const [countries, setCountries] = useState([]); // State untuk menyimpan daftar negara
  const [form, setForm] = useState({
    name: '',
    country_id: '',
    birth_date: '',
    url_photo: null
  });
  const [previewImage, setPreviewImage] = useState(''); // Untuk menyimpan file foto yang diunggah
  const [editId, setEditId] = useState('');
  const [filterCountry, setFilterCountry] = useState(''); // State for selected country filter
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman aktif
  const itemsPerPage = 10; // Jumlah item per halaman

// Filter and search actors based on filterCountry and searchTerm
const filteredActors = actor
  .filter((actor) => 
    (filterCountry === '' || actor.country_id === parseInt(filterCountry)) &&
    (searchTerm === '' || actor.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  .slice(0);

  useEffect(() => {
    fetchActors();
    fetchCountries(); // Ambil daftar negara saat komponen dimuat
  }, []);

  const fetchActors = async () => {
    try {
        const response = await fetch('/actor');
        if (!response.ok) throw new Error("Failed to fetch actors");
        const data = await response.json();
        setActor(data);
    } catch (error) {
        console.error("Error fetching actor:", error);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prevForm => ({
        ...prevForm,
        url_photo: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Current form:', form);

    if (!form.url_photo) {
      console.error('Photo is required');
      alert('Please upload a photo before submitting.');
      return;
    }

    const formDataForActor = new FormData();
    formDataForActor.append('country_id', form.country_id);
    formDataForActor.append('name', form.name);

    const formattedBirthDate = form.birth_date.split('T')[0];
    formDataForActor.append('birth_date', formattedBirthDate);

    formDataForActor.append('url_photo', form.url_photo);

    try {
      const response = await fetch("/actor", {
        method: "POST",
        body: formDataForActor,
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Error: ${errorResponse || response.statusText}`);
      }

      setForm({ name: '', country_id: '', birth_date: '', url_photo: null });
      setPreviewImage('');
      fetchActors();
    } catch (error) {
      console.error("Error creating actor:", error);
    }
  };

  const handleEdit = (actor) => {
    setEditId(actor.id);
    setForm({
      name: actor.name || '',
      country_id: actor.country_id || '',
      birth_date: actor.birth_date.split('T')[0] || '', // Format tanggal
      url_photo: null
    });
    setPreviewImage(actor.url_photo);
  };

  const handleSave = async (id) => {
      const formDataForUpdate = new FormData();
      formDataForUpdate.append('country_id', form.country_id);
      formDataForUpdate.append('name', form.name);
  
      const formattedBirthDate = form.birth_date.split('T')[0];
      formDataForUpdate.append('birth_date', formattedBirthDate);
  
      // Hanya tambahkan foto jika ada perubahan
      if (form.url_photo) {
          formDataForUpdate.append('url_photo', form.url_photo);
      }
  
      try {
          const response = await fetch(`/actor/${id}`, {
              method: 'PUT',
              body: formDataForUpdate, // Mengirim data sebagai FormData
          });
          if (!response.ok) throw new Error("Failed to update actor");
  
          // Refresh daftar aktor dan reset form
          setEditId(null);
          setForm({ name: '', country_id: '', birth_date: '', url_photo: null });
          setPreviewImage('');
          fetchActors(); // Mengambil ulang data untuk diperbarui di tabel
      } catch (error) {
          console.error('Error updating actor:', error);
      }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: '', country_id: '', birth_date: '', url_photo: null });
    setPreviewImage('');
  };

  const deleteActor = async (id) => {
      try {
        const response = await fetch(`/actor/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Failed to delete actor");
        setActor((prevActors) => prevActors.filter((actor) => actor.id !== id));
      } catch (error) {
          console.error("Error deleting actor:", error);
      }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredActors.length / itemsPerPage);

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

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold">DramaKu</h1>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/6">
            <SideBarCMS selectedOption="actors"/>
          </div>

          <div className="w-5/6">
            <form className="mb-4" onSubmit={handleSubmit}>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="country_id" className="text-md mr-10">Country</label>
                  <select
                    id="country_id"
                    name="country_id"
                    value={form.country_id}
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
                  <label htmlFor="url_photo" className="text-md mr-2">Upload Picture</label>
                  <input
                    className="form-control mr-2"
                    id="url_photo"
                    type="file"
                    onChange={handleFileChange}
                    aria-label="Upload Picture"
                    accept="image/*"
                  />
                  {previewImage && (
                    <img src={previewImage} alt="Preview" className="w-28 h-32" />
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="text-md mr-2">Actor Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    style={{ maxWidth: "300px", padding: "4px" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="birth_date" className="text-md mr-6">Birth Date</label>
                <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    value={form.birth_date}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    style={{ maxWidth: "300px", padding: "4px" }}
                />
              </div>
              <div className="mb-4 text-md">
                <button
                    type="submit"
                    // onClick={editId ? () => handleSave(editId) : handleSubmit}
                    style={{
                      backgroundColor: "#ff8636",
                      color: "white",
                      borderRadius: "10px",
                      padding: "4px 12px",
                    }}
                >
                  {/* {editId ? 'Update' : 'Submit'} */}
                  Submit
                </button>
              </div>
            </form>

            <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-2 mb-4 flex-wrap justify-between">
                            <div className="flex flex-row">
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="filterCountry" className="block text-base mb-2">Filtered by Country:</label>
                                    <select
                                      id="filterCountry"
                                      value={filterCountry}
                                      onChange={(e) => setFilterCountry(e.target.value)}
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
                                {/* <div className="flex items-center space-x-2 ml-4">
                                    <label htmlFor="showCount" className="block text-base mb-2">Shows</label>
                                    <select
                                      id="showCount"
                                      value={showCount}
                                      onChange={(e) => setShowCount(parseInt(e.target.value) || 10)} 
                                      className="border border-gray-300 rounded-md px-4 py-2 text-center"
                                      // style={{ maxWidth: "80px", padding: "4px" }}
                                    >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    </select>
                                </div> */}
                            </div>  
                            <input
                                type="text"
                                id="searchTerm"
                                placeholder="Search Actors"
                                className="border border-gray-300 rounded-full px-4 py-2 w-64"
                                // style={{ maxWidth: "200px", padding: "4px" }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

            <table className="w-full table-auto text-md shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-600 table-header-group">
                <tr className="text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Countries</th>
                  <th className="p-2">Actor Name</th>
                  <th className="p-2">Birth Date</th>
                  <th className="p-2">Photo</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((actor, index) => (
                    <tr key={actor.id} className={index % 2 === 0 ? "bg-red-50" : "bg-gray-50"}>
                      <td className="p-2">{indexOfFirstItem + index + 1}</td>
                      <td className="p-2">{countries.find(country => country.id === actor.country_id)?.name || ''}</td>
                      <td className="p-2">{actor.name}</td>
                      <td className="p-2">{actor.birth_date.split('T')[0]}</td>
                      <td>
                        <img src={actor.url_photo} className="custom-img w-28 h-32" alt={actor.name} />
                      </td>
                      <td className="p-2 actions">
                        {editId === actor.id ? (
                          <>
                            <button 
                            onClick={() => handleSave(actor.id)}
                            className="mr-2 bg-green-500 text-white px-3 py-1 rounded"
                            >
                            Save
                            </button>
                            <button 
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                            >
                            Cancel
                            </button>
                          </>
                          ) : (
                            <>
                          <button 
                            onClick={() => handleEdit(actor)}
                            className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                          onClick={() => deleteActor(actor.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                          </>
                        )}
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

export default Actors;
