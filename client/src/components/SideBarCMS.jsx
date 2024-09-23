import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarCMS = ({ selectedOption }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDropdown = (event) => {
        event.preventDefault();
        setShowDropdown(!showDropdown);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            {/* Hamburger Menu Button */}
            <button
                className="lg:hidden p-2 focus:outline-none"
                onClick={toggleSidebar}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </button>

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-50 z-50 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-1/6 lg:block`}
            >
                <ul className="space-y-2 p-4">
                    <li>
                        <a
                            href="#"
                            onClick={toggleDropdown}
                            className={selectedOption === 'dramas' ? "text-lg font-bold" : "text-lg"}
                        >
                            Dramas
                        </a>
                        <ul className={showDropdown ? "space-y-2 dropdown-menu pl-8" : "space-y-2 hidden dropdown-menu pl-8"}>
                            <li><a href="/cms" className="text-lg">Validate</a></li>
                            <li><a href="/cms/input" className="text-lg">Input New Drama</a></li>
                        </ul>
                    </li>
                    <li><a href="/cms/countries" className={selectedOption === 'countries' ? "text-lg font-bold" : "text-lg"}>Countries</a></li>
                    <li><a href="/cms/awards" className={selectedOption === 'awards' ? "text-lg font-bold" : "text-lg"}>Awards</a></li>
                    <li><a href="/cms/genres" className={selectedOption === 'genres' ? "text-lg font-bold" : "text-lg"}>Genres</a></li>
                    <li><a href="/cms/actors" className={selectedOption === 'actors' ? "text-lg font-bold" : "text-lg"}>Actors</a></li>
                    <li><a href="/cms/comments" className={selectedOption === 'comments' ? "text-lg font-bold" : "text-lg"}>Comments</a></li>
                    <li><a href="/cms/users" className={selectedOption === 'users' ? "text-lg font-bold" : "text-lg"}>Users</a></li>
                    <li><a href="#" className={selectedOption === 'logout' ? "text-lg font-bold" : "text-lg"}>Logout</a></li>
                </ul>
            </div>
        </div>
    );
};

export default SideBarCMS;