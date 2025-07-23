import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './UI/Navbar'
import AddItem from './Components/AddItem'
import Lost from './UI/Lost'
import Found from './UI/Found'
import ViewItems from './Components/ViewItems'
import Login from './Components/Login'
import Register from './Components/Register'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddItem />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/found" element={<Found />} />
        <Route path="/all" element={<ViewItems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  )
}
