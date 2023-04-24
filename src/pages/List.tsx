import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getUserLocation } from '../custom/jh/getUserLocation';
import { useGetHomeShopList } from '../custom/jh/useGetHomeShopList';
import NoShop from '../components/home/NoShop';
import HomeShopPostCard from '../components/home/HomePostCard';
import ListCount from '../components/ListCount';
import { HomeTabMenuStyle, TabMenuLi, TabMenuUl } from '../components/TabMenu';
import SelectBox from '../components/SelectBox';
import useOnClickHiddenHandler from '../custom/jh/useOnClickHiddenHandler';
import ListHeader from '../components/home/ListHeader';
import ListCategoryButtonBar from '../components/home/ListCategoryButtonBar';
import { colorSet } from '../components/ui/styles/color';
import { Body3 } from '../components/FontStyle';
import { IconSmallDownArrow } from '../components/ui/element/icons/IconsStyle';
import { ListTossedData } from '../custom/ym/types';
import { HFlex } from '../custom/ym/styleStore';

const List = () => {
  const [lng, setLng] = useState(127.0468975);
  const [lat, setLat] = useState(37.5108407);
  const [orderBy, setOrderBy] = useState<string>('거리순');
  const [range, setRange] = useState(500);
  
  //선택창 보이기
  const { isSelectHidden, onClickHiddenHandler } = useOnClickHiddenHandler(true);

  //리스트 데이터
  const {
    shopList,
    getshopList,
    getshopListIsSuccess,
    getshopListIsLoading,
    getshopListIsError,
  } = useGetHomeShopList({ lng, lat, range });

  useEffect(() => {
    const errorMsg = getUserLocation(setLng, setLat);
    if (errorMsg) {
      console.log(errorMsg);
    };
    if (lng !== 0 && lat !== 0) {
      getshopList();
    };
  }, [lng, lat]);

  //로딩 화면

  // if (getshopListIsLoading) { return <div>로딩중...</div>; }
  // if (getshopListIsSuccess) return <div>값은가져옴</div>;
  // if (getshopListIsError) return <div>에러</div>;

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
                  내 주변
                  <ListCount>{shopList?.length as number}</ListCount>
                </TabMenuLi>
                <TabMenuLi id={2}>
                  추천식당
                </TabMenuLi>
              </TabMenuUl>
            </HomeTabMenuStyle>
          </header>
          <div style={{ overflow: 'hidden', }}>
            <input type="checkbox" id="by-range" name="by-range" hidden />
            <HFlex gap='4px'>
              <FilterBtn
                icon={<IconSmallDownArrow />}
                onClick={onClickHiddenHandler}
              >
                <label>거리순</label>
              </FilterBtn>
              <ListCategoryButtonBar />
            </HFlex>
          </div>

          <HomeShopListContainer>
            {
              (shopList?.length === 0) && <NoShop />
            }
            {
              shopList?.map((item: ListTossedData) => (
                <HomeShopPostCard
                  key={item?.shopId}
                  id={item?.shopId}
                  address={item?.address}
                  shopName={item?.shopName}
                  thumbnail={item?.thumbnail}
                  category={item?.category}
                  distance={item?.distance}
                  feedCount={item?.feedCount}
                />
              ))
            }
          </HomeShopListContainer>

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
  width: 350px;
  padding: 0px 20px;
  /* margin: 0 20px 120px 20px; */
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

const FilterBtn = ({ children, icon, onClick }: { children: React.ReactNode, icon?: JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
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
  flex: none;
  div {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 4px;
  }
`;