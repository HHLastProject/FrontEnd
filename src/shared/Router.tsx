import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Filter from '../pages/Filter'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { path } from './path'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={path.filter} element={<Filter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router