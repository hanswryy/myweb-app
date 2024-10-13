import React, { useState } from "react";

const SideBarCMS = ({ selectedOption }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-0 lg:h-screen">
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
                className={`fixed top-0 left-0 h-full bg-gray-50 lg:bg-blue-200 z-50 transform ${
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
                            South Korea
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'indonesia' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Indonesia
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'us' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            United States
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'england' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            England
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'taiwan' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Taiwan
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'germany' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Germany
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'india' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            India
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className={selectedOption === 'thailand' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Thailand
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBarCMS;
