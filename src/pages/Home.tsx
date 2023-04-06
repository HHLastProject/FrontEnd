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
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [range, setRange] = useState(500);

  const navi = useNavigate();
  const navigate = (path: string) => {
    return navi(path);
  }

  //토큰 가져오기
  const naverAccessToken = () => {
    window.location.href.includes('access_token') && getNaverToken();
  }
  const getNaverToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    localStorage.setItem('access_token', token);
  }

  //가게 리스트 쿼리
  const {
    shopList,
    getshopList,
    getshopListIsLoading,
    getshopListIsError,
  } = useGetHomeShopList({x, y, range});

  //useEffect
  useEffect(() => {
    naverAccessToken();
  }, []);
  useEffect(() => {
    const errorMsg = getUserLocation(setX, setY);
    if(errorMsg) {
      console.log(errorMsg);
    };
    console.log(x, y);
    if (x !== 0 && y !== 0) { getshopList(); };
  }, [x, y]);

  //로딩 화면
  if (getshopListIsLoading) { return <div>로딩중...</div>; }

  return (
    <HomeWrap>
      <HomeContainer>
        <button className='floating-btn'>지도에서 보기</button>

        <div className='space-between'>
          <label>내 위치로부터 {range}</label>
          <button onClick={() => navi(path.login)}>Login 화면</button>
          <button onClick={() => navi(path.map)}>지도로 보기</button>
        </div>

        <div className='space-between'>
          <h3>식당</h3>
          <input type="checkbox" id="by-range" name="by-range" hidden />
          <span>
            <button>
              <label htmlFor="by-range">
                거리순
              </label>
            </button>
            <button onClick={() => navi(path.mealFilter)}>
              필터
            </button>
          </span>
        </div>

        <HomeShopListContainer>
          {
            (shopList?.length === 0) && <div>주변에 식당이 없습니다.</div>
          }
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
    transform: transxeX( -50% );
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
