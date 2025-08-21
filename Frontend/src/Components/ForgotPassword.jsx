import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setSuccess(res.data.message);
      setEmail('');
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleForgotPassword} style={{ maxWidth: 400, margin: 'auto', padding: '2rem', backgroundColor: '#fefefe', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center', color: '#5a2a83' }}>Forgot Password</h2>
      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', fontSize: '1rem' }}
      />
      <button type="submit" style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', backgroundColor: '#5a2a83', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Send Reset Link
      </button>
    </form>
  );
}
