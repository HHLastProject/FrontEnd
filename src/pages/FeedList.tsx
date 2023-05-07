import { useEffect, useState } from 'react'
import useGetFeedList from '../custom/jh/useGetFeedList'
import styled from 'styled-components';
import { colorSet } from '../components/ui/styles/color';
import { Link } from 'react-router-dom';
import { IconPlusWhite24 } from '../components/ui/element/icons/IconsStyle';
import FeedContentsTest from '../components/feed/FeedContentsTest';
import { HFlex, VFlex } from '../custom/ym/styleStore';
import { path } from '../shared/path';
import {ListCategoryButtonBar, PAGE_NAME} from '../components/home/ListCategoryButtonBar';
import { OrderbyFilterBtn } from '../components/ui/element/filter/FilterBtn';
import SelectBox, { SelectBoxId } from '../components/SelectBox';
import { TossedFeedData, categoryTypes } from '../custom/ym/types';
import { OrderByContext, ShopCategory } from '../apis/context';
import { Heading1, Title4 } from '../components/FontStyle';
import { SelectData } from '../shared/select';
import Loading from '../components/loading/Loading';
import LOCALSTORAGE_KEY from '../shared/locatstorageKey';

function FeedList() {
  const currentOrderBy = localStorage.getItem(LOCALSTORAGE_KEY.feed.ORDER_BY);
  const currentCategory = localStorage.getItem(LOCALSTORAGE_KEY.feed.CATEGORY) ? localStorage.getItem(LOCALSTORAGE_KEY.shop.CATEGORY) : '';

  const {feedList, feedListIsLoading, feedListIsError} = useGetFeedList();
  const [orderBy, setOrderBy] = useState<string>('태그');
  const [range, setRange] = useState(500);
  const [category, setCategory] = useState<categoryTypes>("");
  
  useEffect(() => {
    if(currentOrderBy) { setOrderBy(currentOrderBy); }
    if(currentCategory as categoryTypes) { 
      setCategory(currentCategory as categoryTypes);
    }
  }, []);

  if(feedListIsLoading) { return <Loading/> };
  if(feedListIsError) { alert('에러가 발생했습니다.') };

  return (
    <ShopCategory.Provider value={
      {range, setRange, category, setCategory}
    }>
    <OrderByContext.Provider value={{orderBy, setOrderBy}}>
      {/* 태그 선택창 */}
      <SelectBox
        id={SelectBoxId.ORDER_BY_SELECT_ID}
        arr={SelectData.TAG_SELECT}
      />

      <FeedContainer>
        {/* 제목 */}
        <div style={{margin: '10px 20px'}}>
          <Heading1>Feed</Heading1>
        </div>

        {/* 필터버튼 */}
        <div style={{ overflow: 'hidden', marginLeft: `20px`}}>
          <HFlex gap='4px' etc={'margin-top: 8px'}>
            <OrderbyFilterBtn/>
            <ListCategoryButtonBar pageName={PAGE_NAME.FEED_LIST}/>
          </HFlex>
        </div>

        {/* FEED 리스트 */}
        <div style={{marginBottom: '120px'}}>
        { feedList?.length === 0 
          ? 
          <></> 
          :
          feedList?.filter((item: TossedFeedData | null) => {
            if(orderBy !== "태그") return item?.tag.includes(orderBy);
            return item;
          })
          .filter((item: TossedFeedData | null) => (category !== "") ? item?.shopCategory === category : item)
          .map((item: any, index: number) => {
            if(item === null || feedList?.length === 0) {
              return <></>;
            } else {
            return (
              <div key={item.feedId}>
                <VFlex gap='12px' etc='padding:20px;'>
                  <FeedContentsTest
                    page={'feedList'}
                    feedData={item}
                  />
                </VFlex>
                {(index >=0 && index < feedList.length-1) && <FeedPageHr/>}
              </div>
            )}
          })
        }
        </div>
      </FeedContainer>

      {/* 피드 작성 버튼 */}
      <Link to={`${path.feedForm}`}>
        <FeedPageWriteBtn>
          <AlignItemCenter>
            <IconPlusWhite24/>
            <Title4 color='white'>피드 작성</Title4>
          </AlignItemCenter>
        </FeedPageWriteBtn>
      </Link>
    </OrderByContext.Provider>
    </ShopCategory.Provider>
  )
};

export default FeedList

const FeedContainer = styled.div`
  min-height: 100vh;
  margin: 0 0 120px 0;
  position: relative;
`;

const AlignItemCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FeedPageWriteBtn = styled.button`
  position: sticky;
  float: right;
  bottom: 20px;
  right: 20px;

  border: none;
  padding: 14px 24px;
  border-radius: 100px;
  background-color: ${colorSet.primary_02};
`;

const FeedPageHr = styled.hr`
  width: 350px;
  height: 1px;
  background-color: ${colorSet.lineLight};
  border: 0;
`;