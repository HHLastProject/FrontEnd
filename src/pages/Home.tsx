import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { apiPath, imgPath, path } from '../shared/path';
import { getUserLocation } from '../custom/jh/getUserLocation';
import { useGetHomeShopList } from '../custom/jh/useGetHomeShopList';
import NoShop from '../components/home/NoShop';
import HomeShopPostCard from '../components/home/HomePostCard';
import ListCount from '../components/ListCount';
import { HomeTabMenuStyle, TabMenuLi, TabMenuUl } from '../components/TabMenu';

const Home = () => {
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
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

  const {
    shopList,
    getshopList,
    getshopListIsLoading,
    getshopListIsError,
  } = useGetHomeShopList({ lng, lat, range });

  //useEffect
  useEffect(() => {
    naverAccessToken();
    localStorage.getItem('admin_token') && navi('/admin/shoplist');
  }, []);

  useEffect(() => {
    const errorMsg = getUserLocation(setLng, setLat);
    if (errorMsg) {
      console.log(errorMsg);
    };
    if (lng !== 0 && lat !== 0) { getshopList(); };
  }, [lng, lat]);

  const loginClickHandler = () => {
    navi(path.login);
  }
  const mapClickHandler = () => {
    navi(path.map);
  }

  //로딩 화면
  if (getshopListIsLoading) { return <div>로딩중...</div>; }

  return (
    <>
      <HomeWrap>
        <HomeContainer>
          {/* <NoShop/> */}
          <button className='floating-btn' onClick={mapClickHandler}>지도에서 보기</button>
          <header>
            <div className='space-between'>
              <button onClick={loginClickHandler}>로그인 하기</button>
              <button onClick={() => navi('/search')}>검색 페이지</button>
            </div>
          </header>

          <header>
            <HomeTabMenuStyle>
              <TabMenuUl>
                <TabMenuLi id={1} isChecked={true}>
                  <div>
                    내 주변
                    <ListCount>{shopList?.length}</ListCount>
                  </div>
                </TabMenuLi>
                <TabMenuLi id={2}>
                  추천식당
                </TabMenuLi>
              </TabMenuUl>
            </HomeTabMenuStyle>
          </header>

          <div className='space-between'>
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
              (shopList?.length === 0) && <NoShop />
            }
            {
              shopList?.map((item: any) => (
                <HomeShopPostCard
                  key={item.shopId}
                  id={item.shopId}
                  address={item.address}
                  shopName={item.shopName}
                  thumbnail={item.thumbnail}
                  category={item.category}
                />
              ))
            }
            <button>더 보기</button>
          </HomeShopListContainer>
        </HomeContainer>
      </HomeWrap>
      </>
  );
};

export default Home;

export const HomeWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
`;

const HomeContainer = styled.div`
  width: (100%-20)px;
  margin: 20px;

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
  margin: 20px 0 120px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;