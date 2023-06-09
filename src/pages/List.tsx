import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getUserLocation } from '../custom/jh/getUserLocation';
import { useGetHomeShopList } from '../custom/jh/useGetHomeShopList';
import HomeShopPostCard from '../components/home/HomePostCard';
import ListCount from '../components/ListCount';
import { HomeTabMenuStyle, TabMenuLi, TabMenuUl } from '../components/TabMenu';
import SelectBox, { SelectBoxId } from '../components/SelectBox';
import ListHeader from '../components/home/ListHeader';
import {ListCategoryButtonBar, PAGE_NAME, RangeFilterButtonBar} from '../components/home/ListCategoryButtonBar';
import { ListTossedData, categoryTypes, orderByTypes } from '../custom/ym/types';
import { HFlex } from '../custom/ym/styleStore';
import { OrderByContext, ShopCategory } from '../apis/context';
import { OrderbyFilterBtn } from '../components/ui/element/filter/FilterBtn';
import NoResult from '../components/home/NoShop';
import { SelectData } from '../shared/select';
import { Title4 } from '../components/FontStyle';
import { VFlex } from '../custom/ym/styleStore';
import Loading from '../components/loading/Loading';
import LOCALSTORAGE_KEY from '../shared/locatstorageKey';

const List = () => {
  const currentLng = Number(localStorage.getItem(LOCALSTORAGE_KEY.LNG));
  const currentLat = Number(localStorage.getItem(LOCALSTORAGE_KEY.LAT));
  const currentRange = Number(localStorage.getItem(LOCALSTORAGE_KEY.RANGE));
  const currentOrderBy = localStorage.getItem(LOCALSTORAGE_KEY.shop.ORDER_BY);
  const currentCategory = localStorage.getItem(LOCALSTORAGE_KEY.shop.CATEGORY) ? localStorage.getItem(LOCALSTORAGE_KEY.shop.CATEGORY) : '';

  const [lng, setLng] = useState(127.0468975);
  const [lat, setLat] = useState(37.5108407);
  const [orderBy, setOrderBy] = useState<string>('거리순');
  const [range, setRange] = useState(300);
  const [category, setCategory] = useState<categoryTypes>("");

  //리스트 데이터
  const {
    shopList,
    getshopList,
    getshopListIsLoading,
  } = useGetHomeShopList({ lng, lat, range });

  useEffect(() => {
    if(currentLat && currentLng){
      setLng(currentLng);
      setLat(currentLat);
    } else {
      getUserLocation(setLng, setLat);
    }

    if(currentRange){
      setRange(currentRange);
    }
    if(currentOrderBy && currentOrderBy as orderByTypes){
      setOrderBy(currentOrderBy);
    }
    if(currentCategory && currentCategory as categoryTypes){
      setCategory(currentCategory as categoryTypes);
    }
  }, []);

  useEffect(() => {
    if (lng !== 0 && lat !== 0) {
      getshopList();
    };
  }, [lat, range]);

  //로딩 화면
  if (getshopListIsLoading) { return <Loading/>; }

  return (
    <ShopCategory.Provider value={
      {range, setRange, category, setCategory}
    }>
    <OrderByContext.Provider value={{orderBy, setOrderBy}}>
      {/* 선택창 */}
      <SelectBox
        id={SelectBoxId.ORDER_BY_SELECT_ID}
        arr={SelectData.ORDER_BY}
      />
      <SelectBox
        id={SelectBoxId.RANGE_SELECT_ID}
      >
        <div style={{padding: '20px 20px 60px 20px'}}>
          <VFlex gap={'12px'}>
            <Title4>반경</Title4>
            <RangeFilterButtonBar/>
          </VFlex>
        </div>
      </SelectBox>

      {/* 헤더 */}
      <ListHeader
        list={true}
        range={range}
      />
      {/* 컨테이너 */}
      <HomeWrap>
        <HomeContainer>
          <nav>
            <HomeTabMenuStyle>
              <TabMenuUl>
                <TabMenuLi id={1} isChecked={true}>
                  <div style={{display: 'flex', gap: '4px'}}>
                    내 주변
                    <ListCount>{shopList?.length}</ListCount>
                  </div>
                </TabMenuLi>
                {/* <TabMenuLi id={2}>
                  추천식당
                </TabMenuLi> */}
              </TabMenuUl>
            </HomeTabMenuStyle>
          </nav>

          {/* 필터버튼 */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <HFlex gap='4px'>
              <OrderbyFilterBtn/>
              <ListCategoryButtonBar pageName={PAGE_NAME.SHOP_LIST}/>
            </HFlex>
          </div>

          <HomeShopListContainer>
            {shopList?.sort((a: any, b: any) => {
              if(orderBy === '피드순') return (b.feedCount - a.feedCount);  //내림차순
              if(orderBy === '인기순') return (b.scrapCount - a.scrapCount);//내림차순
              return (a.distance - b.distance); //거리순 올림차순
              })
              .filter((item: ListTossedData) => {
                let result = null;
                if(item?.distance <= range){result = item}
                return(category !== "" ? (item?.category === category) : result);
              }).length === 0
              ? 
              <NoResult shopList={true} />
              :
              shopList?.sort((a: any, b: any) => {
                if(orderBy === '피드순') return (b.feedCount - a.feedCount);  //내림차순
                if(orderBy === '인기순') return (b.scrapCount - a.scrapCount);//내림차순
                return (a.distance - b.distance); //거리순 올림차순
              })
              .filter((item: ListTossedData) => {
                let result = null;
                if(item.distance <= range){result = item}
                return(
                  category !== "" ? (item?.category === category) : result
              )})
              .map((item: ListTossedData) => {
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
    </OrderByContext.Provider>
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