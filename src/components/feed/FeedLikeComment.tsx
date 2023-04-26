import styled from "styled-components";
import { IconComment24, IconLikeActive24, IconLikeInactive24 } from "../ui/element/icons/IconsStyle";
import { Link } from "react-router-dom";
import { path } from "../../shared/path";
import { fontType } from "../ui/styles/typo";
import { HFlex } from "../../custom/ym/styleStore";

interface IFeedLikeComment {
  isLike: boolean,
  likeCount: number,
  feedCommentCount: number,
  feedId: number,
};

function FeedLikeComment({feedId, isLike, likeCount, feedCommentCount}: IFeedLikeComment) {
  return (
    <FeedLikeCommentStyle>
      <AlignCenter gap={5}>
        {isLike 
          ?
          <IconLikeActive24/>
          :
          <IconLikeInactive24/>
        }
        <label>{likeCount}</label>
      </AlignCenter>

      <Link to={`${path.toFeedComment}/${feedId}`}>
        <AlignCenter gap={5}>
          <IconComment24/>
          <label>{feedCommentCount}</label>
        </AlignCenter>
      </Link>
    </FeedLikeCommentStyle>
  )
}

export default FeedLikeComment

const FeedLikeCommentStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  margin: 5px 0;
  ${fontType.body_3}
`;

const AlignCenter = styled.div<{gap: number}>`
  display: flex;
  align-items: center;
  gap: ${({gap}) => gap}px;
`;