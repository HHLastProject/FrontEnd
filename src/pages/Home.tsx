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

  const naverAccessToken = () => {
    window.location.href.includes('access_token') && getNaverToken();
  }

  const getNaverToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    localStorage.setItem('access_token', token);
  }

  const { 
    shopList,
    getshopList,
    getshopListIsLoading,
    getshopListIsSuccess,
    getshopListIsError,
  } = useGetHomeShopList(lat, lng);

  useEffect(() => {
    naverAccessToken();
  }, []);

  useEffect(() => {
    getUserLocation(setLat, setLng);
    console.log(lat, lng);
    if (lat === 0 && lng === 0) {getshopList();};
  }, [lat, lng]);
  
  console.log('샵리스트',shopList);
  return (
    <HomeWrap>
      <HomeContainer>
        <button>지도에서 보기</button>
        
        <button
          onClick={() => navigate(path.login)}
        >
          로그인하기
        </button>

        <input type="checkbox" id="by-distance" name="by-distance" hidden/>
        <button>
          <label htmlFor="by-distance">거리순</label>
        </button>
        <button onClick={() => navigate(path.mealFilter)}>
          필터
        </button>

        <HomeShopListContainer>
          {
            shopList?.shop?.map((item:any) => (
              <HomeShopPostCard
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
  )
}

export default Home

export const HomeWrap = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const HomeContainer = styled.div`
  max-width: 1600px;
  @media (max-width: 1600px) {
    
  }
  @media (max-width: 1334px) {
    
  }
  @media (max-width: 1024px) {
    
  }
  @media (max-width: 720px) {
    
  }
`;

const HomeShopListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
