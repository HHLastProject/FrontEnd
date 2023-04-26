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
import { ListTossedData, categoryTypes } from '../custom/ym/types';
import { HFlex } from '../custom/ym/styleStore';
import { ShopCategory } from '../apis/context';

const List = () => {
  const [lng, setLng] = useState(127.0468975);
  const [lat, setLat] = useState(37.5108407);
  const [orderBy, setOrderBy] = useState<string>('거리순');
  const [range, setRange] = useState(500);
  const [category, setCategory] = useState<categoryTypes>("");
  
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

  if (getshopListIsLoading) { return <div>로딩중...</div>; }
  // if (getshopListIsError) return <div>에러</div>;

  return (
    <ShopCategory.Provider value={
      {range, setRange, category, setCategory, orderBy, setOrderBy}
    }>
      <SelectBox
        arr={['거리순', '인기순']}
        hidden={isSelectHidden}
        onClickHiddenHandler={onClickHiddenHandler}
      />
      <ListHeader
        range={range}
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
            <HFlex gap='4px'>
              <FilterBtn
                onClick={onClickHiddenHandler}
              >
                {orderBy}
              </FilterBtn>
              <ListCategoryButtonBar />
            </HFlex>
          </div>

          <HomeShopListContainer>
            {
              (shopList?.length === 0) && <NoShop />
            }
            {
              shopList?.sort((a: any, b: any) => (orderBy === '인기순') ? (b.feedCount - a.feedCount) : (a.distance - b.distance))
              .filter((item: ListTossedData) => category !== "" ? item?.category === category : item).map((item: ListTossedData) => {
                return(
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
                )})
            }
          </HomeShopListContainer>

        </HomeContainer>
      </HomeWrap>
    </ShopCategory.Provider>
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
`;

const HomeShopListContainer = styled.div`
  width: 100%;
  margin: 20px 0 120px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const FilterBtn = ({ children, onClick }: { children: React.ReactNode, onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <FilterBtnStyle
      onClick={onClick}
    >
      <div>
        <Body3>{children}</Body3>
        <IconSmallDownArrow />
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