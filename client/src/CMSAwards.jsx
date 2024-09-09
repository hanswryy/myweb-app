import React from 'react';
import './App.css';
import './index.css';

function Awards() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">DramaKu</h1>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/6">
            <ul className="space-y-2">
              <li><a href="#" className="text-md">Dramas</a></li>
              <li><a href="#" className="text-md">Countries</a></li>
              <li><a href="#" className="text-md font-semibold">Awards</a></li>
              <li><a href="#" className="text-md">Genres</a></li>
              <li><a href="#" className="text-md">Actors</a></li>
              <li><a href="#" className="text-md">Comments</a></li>
              <li><a href="#" className="text-md">Users</a></li>
              <li><a href="#" className="text-md">Logout</a></li>
            </ul>
          </div>

          <div className="w-5/6">
            <form className="mb-4">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                    <label htmlFor="country" className="text-md mr-4">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            style={{ maxWidth: "300px", padding: "4px" }}
                        />
                </div>
                <div className="flex-1">
                    <label htmlFor="year" className="text-md mr-4">Year</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            style={{ maxWidth: "300px", padding: "4px" }}
                        />
                </div>
              </div>
              <div className="mb-4">
                <label for="award" className="text-md mr-5">Awards</label>
                    <input
                        type="text"
                        id="award"
                        name="award"
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                        style="max-width: 300px; padding: 4px;"
                    />
                </div>
                <div className="mb-4 text-md">
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
                  <th className="p-2">Countries</th>
                  <th className="p-2">Years</th>
                  <th className="p-2">Awards</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-50">
                    <td className="p-2">1</td>
                    <td className="p-2">Japan</td>
                    <td className="p-2">2024</td>
                    <td className="p-2">Japanese Drama Awards Spring 2024</td>
                    <td className="p-2 actions">
                        <button className="text-red-500">Edit</button>|
                        <button className="text-red-500">Delete</button>
                    </td>
                </tr>
                <tr className="bg-gray-50">
                    <td className="p-2">2</td>
                    <td className="p-2">Korea</td>
                    <td className="p-2">2024</td>
                    <td className="p-2">Korean Drama Awards Spring 2024</td>
                    <td className="p-2 actions">
                        <button className="text-red-500">Edit</button>|
                        <button className="text-red-500">Delete</button>
                    </td>
                </tr>
                <tr className="bg-red-50">
                    <td className="p-2">3</td>
                    <td className="p-2">China</td>
                    <td className="p-2">2024</td>
                    <td className="p-2">Chinese Drama Awards Spring 2024</td>
                    <td className="p-2 actions">
                        <button className="text-red-500">Edit</button>|
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

export default Awards;
