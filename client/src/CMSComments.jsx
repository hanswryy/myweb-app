import React, { useState, useEffect } from "react";
import SideBarCMS from "./components/SideBarCMS";
import { Link } from "react-router-dom";
import axios from "axios";

// const CMSComments = () => {


//     return (
//         <div class="bg-gray-50">
//             <div class="container mx-auto px-4 py-6">
//                 <div class="flex justify-between items-center mb-6">
//                 <Link to="/">
//                     <h1 className="text-xl font-bold">DramaKu</h1>
//                 </Link>
//                 </div>
    
//                 <div class="flex space-x-4 mb-6">
//                     <div className="lg:w-1/6 hidden lg:block">
//                         <SideBarCMS selectedOption="comments"/>
//                     </div>
//                     <div class="w-5/6">
//                         <div className="lg:w-1/6 block lg:hidden">
//                             <SideBarCMS selectedOption="comments"/>
//                         </div>
//                         <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-2 mb-4 flex-wrap justify-between">
//                             <div className="flex flex-row">
//                                 <div className="flex items-center space-x-2">
//                                     <label className="block text-base mb-2">Filtered by:</label>
//                                     <select className="border border-gray-300 rounded-md px-4 py-2 text-center">
//                                         <option>Unapproved</option>
//                                     </select>
//                                 </div>
//                                 <div className="flex items-center space-x-2 ml-4">
//                                     <label className="block text-base mb-2">Shows</label>
//                                     <select className="border border-gray-300 rounded-md px-4 py-2 text-center">
//                                         <option>10</option>
//                                         <option>20</option>
//                                         <option>30</option>
//                                     </select>
//                                 </div>
//                             </div>  
//                             <input
//                                 type="text"
//                                 className="border border-gray-300 rounded-full px-4 py-2 w-64"
//                             />
//                         </div>
//                         <div className="bg-white text-base">
//                             <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//                                 <thead className="bg-gray-200 text-gray-600 table-header-group">
//                                     <tr>
//                                         <th class="px-6 py-3 text-left"><input type="checkbox"/></th>
//                                         <th class="px-6 py-3 text-left">Username</th>
//                                         <th class="px-6 py-3 text-left">Rate</th>
//                                         <th class="px-6 py-3 text-left">Drama</th>
//                                         <th class="px-6 py-3 text-left w-2/5">Comments</th>
//                                         <th class="px-6 py-3 text-left">Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr class="bg-red-50">
//                                         <td class="px-6 py-4"><input type="checkbox"/></td>
//                                         <td class="px-6 py-4">Nara</td>
//                                         <td class="px-6 py-4">
//                                             <span class="text-red-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
//                                         </td>
//                                         <td class="px-6 py-4">[2024] Japan - Eye Love You</td>
//                                         <td class="px-6 py-4 w-2/5">
//                                             I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.<br/>
//                                             What the most thing that I love is about the kindness. Having money is perfect.
//                                         </td>
//                                         <td class="px-6 py-4">Unapproved</td>
//                                     </tr>
//                                     <tr class="bg-white">
//                                         <td class="px-6 py-4"><input type="checkbox"/></td>
//                                         <td class="px-6 py-4">Luffy</td>
//                                         <td class="px-6 py-4">
//                                             <span class="text-red-500">&#9733;&#9733;</span>
//                                         </td>
//                                         <td class="px-6 py-4">[2024] Japan - Eye Love You</td>
//                                         <td class="px-6 py-4 w-2/5">Meh</td>
//                                         <td class="px-6 py-4 text-gray-400">Approved</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div class="flex items-center mt-4 space-x-4">
//                             <a href="#" class="text-blue-500">Select All</a>
//                             <a href="#" class="text-blue-500">Unselect All</a>
//                         </div>
//                         <div class="flex items-center mt-4 space-x-4">
//                             <button class="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600">Approve</button>
//                             <button class="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600">Delete</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CMSComments;

const CMSComments = () => {
    const [comments, setComments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const response = await fetch('/comments');
          const data = response.data;
          console.log("data: " + data);
          setComments(data.comments || []); // Assuming 10 items per page
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
  
      fetchComments();
    }, [searchTerm]);
  
    const handleDelete = async (id) => {
      const confirmed = window.confirm('Are you sure you want to delete this comment?');
      if (!confirmed) {
        return;
      }
  
      try {
        const response = await fetch(`/comment/${id}`, {
            method: 'DELETE',
        });
        const data = response.data;
        if (data.success) {
            setComments(comments.filter((comment) => comment.id !== id));
            } else {
            console.error('Error deleting comment:', data.error);
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    };
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page on new search
    };
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <Link to="/">
              <h1 className="text-xl font-bold">DramaKu</h1>
            </Link>
          </div>
  
          <div className="flex space-x-4 mb-6">
            <div className="lg:w-1/6 hidden lg:block">
              <SideBarCMS selectedOption="comments" />
            </div>
            <div className="w-full lg:w-5/6">
              <div className="lg:w-1/6 block lg:hidden">
                <SideBarCMS selectedOption="comments" />
              </div>
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-2 mb-4 flex-wrap justify-between">
                <div className="flex flex-row">
                  <div className="flex items-center space-x-2">
                    <label className="block text-base mb-2">Filtered by:</label>
                    <select className="border border-gray-300 rounded-md px-4 py-2 text-center">
                      <option>Unapproved</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <label className="block text-base mb-2">Shows</label>
                    <select className="border border-gray-300 rounded-md px-4 py-2 text-center">
                      <option>10</option>
                      <option>20</option>
                      <option>30</option>
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search Comments"
                  className="border border-gray-300 rounded-full px-4 py-2 w-64"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="bg-white text-md">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-200 text-gray-600 table-header-group">
                    <tr>
                      <th className="px-6 py-3 text-left">#</th>
                      <th className="px-6 py-3 text-left">Drama</th>
                      <th className="px-6 py-3 text-left">Username</th>
                      <th className="px-6 py-3 text-left">Comment</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left w-1/12">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(comments) && comments.map((comment, index) => (
                      <tr key={comment.id} className="bg-gray-100 text-gray-600">
                        <td className="px-6 py-4">{comment.drama_name}</td>
                        <td className="px-6 py-4">{comment.username}</td>
                        <td className="px-6 py-4">{comment.content}</td>
                        <td className="px-6 py-4">{new Date(comment.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <button
                            className="bg-red-500 text-white px-4 py-1 rounded-xl"
                            onClick={() => handleDelete(comment.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CMSComments;