import React, { useState } from 'react'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

const api = 'http://localhost:5000/api/auth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    try {
      const res = await axios.post(`${api}/register`, { email, password })
      alert('Registered successfully!')
      setSuccessMsg(res.data.message || 'Success')
      localStorage.setItem('user', JSON.stringify(res.data))
      setEmail('')
      setPassword('')
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message)
    }
  }

  const handleGoogle = async (response) => {
    setErrorMsg('')
    setSuccessMsg('')
    try {
      const decoded = jwt_decode(response.credential)
      const res = await axios.post(`${api}/google`, {
        email: decoded.email,
        name: decoded.name,
        googleId: decoded.sub,
      })
      alert('Google sign-in successful!')
      localStorage.setItem('user', JSON.stringify(res.data))
      setSuccessMsg('Google sign-in successful')
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message)
    }
  }

  return (
    <form
      onSubmit={handleRegister}
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
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Register</h2>
      {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green', textAlign: 'center' }}>{successMsg}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ fontSize: '1.1rem', padding: '0.8rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ fontSize: '1.1rem', padding: '0.8rem' }}
      />
      <button type="submit" style={{ fontSize: '1.1rem', padding: '0.8rem' }}>
        Register
      </button>
      <div style={{ marginTop: '1rem', alignSelf: 'center' }}>
        <GoogleLogin onSuccess={handleGoogle} onError={() => setErrorMsg('Google sign-in failed')} />
      </div>
    </form>
  )
}
