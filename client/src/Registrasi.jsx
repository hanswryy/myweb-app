import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Registrasi() {
  // Define state to store form inputs and feedback messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // handle username < 5 characters and > 50 characters
    if (username.length < 5 || username.length > 50) {
      setMessage('Username must be between 5 and 50 characters');
      return;
    }

    // handle password < 8 characters and > 50 characters
    if (password.length < 8 || password.length > 50) {
      setMessage('Password must be between 8 and 50 characters');
      return;
    }

    // Prepare the data for the API call
    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration was successful
        setMessage('Registration successful! Please login.');
      } else {
        // Handle errors (e.g., user already exists)
        setMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      // Handle server errors
      setMessage('Error: Unable to register. Please try again later.');
    }
  };

  return (
    <div className='bg-blue-100 min-h-screen flex flex-col'>
      <div className='flex justify-start m-8'>
          <Link to="/" className="text-2xl font-bold">DramaKu</Link>
      </div>
      <div className="login-container">
            <div className="login-box">
              <h1>Registration</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn login-btn">
                  Register
                </button>
              </form>

              {message && <p className="message">{message}</p>}

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-700">Already have an account? </span>
                <a href="/login" className="text-sm text-blue-600 hover:underline">
                  Login
                </a>
              </div>
            </div>
          </div>
    </div>
    
  );
}

export default Registrasi;
