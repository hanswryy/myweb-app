import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import SideBarCMS from './components/SideBarCMS';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState("username"); // kolom yang sedang diurutkan
  const [sortOrder, setSortOrder] = useState("asc"); // urutan pengurutan (asc/desc)
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman aktif
  const itemsPerPage = 10; // Jumlah item per halaman

  // Fungsi untuk melakukan fetching data users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/users'); // Pastikan endpoint sesuai dengan backend
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  // Function untuk filter status dan jumlah data yang ditampilkan
  useEffect(() => {
    const applyFiltersAndSort = () => {
      let updatedUsers = users;

      // Filter berdasarkan status
      if (statusFilter !== "All") {
        updatedUsers = updatedUsers.filter(user => user.status === statusFilter);
      }

      // Filter berdasarkan search query (username)
      if (searchQuery) {
        updatedUsers = updatedUsers.filter(user =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort users
      updatedUsers = updatedUsers.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      });

      // Set data yang difilter sesuai jumlah yang akan ditampilkan
      setFilteredUsers(updatedUsers);
    };

    applyFiltersAndSort();
  }, [users, statusFilter, searchQuery, sortColumn, sortOrder]);

  const handleSuspendUser = async (id, username) => {
    if (window.confirm(`Are you sure you want to banned ${username}?`)) {
      try {
        await axios.put(`/users/suspend/${id}`);
        setUsers(users.map(user => user.id === id ? { ...user, status: 'banned' } : user));
        // setUsers(users.filter(user => user.id !== id));
        window.alert(`${username} has been successfully banned.`);
      } catch (error) {
        console.error("Error suspending user:", error);
      }
    }
  };

  const handleChangeRoleToAdmin = async (id, username) => {
    if (window.confirm(`Are you sure you want to promote ${username} to Admin?`)) {
      try {
        await axios.put(`/users/role/${id}`);
        setUsers(users.map(user => user.id === id ? { ...user, role_id: 0 } : user)); // Role_id 0 sebagai admin
        window.alert(`${username} has been successfully promoted to Admin.`);
      } catch (error) {
        console.error("Error change role:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };

  const toggleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/">
          <h1 className="text-xl font-bold">DramaKu</h1>
          </Link>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/6">
            <SideBarCMS selectedOption="users"/>
          </div>

          <div className="w-5/6">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-2 mb-4 flex-wrap justify-between">
                            <div className="flex flex-row">
                                <div className="flex items-center space-x-2">
                                    <label className="block text-base mb-2">Filtered by:</label>
                                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 text-center">
                                      <option value="All">All</option>
                                      <option value="no banned">No Banned</option>
                                      <option value="banned">Banned</option>
                                    </select>
                                </div>
                                {/* <div className="flex items-center space-x-2 ml-4">
                                    <label className="block text-base mb-2">Shows</label>
                                    <select value={showCount} onChange={(e) => setShowCount(parseInt(e.target.value))} className="border border-gray-300 rounded-md px-4 py-2 text-center">
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                    </select>
                                </div> */}
                            </div>  
                            <input
                                type="text"
                                placeholder="Search Username"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border border-gray-300 rounded-full px-4 py-2 w-64"
                            />
                        </div>

            <table className="w-full table-auto text-md shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-600 table-header-group">
                <tr className="text-left">
                  <th className="p-2">#</th>
                  {/* <th className="p-2">Username</th> */}
                  <th className="p-2 cursor-pointer" onClick={() => toggleSort('username')}>Username</th>
                  <th className="p-2 cursor-pointer" onClick={() => toggleSort('created_at')}>Created At</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((users, index) => (
                  <tr key={users.id} className={index % 2 === 0 ? 'bg-red-50' : 'bg-gray-50'}>
                    <td className="p-2">{indexOfFirstItem + index + 1}</td>
                    <td className="p-2">{users.username}</td>
                    <td className="p-2">{formatDate(users.created_at)}</td>
                    <td className="p-2">{users.email}</td>
                    <td className="p-2">{users.status}</td>
                    <td className="p-2 actions">
                      <button onClick={() => handleSuspendUser(users.id, users.username)} className="text-red-500 mr-2">Banned |</button>
                      <button onClick={() => handleChangeRoleToAdmin(users.id, users.username)} className="text-red-500 mr-2">Promote to Admin</button>
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

export default Users;
