import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import DetailPage from './DetailPage';
import CMSDrama from './CMSDrama';
import CMSInputDrama from './CMSInputDrama';
import CMSComments from './CMSComments';
import CMSCountries from './CMSCountries';
import CMSAwards from './CMSAwards';
import CMSGenres from './CMSGenres';
import CMSActors from './CMSActors';
import CMSUsers from './CMSUsers';
import Login from './Login';
import Register from './Registrasi';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // Use 'null' as initial state to indicate loading
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if the user's role matches the requiredRole
        console.log('Decoded token:', decoded);
        if (decoded.role === requiredRole) {
          setIsAuthorized(true);
          console.log('User is authorized');
        } else {
          setIsAuthorized(false);
          console.log('User is not authorized');
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(false); // No token found
    }
  }, [token, requiredRole]);

  if (isAuthorized === null) {
    // Show a loading state while authorization is being checked
    return <div>Loading...</div>;
  }

  if (!token || !isAuthorized) {
    // Redirect to login if not authorized or no token
    console.log(`Redirecting to login because unauthorized: ${isAuthorized}`);
    return <Navigate to="/login" />;
  }

  // Render children if authorized
  return children;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detailPage" element={<DetailPage />} />
        <Route 
          path="/cms" 
          element={
            <ProtectedRoute requiredRole={0}> {/* Only admins */}
              <CMSDrama />
            </ProtectedRoute>
          } 
        />
        <Route path="/cms/input" element={<CMSInputDrama />} />
        <Route path="/cms/countries" element={<CMSCountries />} />
        <Route path="/cms/comments" element={<CMSComments />} />
        <Route path="/cms/awards" element={<CMSAwards />} />
        <Route path="/cms/genres" element={<CMSGenres />} />
        <Route path="/cms/actors" element={<CMSActors />} />
        <Route path="/cms/users" element={<CMSUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
);

reportWebVitals();