import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { VFlex } from '../custom/ym/styleStore'
import { path } from './path'
import Login from '../pages/Login'
import ShopDetail from '../pages/ShopDetail'

import Admin from '../pages/Admin'
import AdminRegister from '../components/admin/AdminRegister'
import AdminUpdate from '../components/admin/AdminUpdate'

import RedirectNaver from '../pages/RedirectNaver'
import RedirectKakao from '../pages/RedirectKakao'

import AdminLogin from '../pages/AdminLogin'
import BottomNav from '../components/BottomNav'
import styled from 'styled-components'
import Search from '../pages/Search'
import Mypage from '../pages/Mypage'
import AllFeeds from '../pages/AllFeeds'
import FeedDetail from '../pages/FeedDetail'
import List from '../pages/List'
import Home from '../pages/Home'
import FeedForm from '../pages/FeedForm'
import Bookmark from '../pages/Bookmark'
import FeedList from '../pages/FeedList'
import FeedDetailComment from '../pages/FeedDetailComment'

const Router = () => {
  return (
    <BrowserRouter>
      <VFlex>
        <PageContainer id='page-container'>
          <Routes>
            <Route path={path.home} element={<Home />} />
            <Route path={path.list} element={<List />} />
            <Route path={path.login} element={<Login />} />
            <Route path={path.search} element={<Search />} />
            <Route path={path.feedFormSearch} element={<Search />} />
            <Route path={path.shopDetail} element={<ShopDetail />} />
            <Route path={path.feedForm} element={<FeedForm />} />
            <Route path={path.feedList} element={<FeedList />} />
            <Route path={path.feedComment} element={<FeedDetailComment />} />

            <Route path={path.adminShoplist} element={<Admin />} />
            <Route path={path.adminRegister} element={<AdminRegister />} />
            <Route path={path.adminUpdate} element={<AdminUpdate />} />
            <Route path={path.adminLogin} element={<AdminLogin />} />
            <Route path={path.redirectNaver} element={<RedirectNaver />} />
            <Route path={path.redirectKakao} element={<RedirectKakao />} />

            <Route path={path.bookmark} element={<Bookmark />} />

            <Route path={path.mypage} element={<Mypage />} />
            <Route path={path.allFeeds} element={<AllFeeds />} />
            <Route path={path.feedDetail} element={<FeedDetail />} />

          </Routes>
        </PageContainer>
        <BottomNav />
      </VFlex>
    </BrowserRouter>
  )
}

export default Router;

const PageContainer = styled.div`
  flex: 1;
  height: fit-content;
  overflow-y : scroll;
  background-color: white;

  /* 스크롤바 안 보이게 */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;