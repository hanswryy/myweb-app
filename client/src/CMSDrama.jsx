import React, { useRef, useEffect } from "react";
import Actor from './components/Actor';
import SideBarCMS from "./components/SideBarCMS";
import Review from './components/Review';

import placeholder from "./images/video_player_placeholder.png";
import ikuyo from "./images/ikuyoo.jpeg";

function CMSDrama() {
    const [showModal, setShowModal] = React.useState(false);
    const modalRef = useRef(null);

    // Close modal when clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        }

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    return(
        <div>
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">DramaKu</h1>
                </div>
  
                <div className="flex space-x-4 mb-6">
                    <div className="lg:w-1/6 hidden lg:block">
                        <SideBarCMS selectedOption="dramas"/>
                    </div>
                    <div className="w-full lg:w-5/6">
                        <div className="lg:w-1/6 block lg:hidden">
                            <SideBarCMS selectedOption="dramas"/>
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
                                className="border border-gray-300 rounded-full px-4 py-2 w-64"
                            />
                        </div>
                        <div className="bg-white text-md">
                            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200 text-gray-600 table-header-group">
                                    <tr>
                                        <th className="px-6 py-3 text-left">#</th>
                                        <th className="px-6 py-3 text-left">Drama</th>
                                        <th className="px-6 py-3 text-left">Actors</th>
                                        <th className="px-6 py-3 text-left">Genres</th>
                                        <th className="px-6 py-3 text-left">Synopsis</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left w-1/12">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-red-50 text-sm lg:text-base">
                                    <td className="px-6 py-4">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        <a id="validate">[2024] Japan - Eye Love You</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        Takuya Kimura, Takeuchi Yuko, Neinen Reina
                                    </td>
                                    <td className="px-6 py-4">
                                        Romance, Adventure, Comedy
                                    </td>
                                    <td className="px-6 py-4">
                                        I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.
                                    </td>
                                    <td className="px-6 py-4">
                                        Unapproved
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:underline" onClick={() => setShowModal(true)}>Edit</button> | 
                                        <a href="#" className="text-red-600 hover:underline">Delete</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div
                    ref={modalRef}
                    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-4xl h-auto max-h-[90%] overflow-y-auto relative"
                >
                    <div class="flex justify-center space-x-4 mb-6">
                        <button class="bg-orange-500 text-white w-28 px-4 py-1 rounded-xl">Approve</button>
                        <button class="bg-red-500 text-white w-28 px-4 py-1 rounded-xl">Delete</button>
                    </div>
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        onClick={() => setShowModal(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col lg:flex-row mb-6">
                            <div className="lg:w-1/2 flex flex-row items-start">
                                <img className="w-36 lg:w-full rounded-xl" src={ikuyo} alt="Drama Poster" />
                                <div className='ml-4'>
                                    <h2 className="text-2xl font-bold block lg:hidden mb-5">Title of the drama 1 that makes two lines</h2>
                                    <p className="text-sm block lg:hidden mb-1">Other titles: Title 2, Title 3, Title 4</p>
                                    <p className="text-sm block lg:hidden mb-1">Year: Spring 2024</p>
                                    <p className="text-sm block lg:hidden mb-1">Genres: Genre 1, Genre 2, Genre 3</p>
                                    <p className="text-sm block lg:hidden mb-1">Rating: 3.5/5</p>
                                    <p className="text-sm block lg:hidden">Availability: Fansub: @sub on X</p>
                                </div>
                            </div>
                            <div className="lg:w-1/2 lg:pl-8">
                                <h2 className="text-2xl font-bold mb-2 hidden lg:block">Title of the drama 1 that makes two lines</h2>
                                <p className="text-sm mb-2 hidden lg:block">Other titles: Title 2, Title 3, Title 4</p>
                                <p className="text-sm mb-2 hidden lg:block">Year: Spring 2024</p>
                                <p className="text-sm mb-2 mt-4 lg:mt-0">Synopsis: Sometimes unhelpful. I don't read it thoroughly. But what helps me is the genres. I need to see genres and actors. That is what I want.</p>
                                <p className="text-sm mb-2 hidden lg:block">Genres: Genre 1, Genre 2, Genre 3</p>
                                <p className="text-sm mb-2 hidden lg:block">Rating: 3.5/5</p>
                                <p className="text-sm mb-4 hidden lg:block">Availability: Fansub: @sub on X</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4">Actors</h3>
                            <div className="flex justify-between space-x-4 overflow-x-auto">
                                <Actor />
                                <Actor />
                                <Actor />
                                <Actor />
                                <Actor />
                            </div>
                        </div>
                        <div className="mt-8">
                            <img className="w-full rounded-xl" src={placeholder} alt="Drama Poster" />
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}

export default CMSDrama;