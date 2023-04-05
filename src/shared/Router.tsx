import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import AdminRegister from '../components/admin/AdminRegister'
import AdminUpdate from '../components/admin/AdminUpdate'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/shoplist" element={<Admin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/update/:shopId" element={<AdminUpdate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router