// import react
import React from "react";
import bujank from "../images/bujank.jpg";

const Card = () => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-sm bg-white">
      <img className="w-full h-40 object-cover" src={bujank} alt="Sample" />
      <div className="px-4 py-4">
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
