import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import FontAwesome icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import placeholder from '../images/placeholder.jpg'; // Ensure you have a placeholder image

const Card = ({ drama, user, onToggleWatchlist }) => {
  const [isWatchlisted, setIsWatchlisted] = useState(false); // State to track watchlist status
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (user) {
      // Fetch the watchlist status when the component mounts
      const checkWatchlistStatus = async () => {
        try {
          const response = await fetch(
            `/watchlist/check?user_id=${user}&drama_id=${drama.id}`
          );
          const data = await response.json();
          setIsWatchlisted(data.isWatchlisted); // Set the initial watchlist state
        } catch (error) {
          console.error("Failed to fetch watchlist status:", error);
        }
      };

      checkWatchlistStatus();
    }
  }, [user, drama.id]);

  const handleClick = () => {
    navigate(`/detailDrama/${drama.id}`); // Navigate to detailed drama page
  };

  // Fallback to placeholder image if the drama image fails to load
  const handleImageError = (e) => {
    e.target.src = placeholder;
  };

  const toggleWatchlist = async (e) => {
    e.stopPropagation(); // Prevent card click event
    try {
      const response = await fetch('/watchlist/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user,
          drama_id: drama.id,
        }),
      });

      if (response.ok) {
        setIsWatchlisted(!isWatchlisted); // Toggle watchlist status on success
        onToggleWatchlist(); // Call the parent function to update the watchlist
      }
    } catch (error) {
      console.error("Failed to toggle watchlist status:", error);
    }
  };

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-sm bg-white p-4 relative cursor-pointer " onClick={handleClick}>
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
      {user && (
        <button
          className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-2 shadow-md"
          onClick={toggleWatchlist}
        >
          {isWatchlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
      )}
    </div>
  );
};

export default Card;