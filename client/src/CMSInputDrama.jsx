import React from "react";
import ikuyo from "./images/ikuyoo.jpeg";
import SideBarCMS from "./components/SideBarCMS";

const CMSInputDrama = () => {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">DramaKu</h1>
                </div>

                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
                    <div className="w-full lg:w-1/6">
                        <SideBarCMS selectedOption="dramas" />
                    </div>

                    <div className="w-full lg:w-5/6">
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                            <div className="w-full lg:w-1/5 flex flex-col items-center space-y-4">
                                <img className="w-full rounded-xl" src={ikuyo} alt="Drama Poster" />
                                <button className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
                            </div>

                            <div className="w-full lg:w-4/5">
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                        <input type="text" name="title" id="title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
                                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-2">
                                            <div className="w-full lg:w-1/5">
                                                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                                                <select className="border border-gray-300 rounded-md px-4 py-2 w-full h-7 mt-1">
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-4/5">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                                <input type="text" name="country" id="country" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="alt-title" className="block text-sm font-medium text-gray-700">Alternative Title</label>
                                        <input type="text" name="alt-title" id="alt-title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
                                    </div>
                                </div>
                                <div className="w-full mt-2">
                                    <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">Synopsis</label>
                                    <textarea name="synopsis" id="synopsis" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1 h-20"></textarea>
                                </div>
                                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mt-2">Availability</label>
                                <input type="text" name="availability" id="availability" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
                                
                                <label htmlFor="genres" className="block text-sm font-medium text-gray-700 mt-2">Add Genres</label>
                                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2">Action</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2">Adventures</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2">Romance</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2">Drama</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2">Slice of Life</span>
                                    </label>
                                    {/* Add more genres as needed */}
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Add Actors (Up to 9)</label>
                                    <input type="text" placeholder="Search Actor Names" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                            
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="relative bg-white rounded-md shadow-md flex space-x-4 p-4">
                                            <div className="w-20 h-24 bg-gray-200 rounded-xl"></div>
                                            <p className="text-center mt-4">Actor 1</p>
                                            <button className="absolute top-4 right-4 text-xs text-red-500">x</button>
                                        </div>
                                        <div className="relative bg-white rounded-md shadow-md flex space-x-4 p-4">
                                            <div className="w-20 h-24 bg-gray-200 rounded-xl"></div>
                                            <p className="text-center mt-4">Actor 2</p>
                                            <button className="absolute top-4 right-4 text-xs text-red-500">x</button>
                                        </div>
                                        <div className="relative bg-white rounded-md shadow-md flex space-x-4 p-4">
                                            <div className="w-20 h-24 bg-gray-200 rounded-xl"></div>
                                            <p className="text-center mt-4">Actor 3</p>
                                            <button className="absolute top-4 right-4 text-xs text-red-500">x</button>
                                        </div>
                                        {/* Add more actors as needed */}
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="trailer" className="block text-sm font-medium text-gray-700">Link Trailer</label>
                                        <input type="text" name="trailer" id="trailer" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-300 px-2 py-1" />
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="award" className="block text-sm font-medium text-gray-700">Award</label>
                                        <select className="border border-gray-300 rounded-md px-4 py-2 w-full h-7 mt-1">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CMSInputDrama;