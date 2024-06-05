import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/Logo.png'; // Adjust the path to your logo file

function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/customer-login');
  };

  const handleGetStarted = () => {
    navigate('/customer-register');
  };

  return (
    <header className="Navbar-header">
      <div className="header-left">
        <img src={logo} alt="HealthWellness Logo" className="logo" />
      </div>
      <nav className="Navbar-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/customer-login">Customer Login</Link></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#plans">Plans</a></li>
          <li><a href="#consultants">Consultants</a></li>
          <li><a href="#individuals">Individuals</a></li>
          <li><a href="#resources">Resources</a></li>
        </ul>
      </nav>
      <div className="header-right">
        <button className="login-button" onClick={handleLogin}>Login</button>
        <button className="demo-button" onClick={handleGetStarted}>Get Started</button>
      </div>
    </header>
  );
}

export default Navbar;

