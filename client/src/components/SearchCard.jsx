import React from 'react';
import { useNavigate } from "react-router-dom";
import bujank from "../images/bujank.jpg";

const SearchCard = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/detailPage");
    }

    return (
        <div class="flex items-start space-x-4 p-4 bg-white shadow rounded-lg" onClick={handleClick}>
            <div class="flex-shrink-0">
                <img class="w-full h-40 object-cover rounded-lg" src={bujank} alt="Sample" />
            </div>
            
            <div class="flex-1 flex flex-col justify-between">
                <h3 class="text-lg font-semibold leading-tight">
                Title of the drama 1 that makes two lines
                </h3>
                <p class="text-sm text-gray-500">2024</p>
                <p class="text-sm text-gray-700">Genre 1, Genre 2, Genre 3</p>
                <p class="text-sm text-gray-700">Actor 1, Actor 2, Actor 3</p>
            </div>
            
            <div class="text-sm text-gray-500 self-end">19 views</div>
        </div>  
    );
};

export default SearchCard;