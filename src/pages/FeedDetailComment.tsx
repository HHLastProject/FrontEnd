import React from 'react'
import ListHeader from '../components/home/ListHeader'
import DefaultWrap from '../components/ui/container/Wrap'
import FeeaDetailCommentContainer, { IFeeaCommentList } from '../components/feed/FeeaDetailCommentComp'

function FeedDetailComment() {
  return (
    <>
      <ListHeader
        name={'댓글'}
      />

      <DefaultWrap>
        <FeeaDetailCommentContainer
          commentList={feeaCommentList}
        />
      </DefaultWrap>
    </>
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