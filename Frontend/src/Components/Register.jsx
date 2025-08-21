import React, { useState } from 'react';
import axios from 'axios';

const api = 'http://localhost:5000/api/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr(''); setOk('');
    try {
      const res = await axios.post(`${api}/register`, { email, password });
      setOk(res.data?.message || 'Registered successfully!');
      if (res.data?.token) localStorage.setItem('token', res.data.token);
      if (res.data?.user) localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/account';
    } catch (x) {
      setErr(x.response?.data?.message || x.message);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{
      position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)',
      width:'100%', maxWidth:'500px', padding:'3rem 2.5rem', background:'#f5f5f5',
      borderRadius:'15px', boxShadow:'0 0 20px rgba(0,0,0,0.1)', display:'flex',
      flexDirection:'column', gap:'1.2rem'
    }}>
      <h2 style={{ textAlign:'center', marginBottom:'0.5rem' }}>Register</h2>
      {err && <p style={{ color:'red', textAlign:'center' }}>{err}</p>}
      {ok && <p style={{ color:'green', textAlign:'center' }}>{ok}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ fontSize:'1.1rem', padding:'0.8rem' }} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={{ fontSize:'1.1rem', padding:'0.8rem' }} />
      <button type="submit" style={{ fontSize:'1.1rem', padding:'0.8rem' }}>Register</button>
    </form>
  );
}
