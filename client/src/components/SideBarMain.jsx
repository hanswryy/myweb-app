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
            <div
                className={`fixed top-0 left-0 h-full bg-blue-200 lg:bg-gray-50 z-50 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-1/6 lg:block`}
            >
                <ul className="space-y-2 p-4">
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'dramas' ? "text-lg font-bold" : "text-lg"}
                        >
                            All Dramas
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'japan' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Japan
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'korea' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Korea
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'china' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            China
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBarCMS;