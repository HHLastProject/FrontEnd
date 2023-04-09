import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeShopPostCard from '../components/jh/Home/HomePostCard';
import { path } from '../shared/path';
import { getUserLocation } from '../custom/jh/getUserLocation';
import { useGetHomeShopList } from '../custom/jh/useGetHomeShopList';

const Home = () => {
  interface IClickProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const navi = useNavigate();
  const navigate = (path: string) => {
    return navi(path);
  }

  const {
    shopList,
    getshopList,
    getshopListIsLoading,
    getshopListIsError,
  } = useGetHomeShopList(lat, lng);

  useEffect(() => {
    localStorage.getItem('admin_token') && navi('/admin/shoplist');
    getUserLocation(setLat, setLng);
    console.log(lat, lng);
    if (lat === 0 && lng === 0) { getshopList(); };
  }, [lat, lng]);

  const loginClickHandler = () => {
    navi('/login');
  }
  const mapClickHandler = () => {
    navi('/map');
  }

  if (getshopListIsLoading) { return <div>로딩중...</div>; }

  return (
    <HomeWrap>
      <HomeContainer>
        <button className='floating-btn' onClick={mapClickHandler}>지도에서 보기</button>

        <div className='space-between'>
          <label>내 위치로부터 500m</label>
          <button onClick={loginClickHandler}>Login 화면</button>
        </div>

        <div className='space-between'>
          <h3>식당</h3>
          <input type="checkbox" id="by-distance" name="by-distance" hidden />
          <span>
            <button>
              <label htmlFor="by-distance">
                거리순
              </label>
            </button>
            <button onClick={() => navigate(path.mealFilter)}>
              필터
            </button>
          </span>
        </div>

        <HomeShopListContainer>
          {
            shopList?.map((item: any) => (
              <HomeShopPostCard
                key={item.shopId}
                id={item.shopId}
                address={item.address}
                shopName={item.shopName}
                thumbnail={item.thumbnail}
                menuName={item.menuName}
                maxPrice={item.maxPrice}
                minPrice={item.minPrice}
                category={item.category}
              />
            )
            )}
        </HomeShopListContainer>
      </HomeContainer>
    </HomeWrap>
  );
}

export default Home;

const HomeWrap = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #acacac;
`;

const HomeContainer = styled.div`
  max-width: 1600px;
  width: 375px;
  position: relative;
  padding: 20px;
  background-color: #fff;
  @media (max-width: 1600px) {
    
  }
  @media (max-width: 1334px) {
    
  }
  @media (max-width: 1024px) {
    
  }
  @media (max-width: 720px) {
    
  }
  
  .floating-btn {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX( -50% );
  }

  .space-between {
    display: flex;
    justify-content: space-between;
  }
`;

const HomeShopListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
