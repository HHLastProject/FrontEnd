import React from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore'
import styled from 'styled-components'
import { colorSet } from '../ui/styles/color'

export interface IFeeaCommentList {
  nickname: string,
  profilePic : string,
  feedCommentId: number,
  feedComment : string,
  createdAt : string | Date,
  isMine : boolean,
}

function FeeaDetailCommentContainer({commentList}: {commentList: IFeeaCommentList[]}) {
  return (
    <VFlex gap={'20px'} etc={'margin-bottom: 120px'}>
      {
        commentList?.map((item: any) => {
          return(
            <>
              <ProfileImg>
                <img src={`${item.profilePic}`} alt="프로필 이미지" />
              </ProfileImg>

              {item.nickname}
              {item.feedCommentId}
              {item.feedComment}
              {item.createdAt}
              {item.isMine}
            </>
        )})
      }
    </VFlex>
  )
}

export default FeeaDetailCommentContainer

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colorSet.lineMedium};
  background-color: ${colorSet.lineLight};
  border-radius: 12px;
  overflow: hidden;
`;