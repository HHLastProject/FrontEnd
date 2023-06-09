import { memo, useState } from 'react'
import FeedProfile from '../FeedProfile';
import FeedPicture from './FeedPicture';
import FeedComment from './FeedComment';
import styled from 'styled-components';
import { PRIMARY_01, TITLE_5 } from '../../custom/ym/variables';
import TagList from './TagList';
import PlaceCard from './PlaceCard';
import { defaultImgPath } from '../../shared/path';
import moment from 'moment';
import FeedLikeComment from './FeedLikeComment';

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
  isMine: boolean,
  isLike: boolean, //좋아요
  likeCount: number, //좋아요 개수
  feedCommentCount: number, //댓글 개수
}

const FeedContentsTest = ({ feedData, page }: { feedData: FeedCardData, page: string }) => {
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

  const profilePic = feedData?.profilePic ? feedData?.profilePic : defaultImgPath.shopList;

  return (
    <>
      {/* 피드 프로필 */}
      <FeedProfile
        profilePic={profilePic}
        nickname={feedData?.nickname}
        createdAt={moment(feedData?.createdAt).format("YYYY.MM.DD")}
        isMine={feedData?.isMine}
        params={feedData.feedId}
      />

      {/* 피드 사진 */}
      <FeedPicture>{process.env.REACT_APP_SERVER_URL + '/uploads/' + feedData?.feedPic}</FeedPicture>

      {/* 좋아요 댓글 */}
      <FeedLikeComment
        isLike={feedData?.isLike}
        likeCount={feedData?.likeCount}
        feedCommentCount={feedData?.feedCommentCount}
        feedId={feedData?.feedId}
      />

      {/* 피드 코멘트 */}
      <FeedComment isExpanded={expand}>{feedData?.comment as string}</FeedComment>
      {feedData?.comment && (feedData?.comment?.length > 86)
        ?
        <ExpandButton onClick={expandButtonHandler}>
          <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
        </ExpandButton>
        : null
      }

      {/* 태그 */}
      <TagList>{feedData?.tag}</TagList>

      {/* 해당 매장 정보 */}
      {(page !== 'shopDetailFeed')
        &&
        <PlaceCard
          dataset={placeCardData}
        />
      }
    </>
  )
}

export default memo(FeedContentsTest);

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