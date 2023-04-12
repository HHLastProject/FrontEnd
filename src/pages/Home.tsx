import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { apiPath, path } from '../shared/path';
import { getUserLocation } from '../custom/jh/getUserLocation';
import { useGetHomeShopList } from '../custom/jh/useGetHomeShopList';
import NoShop from '../components/home/NoShop';
import HomeShopPostCard from '../components/home/HomePostCard';

const Home = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [range, setRange] = useState(500);

  const navi = useNavigate();
  const navigate = (path: string) => {
    return navi(path);
  };

  //토큰 가져오기
  const naverAccessToken = () => {
    window.location.href.includes('access_token') && getNaverToken();
  };
  const getNaverToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    localStorage.setItem('access_token', token);
  };

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
    console.log('x', x, 'y', y);
    if (x !== 0 && y !== 0) { getshopList(); };
  }, [x, y]);

  //로딩 화면
  if(getshopListIsLoading) { return <div>로딩중...</div>; }

  return (
    <Wrap>
      <HomeWrap>
        <HomeContainer>
          <button className='floating-btn' onClick={() => navi(path.map)}>지도에서 보기</button>
          <header>
            <div className='space-between'>
              <span>
                <label>내 주변</label>
                {shopList?.length}
              </span>
              <button onClick={() => navi(path.login)}>로그인 하기</button>
            </div>
          </header>

          <div className='space-between'>
            <h3>식당</h3>
            <input type="checkbox" id="by-range" name="by-range" hidden />
            <span>
              <button>
                <label htmlFor="by-range">
                  거리순
                </label>
              </button>
            </span>
          </div>

          <HomeShopListContainer>
            {
              (shopList?.length === 0) && <NoShop/>
            }
            {
              shopList?.map((item: any) => (
                <HomeShopPostCard
                  key={item.shopId}
                  id={item.shopId}
                  address={item.address}
                  shopName={item.shopName}
                  thumbnail={`${apiPath.imgUrl + item.thumbnail}`}
                  menuName={item.menuName}
                  maxPrice={item.maxPrice}
                  minPrice={item.minPrice}
                  category={item.category}
                />
              ))
            }
            <button>더 보기</button>
          </HomeShopListContainer>
        </HomeContainer>
      </HomeWrap>
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #acacac;
`;

const HomeWrap = styled.div`
  width: 390px;
  background-color: #fff;
`;

const HomeContainer = styled.div`
  width: (100%-20)px;
  position: relative;
  margin: 20px;
  @media (max-width: 390px) {

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
  justify-content: center;
  gap: 12px;
`;
