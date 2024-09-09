import React from 'react';
import './App.css';
import './index.css';
import './Login.css';

function Registrasi() {
  return (
    <div className="login-container">
        <div className="login-box">
            <h1>Registration</h1>
            <form>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit" class="btn login-btn">Sign out</button>
                <button type="button" class="btn google-btn">Sign out with Google</button>
            </form>
            <div className="mt-6 text-center">
                    <span className="text-sm text-gray-700">Already have an account?</span>
                    <a href="Registrasi.jsx" className="text-sm text-blue-600 hover:underline"> Login</a>
            </div>
        </div>
    </div>
  );
}

export default Registrasi;
