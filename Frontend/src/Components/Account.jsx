import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <h1 style={{ color: '#5a2a83', marginBottom: '1.5rem', textAlign: 'center' }}>My Account</h1>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Email:</strong> <span>{user.email || 'Not provided'}</span>
      </div>
      {user.name && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Name:</strong> <span>{user.name}</span>
        </div>
      )}

      <button
        style={{
          marginTop: '2rem',
          backgroundColor: '#5a2a83',
          color: 'white',
          padding: '0.7rem 1.4rem',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'block',
          width: '100%'
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
