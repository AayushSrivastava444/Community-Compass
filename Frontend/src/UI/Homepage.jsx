import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  return (
    <div className="homepage container">
      <h1>Community Compass</h1>
      <p>Your trusted lost & found platform—Reconnect with what matters.</p>
      <div className="cta-grid">
        <Link to="/Lost" className="cta lost">Browse Lost Items</Link>
        <Link to="/Found" className="cta found">Browse Found Items</Link>
        <Link to="/add-item" className="cta add">Post Lost/Found Item</Link>
      </div>
    </div>
  );
}
