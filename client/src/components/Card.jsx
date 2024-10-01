import React from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "../images/placeholder.jpg"; // Placeholder image

const Card = ({ drama }) => {
  const navigate = useNavigate();

  // Function to handle card click
  const handleClick = () => {
    navigate(`/detailPage/${drama?.id}`);
  };

  // Fallback to placeholder image if the drama image fails to load
  const handleImageError = (e) => {
    e.target.src = placeholder;
  };

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-sm bg-white p-4" onClick={handleClick}>
      <div className="flex-shrink-0">
        <img
          className="w-full h-40 object-cover rounded-lg"
          src={drama?.url_photo || placeholder}
          alt={drama?.title || "No title available"}
          onError={handleImageError}  // Fallback in case of error
        />
      </div>
      <div className="pt-2">
        <div className="font-bold text-sm mb-1 leading-tight">
          {drama?.title || "No title available"}
        </div>
        <p className="text-xs text-gray-700">{drama?.year || "Year not available"}</p>
        <p className="text-xs text-gray-700">{drama?.genres?.join(", ") || "Genres not available"}</p>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <p>Rate {drama?.rating || "N/A"}/5</p>
          <p>{drama?.views || "0"} views</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
