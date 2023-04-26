import { useEffect, useState } from 'react'
import useGetFeedList from '../custom/jh/useGetFeedList'
import styled from 'styled-components';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import { Link } from 'react-router-dom';
import { IconPlusWhite24 } from '../components/ui/element/icons/IconsStyle';
import FeedContentsTest from '../components/feed/FeedContentsTest';
import { HFlex, VFlex } from '../custom/ym/styleStore';
import { path } from '../shared/path';
import ListCategoryButtonBar from '../components/home/ListCategoryButtonBar';
import { OrderbyFilterBtn } from '../components/ui/element/filter/FilterBtn';
import SelectBox from '../components/SelectBox';
import { categoryTypes } from '../custom/ym/types';
import useOnClickHiddenHandler from '../custom/jh/useOnClickHiddenHandler';
import { ShopCategory } from '../apis/context';

function FeedList() {
  const {feedList, feedListIsLoading, feedListIsError} = useGetFeedList();
  const [orderBy, setOrderBy] = useState<string>('태그');
  const [range, setRange] = useState(500);
  const [category, setCategory] = useState<categoryTypes>("");
  const { isSelectHidden, setIsSelectHidden } = useOnClickHiddenHandler(true);

  useEffect(() => {
    console.log('피드리스트',feedList);
  }, [feedList]);

  if(feedListIsLoading) { return <div>로딩중</div> };

  return (
    <ShopCategory.Provider value={
      {range, setRange, category, setCategory, orderBy, setOrderBy, isSelectHidden, setIsSelectHidden}
    }>
      <SelectBox
        arr={['분위기 맛집', '디저트 맛집', '커피 맛집', '뷰 맛집']}
      />
      <FeedContainer>
        <MarginBothSides20>
          <Heading2>Feed</Heading2>
        </MarginBothSides20>
        {/* 필터버튼 */}
        <div style={{ overflow: 'hidden', marginLeft: `20px`}}>
          <HFlex gap='4px'>
            <OrderbyFilterBtn
            >
              {orderBy}
            </OrderbyFilterBtn>
            <ListCategoryButtonBar />
          </HFlex>
        </div>
        { feedList?.map((item: any, index: number) => {
          console.log('item',item);
          return (
            <div key={`Feed${item.shopId + index}`}>
              <VFlex gap='12px' etc='padding:20px;'>
                <FeedContentsTest
                  feedData={item}
                />
              </VFlex>
              {(index >=0 && index < feedList.length-1) && <FeedPageHr/>}
            </div>
          )
        })}
        <Link to={`${path.feedForm}`}>
          <FeedPageWriteBtn>
            <AlignItemCenter>
              <IconPlusWhite24/>
              <label>피드 작성</label>
            </AlignItemCenter>
          </FeedPageWriteBtn>
        </Link>
      </FeedContainer>
    </ShopCategory.Provider>
  )
};

export default FeedList

const Heading2 = styled.div`
  ${fontType.heading_2}
  color: ${colorSet.textStrong};
`;

const FeedContainer = styled.div`
  margin: 40px 0 120px 0;
  position: relative;
`;

const MarginBothSides20 = styled.div`
  margin: 0 20px;
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
  color: white;
  background-color: #B81B1B;
  ${fontType.title_4}
`;

const FeedPageHr = styled.hr`
  width: 350px;
  height: 1px;
  background-color: ${colorSet.lineLight};
  border: 0;
`;