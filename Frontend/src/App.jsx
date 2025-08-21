import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './UI/Navbar';
import AddItem from './Components/AddItem';
import Lost from './UI/Lost';
import Found from './UI/Found';
import ViewItems from './Components/ViewItems';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Account from './Components/Account';

function useIsAuthed() {
  return Boolean(localStorage.getItem('token'));
}

function RequireAuth({ children }) {
  const isAuthed = useIsAuthed();
  const location = useLocation();
  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function RequireGuest({ children }) {
  const isAuthed = useIsAuthed();
  if (isAuthed) {
    return <Navigate to="/account" replace />;
  }
  return children;
}

export default function App() {
  const isAuthed = useIsAuthed();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<RequireGuest><Login /></RequireGuest>} />
        <Route path="/register" element={<RequireGuest><Register /></RequireGuest>} />
        <Route path="/forgot-password" element={<RequireGuest><ForgotPassword /></RequireGuest>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<RequireAuth><AddItem /></RequireAuth>} />
        <Route path="/lost" element={<RequireAuth><Lost /></RequireAuth>} />
        <Route path="/found" element={<RequireAuth><Found /></RequireAuth>} />
        <Route path="/all" element={<RequireAuth><ViewItems /></RequireAuth>} />
        <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
        <Route path="*" element={isAuthed ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

