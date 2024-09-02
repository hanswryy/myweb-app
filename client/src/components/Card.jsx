// import react
import React from "react";
import { useNavigate } from "react-router-dom";
import bujank from "../images/bujank.jpg";

const Card = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/detailPage");
  }

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-sm bg-white p-4" onClick={handleClick}>
      <div className="flex-shrink-0">
        <img className="w-full h-40 object-cover rounded-lg" src={bujank} alt="Sample" />
      </div>
      <div className="pt-2">
        <div className="font-bold text-sm mb-1 leading-tight">
          Title of the drama 1 that makes two lines
        </div>
        <p className="text-xs text-gray-700">2024</p>
        <p className="text-xs text-gray-700">Genre 1, Genre 2, Genre 3</p>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <p>Rate 3.5/5</p>
          <p>19 views</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
