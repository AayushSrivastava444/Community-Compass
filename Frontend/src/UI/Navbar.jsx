import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const loginMethod = localStorage.getItem('loginMethod')

  const handleLogout = () => {
    if (loginMethod === 'google') {
      const auth2 = window.gapi?.auth2?.getAuthInstance()
      if (auth2) {
        auth2.signOut().then(() => {
          console.log('Google user signed out.')
        })
      }
    }
    localStorage.removeItem('token')
    localStorage.removeItem('loginMethod')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">Community Compass</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/lost">Lost</Link></li>
        <li><Link to="/found">Found</Link></li>

        {!token && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {token && (
          <li>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

