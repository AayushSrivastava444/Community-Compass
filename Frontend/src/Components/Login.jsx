import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      if (res.data?.token) localStorage.setItem('token', res.data.token);
      if (res.data?.user) localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/account';
    } catch (x) {
      setErr(x.response?.data?.message || x.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
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
      autoComplete="off"
    >
      <h2 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>Login</h2>
      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
      <input
        type="email"
        placeholder="Email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: '0.8rem', fontSize: '1rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: '0.8rem', fontSize: '1rem' }}
      />
      <button type="submit" style={{ padding: '0.9rem', fontSize: '1rem', cursor: 'pointer' }}>
        Login
      </button>

      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <a href="/forgot-password" style={{ color: '#5a2a83', textDecoration: 'underline' }}>
          Forgot Password?
        </a>
      </div>
    </form>
  );
}
