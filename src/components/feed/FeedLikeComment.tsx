import styled from "styled-components";
import { IconComment24, IconLikeActive24, IconLikeInactive24 } from "../ui/element/icons/IconsStyle";
import { useNavigate } from "react-router-dom";
import { path } from "../../shared/path";
import { fontType } from "../ui/styles/typo";
import usePutLike from "../../custom/jh/usePutLike";
import { useEffect, useState } from "react";
import { getToken } from "../../apis/getToken";
import BtnResetStyle from "../ui/element/buttons/BtnReset";

interface IFeedLikeComment {
  isLike: boolean,
  likeCount: number,
  feedCommentCount: number,
  feedId: number,
};

function FeedLikeComment({feedId, isLike, likeCount, feedCommentCount}: IFeedLikeComment) {
  const token = getToken();
  const navi = useNavigate();
  const [likeResult, setLikeResult] = useState(isLike);
  const [likeCountResult, setLikeCountResult] = useState(likeCount);
  const {changeLike} = usePutLike({feedId, setLikeResult});

  const onClickLike = () => {
    if (token) {
      changeLike(); //서버 전송
      setLikeResult(prev => !prev);
    } else {
      alert('로그인 후 이용 가능합니다.');
    }
  }

  return (
    <FeedLikeCommentStyle>
      {/* 좋아요 */}
      <BtnResetStyle
        onClick={onClickLike}
      >
        <AlignCenter gap={5}>
          {likeResult
            ?
            <IconLikeActive24 />
            :
            <IconLikeInactive24 />
          }
          <label>{likeResult ? likeCountResult + 1 : likeCountResult}</label>
        </AlignCenter>
      </BtnResetStyle>

      {/* 댓글 */}
      <BtnResetStyle
        onClick={() => navi(`${path.toFeedComment}/${feedId}`)}
      >
        <AlignCenter gap={5}>
          <IconComment24 />
          <label>{feedCommentCount}</label>
        </AlignCenter>
      </BtnResetStyle>
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

const AlignCenter = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap}px;
`;