import React from 'react';
import './App.css';
import './index.css';
import SideBarCMS from './components/SideBarCMS';

function Genres() {
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
            <form className="mb-4 text-md">
              <div className="flex items-center">
                <label htmlFor="genre" className="text-md mr-4">Genre</label>
                    <input
                    type="text"
                    id="genre"
                    name="genre"
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

            <table className="w-full table-auto text-md shadow-lg">
              <thead>
                <tr className="text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Genres</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-50">
                    <td className="p-2">1</td>
                    <td className="p-2 flex items-center">
                        <input
                            type="text"
                            value="Romance"
                            className="border border-gray-300 rounded px-2 py-1"
                            style={{ maxWidth: "200px" }}
                        />
                    </td>
                    <td className="p-2 actions">
                        <button className="text-red-500">Rename</button>|
                        <button className="text-red-500">Delete</button>
                    </td>
                </tr>
                <tr className="bg-gray-50">
                    <td className="p-2">2</td>
                    <td className="p-2">Drama</td>
                    <td className="p-2 actions">
                        <button className="text-red-500">Rename</button>|
                        <button className="text-red-500">Delete</button>
                    </td>
                </tr>
                <tr className="bg-red-50">
                    <td className="p-2">3</td>
                    <td className="p-2">Action</td>
                    <td className="p-2 actions">
                        <button className="text-red-500">Rename</button>|
                        <button className="text-red-500">Delete</button>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Genres;
