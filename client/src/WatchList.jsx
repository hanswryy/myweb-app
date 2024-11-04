import React, { useState, useEffect } from 'react';
import Card from './components/Card'; // Import the Card component
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useNavigate } from 'react-router-dom'; // For redirecting if needed
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode to decode JWT tokens


const WatchlistPage = () => {
  const [watchlistedDramas, setWatchlistedDramas] = useState([]);
  const [user, setUser] = useState(null);
  const [toggleWatchlist, setToggleWatchlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            setUser(decoded.id); // Set the user ID
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }

    if (!user) {
      // If the user is not logged in, reeturn loading
        return;
    }

    // Fetch all watchlisted dramas for the user
    const fetchWatchlistedDramas = async () => {
      try {
        const response = await fetch(`/watchlist?user_id=${user}`);
        const data = await response.json();
        setWatchlistedDramas(data); // Set the watchlisted dramas
      } catch (error) {
        console.error("Failed to fetch watchlisted dramas:", error);
      }
    };

    fetchWatchlistedDramas();
  }, [user, navigate, toggleWatchlist]);

  const handleToggleWatchlist = () => {
    setToggleWatchlist(!toggleWatchlist); // Toggle the watchlist state
  };

  return (
    <div className="w-full lg:w-5/6">
        <Link to="/" className="text-3xl font-bold m-4 block text-blue-500 hover:text-blue-700">
            DramaKu
        </Link>
      <h1 className="text-2xl font-bold m-4">Your Watchlist</h1>
      {watchlistedDramas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchlistedDramas.map(drama => (
            <Card key={drama.id} drama={drama} user={user} onToggleWatchlist={handleToggleWatchlist}/> // Reuse Card component
          ))}
        </div>
      ) : (
        <p className="text-gray-700">Your watchlist is currently empty.</p>
      )}
    </div>
  );
};

export default WatchlistPage;
