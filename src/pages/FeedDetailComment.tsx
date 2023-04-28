import React from 'react'
import ListHeader from '../components/home/ListHeader'
import DefaultWrap from '../components/ui/container/Wrap'
import { HiddenContext } from '../apis/context'
import useOnClickHiddenHandler from '../custom/jh/useOnClickHiddenHandler'
import { IFeeaCommentList } from '../components/feed/FeeaDetailCommentComp'
import FeeaDetailCommentEl from '../components/feed/FeeaDetailCommentComp'
import SelectBox from '../components/SelectBox'
import { TextareaStyle } from '../components/search/SearchInput'
import { colorSet } from '../components/ui/styles/color'
import { useParams } from 'react-router-dom'

export const usePostFeedDetailComment = (feedId: number) => {
  
}

function FeedDetailComment() {
  const { isSelectHidden, setIsSelectHidden } = useOnClickHiddenHandler(true);
  const feedId = Number(useParams());
  const postFeedDetailComment = (feedId: number) => {

  }

  return (
    <HiddenContext.Provider value={{isSelectHidden, setIsSelectHidden}}>
      <SelectBox
        arr={['수정하기', '삭제하기']}
      />

      {/* 헤더 */}
      <ListHeader
        name={'댓글'}
      />

      <DefaultWrap>
        {/* 입력창 */}
        <TextareaStyle
          padding='8px'
          border={`1px solid ${colorSet.lineMedium}`}
          radius='8px'
        >
          <textarea
            maxLength={600}
            rows={2}
            required
          />
          <button
            onClick={() => postFeedDetailComment(feedId)}
          >
            추가
          </button>
        </TextareaStyle>

        {/* 댓글 */}
        <FeeaDetailCommentEl
          commentList={feeaCommentList}
        />
      </DefaultWrap>
    </HiddenContext.Provider>
  )
}

export default FeedDetailComment

const feeaCommentList: IFeeaCommentList[] = [
  {
    nickname: "닉네임",
    profilePic : "http://k.kakaocdn.net/dn/OXdMT/btrOQtAfax7/rCBxWIIUF6cd5y9IphkJtk/img_640x640.jpg",
    feedCommentId: 1,
    feedComment : "댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글",
    createdAt : new Date(),
    isMine : true,
  },
  {
    nickname: "닉네임",
    profilePic : "http://k.kakaocdn.net/dn/OXdMT/btrOQtAfax7/rCBxWIIUF6cd5y9IphkJtk/img_640x640.jpg",
    feedCommentId: 2,
    feedComment : "댓글",
    createdAt : new Date(2023, 3, 27, 16),
    isMine : false,
  },
]