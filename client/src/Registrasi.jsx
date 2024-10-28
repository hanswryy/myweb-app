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
    <div>
      <div className='flex justify-start m-4'>
        <div className="flex items-center mb-4">
            <Link to="/" className="mr-4 text-blue-500 hover:underline">
                &larr; Back
            </Link>
        </div>
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
                <button type="button" className="btn google-btn">
                  Sign in with Google
                </button>
              </form>

              {message && <p className="message">{message}</p>}

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-700">Already have an account?</span>
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
