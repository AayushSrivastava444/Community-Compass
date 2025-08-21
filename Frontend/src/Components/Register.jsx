import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../lib/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, { email, password });
      setSuccess(res.data?.message || 'Registered successfully');
      setEmail('');
      setPassword('');
    } catch (x) {
      setErr(x.response?.data?.message || x.message);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{
        maxWidth: 520,
        margin: '4rem auto 1rem',
        padding: '2rem',
        background: '#f6f6f6',
        borderRadius: 12,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>Create Account</h2>
      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: '0.8rem', fontSize: '1rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: '0.8rem', fontSize: '1rem' }}
      />
      <button type="submit" style={{ padding: '0.9rem', fontSize: '1rem', cursor: 'pointer' }}>
        Register
      </button>
    </form>
  );
}
