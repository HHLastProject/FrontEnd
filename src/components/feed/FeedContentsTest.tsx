import { useState } from 'react'
import { VFlex } from '../../custom/ym/styleStore';
import FeedProfile from '../FeedProfile';
import FeedPicture from './FeedPicture';
import FeedComment from './FeedComment';
import styled from 'styled-components';
import { PRIMARY_01, TITLE_5 } from '../../custom/ym/variables';
import TagList from './TagList';
import PlaceCard from './PlaceCard';
import { defaultImgPath, path } from '../../shared/path';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface FeedCardData {
  shopThumbnail: string,
  shopName: string,
  shopAddress: string,
  isScrap: boolean,
  shopId: number,
  feedId: number,
  feedPic: string,
  comment: string | null,
  profilePic: string | null,
  nickname: string,
  createdAt: string,
  tag: [] | string[],
}

const FeedContentsTest = ({ feedData }: { feedData: FeedCardData }) => {
  const [expand, setExpand] = useState<boolean>(false);

  const expandButtonHandler = () => {
    setExpand(prev => !prev);
  };

  const placeCardData = {
    shopThumbnail: `${feedData?.shopThumbnail}`,
    shopName: `${feedData?.shopName}`,
    shopAddress: `${feedData?.shopAddress}`,
    isScrap: feedData?.isScrap,
    shopId: feedData?.shopId,
  };

  return (
    <>
        {feedData?.profilePic 
          ? 
          <FeedProfile 
            profilePic={feedData?.profilePic}
            nickname={feedData?.nickname}
            createdAt={moment(feedData?.createdAt).format("YYYY.MM.DD")}
          />
          :
          <FeedProfile
            profilePic={defaultImgPath.shopList}
            nickname={feedData?.nickname}
            createdAt={moment(feedData?.createdAt).format("YYYY.MM.DD")}
          />
        }
        <Link to={`${path.toFeedDetail + '/' + feedData?.feedId}`}>
          <FeedPicture>{process.env.REACT_APP_SERVER_URL + '/uploads/' + feedData?.feedPic}</FeedPicture>
          <FeedComment isExpanded={expand}>{feedData?.comment as string}</FeedComment>
        </Link>
        {feedData?.comment && (feedData?.comment?.length > 86)
          ? 
          <ExpandButton onClick={expandButtonHandler}>
            <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
          </ExpandButton>
          : null
        }
        <TagList>{feedData?.tag}</TagList>
        <Link to={`${path.toShopDetail + '/' + feedData?.shopId}`}>
          <PlaceCard
            dataset={placeCardData}
          />
        </Link>
    </>
  )
}

export default FeedContentsTest;

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