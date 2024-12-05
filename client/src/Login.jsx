import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Importing the required components
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  console.log('REACT_APP_GOOGLE_CLIENT_ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('/auth/login', {
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
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google login successful!', credentialResponse);
    
    // Send the Google token to your backend for verification
    const res = await fetch('/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: credentialResponse.credential, // Get the token from the response
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Store the token and navigate on success
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      setErrorMessage(data.error || 'Failed to login with Google. Please try again.');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    setErrorMessage('Google login failed. Please try again.');
  };

  return (
    // create Title DramaKu and back button
    <div className='bg-blue-100 min-h-screen flex flex-col'>
      <div className='flex justify-start m-8'>
          <Link to="/" className="text-2xl font-bold">DramaKu</Link>
      </div>
      <div className="">
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
            </form>

            {/* give blank space to divide */}
            <div className='mb-4'></div>

            <GoogleLogin className="p-4"
              data-testid="google-login"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              style={{ marginTop: '10px' }}
            />
            
            {/* <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
            </div> */}
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-700">Don't have an account?</span>
              <a href="/register" className="text-sm text-blue-600 hover:underline"> Register</a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
}

// Wrap your application with GoogleOAuthProvider in the main index file (e.g., index.js)
const App = () => (
  <GoogleOAuthProvider clientId={"325515720074-ui0c79kuoe3fto2376gs6k9s3arllm8j.apps.googleusercontent.com"}>
    <Login />
  </GoogleOAuthProvider>
);


export default App;
