import React from 'react';
import './App.css';
import './index.css';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <form>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn login-btn">Sign in</button>
                    <button type="button" className="btn google-btn">Sign in with Google</button>
                </form>
                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
                </div>
                <div className="mt-2 text-center">
                    <span className="text-sm text-gray-700">Don't have an account?</span>
                    <a href="Registrasi.jsx" className="text-sm text-blue-600 hover:underline"> Register</a>
                </div>
            </div>
        </div>
  );
}

export default Login;