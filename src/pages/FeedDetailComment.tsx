import React from 'react'
import ListHeader from '../components/home/ListHeader'
import { VFlex } from '../custom/ym/styleStore'
import DefaultWrap from '../components/ui/container/Wrap'
import FeeaDetailCommentContainer from '../components/feed/FeeaDetailCommentComp'

function FeedDetailComment() {
  return (
    <>
      <ListHeader
        name={'댓글'}
      />
      <DefaultWrap>

        FeedDetailComment
        <FeeaDetailCommentContainer
          commentList={feeaCommentList}
        />
      </DefaultWrap>
    </>
  )
}

export default FeedDetailComment

const CommentContainer = () => {
  return(
    <>
      
    </>
  )
}

const feeaCommentList = [
  {
    nickname: "닉네임",
    profilePic : "http://k.kakaocdn.net/dn/cH6yYW/btrG6XUCyTC/kJq7lZ1JIjKUPBSqbgaB60/img_640x640.jpg",
    feedCommentId: 1,
    feedComment : "댓글",
    createdAt : "2013.01.01",
    isMine : true,
  },
  {
    nickname: "닉네임",
    profilePic : "http://k.kakaocdn.net/dn/cH6yYW/btrG6XUCyTC/kJq7lZ1JIjKUPBSqbgaB60/img_640x640.jpg",
    feedCommentId: 1,
    feedComment : "댓글",
    createdAt : "2013.01.01",
    isMine : true,
  },
]