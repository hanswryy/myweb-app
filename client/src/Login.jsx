import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error); // Set error message if credentials are invalid
        return;
      }

      const data = await response.json();
      const token = data.token;

      // Store the token in localStorage (or handle it according to your needs)
      localStorage.setItem('token', token);
      // Redirect to the dashboard or another page after successful login
      console.log('Login successful!', token);
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      {/* Centering the login-box */}
      <div className="login-box">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
            />
          </div>
          <button type="submit" className="btn login-btn">Sign in</button>
          <button type="button" className="btn google-btn">Sign in with Google</button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-700">Don't have an account?</span>
          <a href="/registrasi" className="text-sm text-blue-600 hover:underline"> Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
