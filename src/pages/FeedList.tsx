import { useEffect, useState } from 'react'
import useGetFeedList from '../custom/jh/useGetFeedList'
import styled from 'styled-components';
import { colorSet } from '../components/ui/styles/color';
import { Link } from 'react-router-dom';
import { IconPlusWhite24 } from '../components/ui/element/icons/IconsStyle';
import FeedContentsTest from '../components/feed/FeedContentsTest';
import { HFlex, VFlex } from '../custom/ym/styleStore';
import { path } from '../shared/path';
import ListCategoryButtonBar from '../components/home/ListCategoryButtonBar';
import { OrderbyFilterBtn } from '../components/ui/element/filter/FilterBtn';
import SelectBox from '../components/SelectBox';
import { TossedFeedData, categoryTypes } from '../custom/ym/types';
import useOnClickHiddenHandler from '../custom/jh/useOnClickHiddenHandler';
import { HiddenContext, ShopCategory } from '../apis/context';
import { Heading2, Title4 } from '../components/FontStyle';

function FeedList() {
  const {feedList, feedListIsLoading, feedListIsError} = useGetFeedList();
  const [orderBy, setOrderBy] = useState<string>('태그');
  const [range, setRange] = useState(500);
  const [category, setCategory] = useState<categoryTypes>("");
  const { isSelectHidden, setIsSelectHidden } = useOnClickHiddenHandler(true);

  useEffect(() => {
    
  }, [feedList]);

  if(feedListIsLoading) { return <div>로딩중</div> };

  return (
    <ShopCategory.Provider value={
      {range, setRange, category, setCategory, orderBy, setOrderBy}
    }>
    <HiddenContext.Provider value={{isSelectHidden, setIsSelectHidden}}>
      <SelectBox
        arr={['분위기 맛집', '디저트 맛집', '커피 맛집', '뷰 맛집']}
      />
      <FeedContainer>
        {/* 제목 */}
        <div style={{margin: '0 20px'}}>
          <Heading2>Feed</Heading2>
        </div>

        {/* 필터버튼 */}
        <div style={{ overflow: 'hidden', marginLeft: `20px`}}>
          <HFlex gap='4px' etc={'margin-top: 15px'}>
            <OrderbyFilterBtn
            >
              {orderBy}
            </OrderbyFilterBtn>
            <ListCategoryButtonBar />
          </HFlex>
        </div>

        {/* FEED 리스트 */}
        <div style={{marginBottom: '120px'}}>
        { feedList?.filter((item: TossedFeedData) => orderBy !== "태그" ? item?.tag.includes(orderBy) : item)
          .filter((item: TossedFeedData) => category !== "" ? item?.shopCategory === category : item)
          .map((item: any, index: number) => {
            return (
              <div key={item.feedId}>
                <VFlex gap='12px' etc='padding:20px;'>
                  <FeedContentsTest
                    feedData={item}
                  />
                </VFlex>
                {(index >=0 && index < feedList.length-1) && <FeedPageHr/>}
              </div>
            )
          })
        }
        </div>

        {/* 피드 작성 버튼 */}
      </FeedContainer>
      <Link to={`${path.feedForm}`}>
        <FeedPageWriteBtn>
          <AlignItemCenter>
            <IconPlusWhite24/>
            <Title4 color='white'>피드 작성</Title4>
          </AlignItemCenter>
        </FeedPageWriteBtn>
      </Link>
    </HiddenContext.Provider>
    </ShopCategory.Provider>
  )
};

export default FeedList

const FeedContainer = styled.div`
  min-height: 100vh;
  margin: 40px 0 120px 0;
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
  background-color: #B81B1B;
`;

const FeedPageHr = styled.hr`
  width: 350px;
  height: 1px;
  background-color: ${colorSet.lineLight};
  border: 0;
`;