import React from 'react';

import Actor from './components/Actor';
import Review from './components/Review';

import placeholder from "./images/video_player_placeholder.png";
import ikuyo from "./images/ikuyoo.jpeg";

function DetailPage() {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">DramaKu</h1>
                </div>
                <div className="mx-auto lg:w-2/3">
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
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-l mb-4">(4) People think about this drama</h3>
                            <div className="mb-4">
                                <select className="ml-4 border border-gray-300 rounded px-2 py-1">
                                <option>Filter by: Rating</option>
                                <option>Highest First</option>
                                <option>Lowest First</option>
                                </select>
                            </div>
                        </div>

                        <Review />
                        <Review />
                        <Review />
                        <Review />
                    </div>
                    <h3 className="text-lg font-bold mb-4">Add yours!</h3>
                    <div className="bg-white p-4 rounded shadow-lg w-full lg:w-1/2">
                        <form>
                            <div className="flex flex-col lg:flex-row justify-between mb-4">
                                <label className="w-full lg:w-1/3 block text-sm font-bold mb-2 lg:mb-0 lg:mr-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="flex flex-col lg:flex-row items-start lg:items-center mb-4">
                                <label className="w-full lg:w-1/3 block text-sm font-bold mb-2 lg:mb-0 lg:mr-2">Rate</label>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            className="text-2xl text-gray-400 cursor-pointer"
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row mb-4">
                                <label className="w-full lg:w-1/3 block text-sm font-bold mb-2 lg:mb-0 lg:mr-2 align-top">Your thoughts</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                    placeholder="Share your thoughts"
                                    rows="4"
                                ></textarea>
                            </div>

                            <p className="text-xs text-gray-500 mb-4">You can only submit your comment once.</p>

                            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;