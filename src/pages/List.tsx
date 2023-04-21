import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { path } from '../shared/path';
import { getUserLocation } from '../custom/jh/getUserLocation';
import { useGetHomeShopList } from '../custom/jh/useGetHomeShopList';
import NoShop from '../components/home/NoShop';
import HomeShopPostCard from '../components/home/HomePostCard';
import ListCount from '../components/ListCount';
import { HomeTabMenuStyle, TabMenuLi, TabMenuUl } from '../components/TabMenu';
import { Swiper, SwiperSlide } from 'swiper/react';
import SelectBox from '../components/SelectBox';
import useOnClickHiddenHandler from '../custom/jh/useOnClickHiddenHandler';
import useNavigateHandler from '../custom/jh/useNavigateHandler';
import { useNavigate } from 'react-router';
import { RangeContext } from '../apis/context';
import ListHeader from '../components/home/ListHeader';
import { LoginCheck } from '../components/Authentication';
import CategoryButtonBar from '../components/map/CategoryButtonBar';
import ListCategoryButtonBar from '../components/home/ListCategoryButtonBar';
import { Link } from 'react-router-dom';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import { Body3, Title5 } from '../components/FontStyle';
import { Buttons } from '../components/ui/element/buttons/Buttons';
import { IconSmallDownArrow } from '../components/ui/element/icons/IconsStyle';

const List = () => {
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [orderBy, setOrderBy] = useState<string>('거리순');
  // const {range, setRange} = useContext(RangeContext);
  const [range, setRange] = useState(500);

  const navi = useNavigate();
  const {loginClickHandler, mapClickHandler, searchClickHandler} = useNavigateHandler();

  //선택창 보이기
  const {isSelectHidden, onClickHiddenHandler} = useOnClickHiddenHandler(true);

  //토큰 가져오기
  const naverAccessToken = () => {
    window.location.href.includes('access_token') && getNaverToken();
  };
  const getNaverToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    localStorage.setItem('access_token', token);
  };

  //리스트 데이터
  const {
    shopList,
    getshopList,
    getshopListIsLoading,
    getshopListIsError,
  } = useGetHomeShopList({ lng, lat, range });

  //useEffect
  useEffect(() => {
    naverAccessToken();
    localStorage.getItem('admin_token') && navi(path.adminShoplist);
  }, []);

  useEffect(() => {
    const errorMsg = getUserLocation(setLng, setLat);
    if (errorMsg) {
      console.log(errorMsg);
    };
    if (lng !== 0 && lat !== 0) { getshopList(); };
  }, [lng, lat]);

  //로딩 화면
  if (getshopListIsLoading) { return <div>로딩중...</div>; }

  return (
    <>
      <SelectBox
        arr={['거리순', '인기순']}
        hidden={isSelectHidden}
        onClickHiddenHandler={onClickHiddenHandler}
      />
      <ListHeader
        range={500}
      />
      <HomeWrap>
        <HomeContainer>
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
      
          <div>
            <input type="checkbox" id="by-range" name="by-range" hidden />
            <div>
              <FilterBtn
                icon={<IconSmallDownArrow/>}
                onClick={onClickHiddenHandler}
              >
                <label>거리순</label>
              </FilterBtn>
              <ListCategoryButtonBar/>
            </div>
          </div>
      
          {/* <Swiper
            
          >
            <SwiperSlide> */}
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
                      distance={item.distance}
                      feedCount={item.feedCount}
                    />
                  ))
                }
              </HomeShopListContainer>
            {/* </SwiperSlide>
          </Swiper> */}
          
        </HomeContainer>
      </HomeWrap>
    </>
  );
};

export default List;

export const HomeWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #fff;
`;

const HomeContainer = styled.div`
  width: (100%-20)px;
  margin: 0 20px 120px 20px;
/* 
  .floating-btn {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: transxeX( -50% );
  } */
`;

const HomeShopListContainer = styled.div`
  width: 100%;
  margin: 20px 0 120px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const FilterBtn = ({children, icon, onClick}: {children: React.ReactNode, icon?: JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>}) => {
  return(
    <FilterBtnStyle
      onClick={onClick}
    >
      <div>
        <Body3>{children}</Body3>
        {icon}
      </div>
    </FilterBtnStyle>
  )
}

const FilterBtnStyle = styled.button`
  background-color: ${colorSet.bgMedium};
  border: none;
  padding: 8px 12px;
  border-radius: 100px;
  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;