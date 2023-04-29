import React, { useContext, useEffect } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore'
import styled from 'styled-components'
import { colorSet } from '../ui/styles/color'
import timeForNow from '../../custom/jh/timeForNow'
import { Body5, Title5 } from '../FontStyle'
import { CheckMine } from '../Authentication'
import { IconEtc24 } from '../ui/element/icons/IconsStyle'
import { fontType } from '../ui/styles/typo'
import { displayHandler } from '../../custom/jh/useOnClickHiddenHandler'
import { CommentIdContext, HiddenContext } from '../../apis/context'

export interface IFeeaCommentList {
  nickname: string,
  profilePic : string,
  feedCommentId: number,
  feedComment : string,
  createdAt : Date,
  isMine : boolean,
}

function FeeaDetailCommentEl({commentList}: {commentList: IFeeaCommentList[]}) {
  const { setIsSelectHidden } = useContext(HiddenContext);
  const {commentId, setCommentId} = useContext(CommentIdContext);
  
  const onClickHandler = (commentId: number) => {
    if(setCommentId) {
      setCommentId(commentId);
    }
    if(setIsSelectHidden) {
      setIsSelectHidden(prev => !prev);
    }
  }

  useEffect(() => {
    console.log('렌더링')
  }, [commentId]);

  return (
    <VFlex gap={'20px'} etc={'margin-bottom: 120px'}>
      {commentList?.filter((item: any) => item.commentId !== commentId)
      .map((item: any) => {
        return(
          <Column key={item.feedCommentId}>
            {/* 프로필, 작성 타이밍, 버튼 */}
            <SpaceBetween>
              <Row gap={4} alignCenter={true}>
                <ProfileImg
                  width={40}
                  height={40}
                >
                  <img
                    id={`feed-img-${item.feedCommentId}`}
                    src={`${item.profilePic}`}
                    alt="프로필 이미지"
                    onError={(e) => displayHandler(`feed-img-${item.feedCommentId}`)}
                  />
                </ProfileImg>
                <Column>
                  <Title5>{item.nickname}</Title5>
                  <Body5 color={colorSet.textMedium}>{timeForNow(item.createdAt)}</Body5>
                </Column>
              </Row>
              {/* 수정, 삭제 버튼 */}
              <CheckMine isMine={item.isMine}>
                {setIsSelectHidden 
                  &&
                  <div onClick={(e) => onClickHandler(item.feedCommentId)}>
                    <IconEtc24/>
                  </div>
                }
              </CheckMine>
            </SpaceBetween>

            {/* 댓글 내용 */}
            <div style={{paddingLeft: '44px'}}>
              <CommentPre>
                {item.feedComment}
              </CommentPre>
            </div>
          </Column>
        )})
      }
    </VFlex>
  )
}

export default FeeaDetailCommentEl

const Row = styled.div<{gap?: number, alignCenter?: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: ${({alignCenter}) => alignCenter && 'center'};
  gap: ${({gap}) => gap}px;
`;

const Column = styled.div<{gap?: number, jtCenter?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: ${({jtCenter}) => jtCenter && 'center'};
  gap: ${({gap}) => gap}px;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
` ;

const FloatRight = styled.div`
  float: right;
`;

const CommentPre = styled.div`
  ${fontType.body_3}
`;

const ProfileImg = styled.div<{width?: number, height?: number, radius?: number}>`
  width: ${({width}) => width ? width+'px' : '100%'};
  height: ${({height}) => height ? height+'px' : '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colorSet.lineMedium};
  background-color: ${colorSet.lineLight};
  border-radius: ${({radius}) => radius ? radius+'px' : '12px'};
  overflow: hidden;

  img {
    min-height: ${({height}) => height ? height+'px' : '100%'};
    min-width: ${({width}) => width ? width+'px' : '100%'};
  }
`;