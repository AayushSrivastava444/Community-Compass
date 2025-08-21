import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Community Compass</div>
      <ul className="navbar-links">
        {token && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/lost">Lost</Link></li>
            <li><Link to="/found">Found</Link></li>
            <li><Link to="/all">All</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}
        {!token && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
