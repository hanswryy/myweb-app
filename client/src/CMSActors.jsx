import React from 'react';
import './App.css';
import './index.css';

function Actors() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold">DramaKu</h1>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/6">
            <ul className="space-y-2">
              <li><a href="#" className="text-md">Dramas</a></li>
              <li><a href="#" className="text-md">Countries</a></li>
              <li><a href="#" className="text-md">Awards</a></li>
              <li><a href="#" className="text-md">Genres</a></li>
              <li><a href="#" className="text-md font-semibold">Actors</a></li>
              <li><a href="#" className="text-md">Comments</a></li>
              <li><a href="#" className="text-md">Users</a></li>
              <li><a href="#" className="text-md">Logout</a></li>
            </ul>
          </div>

          <div className="w-5/6">
            <form className="mb-4">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="country" className="text-md mr-10">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="border border-gray-300 rounded px-4 py-2 w-full"
                      style={{ maxWidth: "300px", padding: "4px" }}
                    />
                </div>
                <div className="flex-1">
                  <label htmlFor="uppicture" className="text-md mr-2">Upload Picture</label>
                    <input
                      className="form-control mr-2"
                      id="uppicture"
                      type="file"
                      aria-label="Upload Picture"
                      accept="image/*"
                    />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="actorname" className="text-md mr-2">Actor Name</label>
                <input
                    type="text"
                    id="actorname"
                    name="actorname"
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    style={{ maxWidth: "300px", padding: "4px" }}
                    />
              </div>
              <div className="mb-4">
                <label htmlFor="birthdate" className="text-md mr-6">Birth Date</label>
                  <input
                    type="text"
                    id="birthdate"
                    name="birthdate"
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
                  <th className="p-2">Actor Name</th>
                  <th className="p-2">Birth Date</th>
                  <th className="p-2">Photos</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-50">
                    <td className="p-2">1</td>
                    <td className="p-2">Japan</td>
                    <td className="p-2">Takuya Kimura</td>
                    <td className="p-2">19 Desember 1975</td>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/Takuya Kimura.jpeg"} className="custom-img" alt="Takuya Kimura" />
                    </td>
                    <td className="p-2 actions">
                        <button className="text-red-500">Edit</button>|
                        <button className="text-red-500">Delete</button>
                    </td>
                </tr>
                <tr className="bg-gray-50">
                    <td className="p-2">2</td>
                    <td className="p-2">Korea</td>
                    <td className="p-2">Cha Eunwoo</td>
                    <td className="p-2">30 Maret 1997</td>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/Cha Eunwoo.jpeg"} className="custom-img" alt="Cha Eunwoo" />
                    </td>
                    <td className="p-2 actions">
                        <button className="text-red-500">Edit</button>|
                        <button className="text-red-500">Delete</button>
                    </td>
                </tr>
                <tr className="bg-red-50">
                    <td className="p-2">3</td>
                    <td className="p-2">China</td>
                    <td className="p-2">Cheng Yi</td>
                    <td className="p-2">17 Mei 1990</td>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/Cheng Yi.jpeg"} className="custom-img" alt="Cheng Yi" />
                    </td>
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

export default Actors;