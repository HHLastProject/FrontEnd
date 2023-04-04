import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import MealFilter from '../pages/MealFilter'
import ShopDetail from '../pages/ShopDetail'
import { path } from './path'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={path.mealFilter} element={<MealFilter />} />
        <Route path={path.shopDetail} element={<ShopDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router