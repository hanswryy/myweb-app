import React, { useState } from "react";

const SideBarCMS = ({ selectedOption, onOptionChange }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOptionChange = (option) => {
        
    }

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
                        <button
                            onClick={() => handleOptionChange('all')}
                            className={selectedOption === 'dramas' ? "text-lg font-bold" : "text-lg"}
                        >
                            All Dramas
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('3')}
                            className={selectedOption === '3' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Japan
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('0')}
                            className={selectedOption === '0' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            South Korea
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('2')}
                            className={selectedOption === '2' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Indonesia
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('1')}
                            className={selectedOption === '1' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            United States
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('4')}
                            className={selectedOption === '4' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            England
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('5')}
                            className={selectedOption === '5' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Taiwan
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('6')}
                            className={selectedOption === '6' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Germany
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('7')}
                            className={selectedOption === '7' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            India
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleOptionChange('8')}
                            className={selectedOption === '8' ? "text-lg font-bold ml-4" : "text-lg ml-4"}
                        >
                            Thailand
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBarCMS;
