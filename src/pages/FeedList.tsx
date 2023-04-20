import React, { useEffect, useState } from 'react'
import useGetFeedList from '../custom/jh/useGetFeedList'
import { defaultImgPath, imgPath, path } from '../shared/path';
import styled from 'styled-components';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import { VFlex } from '../custom/ym/styleStore';
import FeedProfile from '../components/FeedProfile';
import FeedPicture from '../components/feed/FeedPicture';
import FeedComment from '../components/feed/FeedComment';
import { PRIMARY_01, TITLE_5 } from '../custom/ym/variables';
import TagList from '../components/feed/TagList';
import PlaceCard from '../components/feed/PlaceCard';
import { Link } from 'react-router-dom';
import moment from 'moment';

function FeedList() {
  const [expand, setExpand] = useState<boolean>(false);
  const {feedList, feedListIsLoading, feedListIsError} = useGetFeedList();

  const expandButtonHandler = () => {
    setExpand(prev => !prev);
  }

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
        console.log('타입', moment(item.createAt).format("YYYY.MM.DD"));
        return (
          <div key={`Feed${item.shopId + index}`}>
            <VFlex gap='12px' etc='padding:20px;'>
              {item.profilePic ? 
                <FeedProfile 
                  profilePic={item.profilePic}
                  nickname={item.nickname}
                  createdAt={moment(item.createAt).format("YYYY.MM.DD")}
                />
                :
                <FeedProfile 
                  profilePic={defaultImgPath.shopList}
                  nickname={item.nickname}
                  createdAt={moment(item.createAt).format("YYYY.MM.DD")}
                />
              }
              <Link to={`${path.toFeedDetail + '/' + item.feedId}`}>
                <FeedPicture>{process.env.REACT_APP_SERVER_URL + '/uploads/' + item.feedPic}</FeedPicture>
                <FeedComment isExpanded={expand}>{item.comment}</FeedComment>
              </Link>
              <ExpandButton onClick={expandButtonHandler}>
                <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
              </ExpandButton>
              <TagList>{item.tags}</TagList>
              <Link to={`${path.toShopDetail + '/' + item.shopId}`}>
                <PlaceCard
                  shopThumbnail={imgPath.shopThumbnailImg + item.shopThumbnail}
                  shopName={item.shopName}
                  shopAddress={item.shopAddress}
                />
              </Link>
            </VFlex>
            {(index >=0 && index < feedList.length-1) && <FeedPageHr/>}
          </div>
        )
      })}
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
`;

const MarginBothSides20 = styled.div`
  margin: 0 20px;
`;

const ExpandButton = styled.button`
    width: fit-content;
    padding: 0px;
    margin: 0px;
    border: none;
    background-color: transparent;
`;
const ExpandText = styled.span`
    font-family: "Pretendard";
    font-size: ${TITLE_5.fontSize};
    font-weight: ${TITLE_5.fontWeight};
    line-height: ${TITLE_5.lineHeight};
    color: ${`#${PRIMARY_01}`};
`;

interface IFeedList {
  nickname: string;
  profilePic : string;
  createdAt : string | Date;
  feedPic : string;
  comment : string | null;
  tags : string[] | null;
  shopId: number;
  shopName : string;
  shopAddress : string;
  shopThumbnail : string;
  isScrap : boolean;
};

const FeedPageHr = styled.hr`
  width: 350px;
  height: 1px;
  background-color: ${colorSet.lineLight};
  border: 0;
`;