import React, { useState } from 'react'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

const api = 'http://localhost:5000/api/auth'

export default function Login() {
  const [e, setE] = useState('')
  const [p, setP] = useState('')
  const [err, setErr] = useState('')

  const lg = async (i) => {
    i.preventDefault()
    setErr('')
    try {
      const r = await axios.post(`${api}/login`, { email: e, password: p })
      alert('Login successful!')
      localStorage.setItem('user', JSON.stringify(r.data))
      setE('')
      setP('')
    } catch (x) {
      setErr(x.response?.data?.message || x.message)
    }
  }

  const gg = async (r) => {
    try {
      const d = jwt_decode(r.credential)
      const res = await axios.post(`${api}/google`, {
        email: d.email,
        name: d.name,
        googleId: d.sub,
      })
      alert('Google login successful!')
      localStorage.setItem('user', JSON.stringify(res.data))
    } catch (x) {
      setErr('Google login failed')
    }
  }

  return (
    <form
      onSubmit={lg}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '500px',
        padding: '3rem 2.5rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Login</h2>
      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}
      <input
        placeholder="Email"
        value={e}
        onChange={(i) => setE(i.target.value)}
        required
        style={{ fontSize: '1.1rem', padding: '0.8rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={p}
        onChange={(i) => setP(i.target.value)}
        required
        style={{ fontSize: '1.1rem', padding: '0.8rem' }}
      />
      <button type="submit" style={{ fontSize: '1.1rem', padding: '0.8rem' }}>
        Login
      </button>
      <div style={{ marginTop: 10, alignSelf: 'center' }}>
        <GoogleLogin onSuccess={gg} onError={() => setErr('Google failed')} />
      </div>
    </form>
  )
}
