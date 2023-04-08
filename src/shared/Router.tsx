import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import MealFilter from '../pages/MealFilter'
import ShopDetail from '../pages/ShopDetail'
import { path } from './path'

import Admin from '../pages/Admin'
import AdminRegister from '../components/admin/AdminRegister'
import AdminUpdate from '../components/admin/AdminUpdate'

import RedirectNaver from '../pages/RedirectNaver'
import RedirectKakao from '../pages/RedirectKakao'
import Map from '../pages/Map'


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path={path.mealFilter} element={<MealFilter />} />
        <Route path={path.shopDetail} element={<ShopDetail />} />


        <Route path="/admin/shoplist" element={<Admin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/:id" element={<AdminUpdate />} />

        <Route path="/redirect/naver" element={<RedirectNaver />} />
        <Route path="/redirect/kakao" element={<RedirectKakao />} />
        <Route path="/map" element={<Map />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router