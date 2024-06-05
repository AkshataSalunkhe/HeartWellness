import React, { useState } from 'react';
import Navbar from './Navbar';
import './CustomerLogin.css';

function CustomerLogin({ isNewUser }) {
  const [isRegistering, setIsRegistering] = useState(isNewUser);

  const toggleUserMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div>
      <Navbar />
      <div className="CustomerLogin">
        <h1>{isRegistering ? 'Register' : 'Customer Login'}</h1>
        {isRegistering ? (
          <form className="form">
            <label>Name</label>
            <input type="text" placeholder="Name" required />

            <label>Email</label>
            <input type="email" placeholder="Email" required />

            <label>Phone Number</label>
            <input type="tel" placeholder="Phone Number" required />

            <label>Password</label>
            <input type="password" placeholder="Password" required />

            <button type="submit">Register</button>
            <p>Already have an account? <span onClick={toggleUserMode}>Login here</span></p>
          </form>
        ) : (
          <form className="form">
            <label>Email</label>
            <input type="email" placeholder="Email" required />

            <label>Password</label>
            <input type="password" placeholder="Password" required />

            <button type="submit">Login</button>
            <p>New user? <span onClick={toggleUserMode}>Register here</span></p>
          </form>
        )}
      </div>
    </div>
  );
}

export default CustomerLogin;
