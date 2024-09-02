import React from 'react';
import Card from './components/Card'; // Ensure the import path is correct

function LandingPage() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">DramaKu</h1>
          <div>
            <input
              type="text"
              placeholder="Search Drama"
              className="border border-gray-300 rounded-full px-4 py-2 w-64"
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="w-1/6">
            <ul className="space-y-2">
              <li><a href="#" className="text-lg font-semibold">Japan</a></li>
              <li><a href="#" className="text-lg">Korea</a></li>
              <li><a href="#" className="text-lg">China</a></li>
            </ul>
          </div>

          <div className="w-5/6">
            <div className="flex flex-col xl:flex-row space-x-0 xl:space-x-2 mb-4 flex-wrap">
              <select className="border border-gray-300 rounded px-4 py-2">
                <option>Year</option>
              </select>
              <select className="border border-gray-300 rounded px-4 py-2">
                <option>Genre</option>
              </select>
              <select className="border border-gray-300 rounded px-4 py-2">
                <option>Status</option>
              </select>
              <select className="border border-gray-300 rounded px-4 py-2">
                <option>Availability</option>
              </select>
              <select className="border border-gray-300 rounded px-4 py-2">
                <option>Award</option>
              </select>
              <select className="border border-gray-300 rounded px-4 py-2">
                <option>Sorted by: Alphabetics</option>
              </select>
              <button className="bg-orange-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              {/* Add more <Card /> components as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
