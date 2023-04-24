import { useEffect } from 'react'
import useGetFeedList from '../custom/jh/useGetFeedList'
import styled from 'styled-components';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import { Link } from 'react-router-dom';
import { IconPlusWhite24 } from '../components/ui/element/icons/IconsStyle';
import FeedContentsTest from '../components/feed/FeedContentsTest';
import { VFlex } from '../custom/ym/styleStore';

function FeedList() {
  const {feedList, feedListIsLoading, feedListIsError} = useGetFeedList();

  useEffect(() => {
    console.log('피드리스트',feedList);
  }, [feedList]);

  if(feedListIsLoading) { return <div>로딩중</div> };

  return (
    <FeedContainer>
      <MarginBothSides20>
        <Heading2>Feed</Heading2>
      </MarginBothSides20>
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
      <Link to={`/shop/${0}/feedform`}>
        <FeedPageWriteBtn>
          <AlignItemCenter>
            <IconPlusWhite24/>
            <label>피드 작성</label>
          </AlignItemCenter>
        </FeedPageWriteBtn>
      </Link>
    </FeedContainer>
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