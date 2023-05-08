import React, { useEffect, useState } from 'react'
import ListHeader from '../components/home/ListHeader'
import DefaultWrap from '../components/ui/container/Wrap'
import { CommentIdContext, OrderByContext } from '../apis/context'
import FeedDetailComments from '../components/feed/FeedDetailCommentComp'
import SelectBox, { SelectBoxId } from '../components/SelectBox'
import { TextareaStyle } from '../components/search/SearchInput'
import { colorSet } from '../components/ui/styles/color'
import { useNavigate, useParams } from 'react-router-dom'
import { SelectData } from '../shared/select'
import postFeedDetailComment from '../custom/jh/postFeedDetailComment'
import { getToken } from '../apis/getToken'
import { path } from '../shared/path'
import useGetFeedDetailComment from '../custom/jh/useGetFeedDetailComment'
import styled from 'styled-components'
import { IconUploadActive, IconUploadInactive } from '../components/ui/element/icons/IconsStyle'
import Loading from '../components/loading/Loading'
import { Body3 } from '../components/FontStyle'
import BtnResetStyle from '../components/ui/element/buttons/BtnReset'
import IconSize from '../components/ui/element/icons/IconSize'
import { confirmLogin } from '../custom/jh/confirm'
import { scrollTop } from '../custom/jh/scrollEvent'

function FeedDetailComment() {
  const navi = useNavigate();
  const feedId = Number(useParams().feedId);
  const [inputValue, setInputValue] = useState<string>('');
  const [commentId, setCommentId] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>('');

  //data
  const {
    feedDetailCommentData,
    feedDetailCommentIsLoading,
  } = useGetFeedDetailComment(feedId);

  const onChangeTextareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if(e.target.scrollHeight > 30){
      e.target.rows = 2;
    } else {
      e.target.rows = 1;
    }
  }

  const addFeedDetailComment = (feedId: number) => {
    if(!getToken()) {
      if(confirmLogin()) {navi(path.login)};
    }

    if(inputValue !== ''){
      //댓글 데이터 전송
      postFeedDetailComment({feedId: feedId, feedComment: inputValue.trim()});
      alert('댓글이 추가되었습니다.');
      setInputValue('');
    } else {
      alert('댓글을 입력해주세요.');
    }

    if(inputValue.length > 600) {
      alert('600자 이하로 입력해주세요.');
    }
  };

  useEffect(() => {
    scrollTop();
  }, []);

  if(feedDetailCommentIsLoading) return <Loading/>;

  return (
    <CommentIdContext.Provider value={{commentId, setCommentId}}>
    <OrderByContext.Provider value={{orderBy, setOrderBy}}>
      {/* 선택창 */}
      <SelectBox
        id={SelectBoxId.MODIFY_SELECT_ID}
        isDeleteComment={true}
        param={feedId}
        arr={SelectData.MODIFY_DELETE_SELECT}
      />

      {/* 헤더 */}
      <ListHeader
        name={'댓글'}
      />

      <DefaultWrap>
        {/* 입력창 */}
        <TextareaStyle
          padding={'8px 8px 8px 16px'}
          border={`1px solid ${colorSet.lineMedium}`}
          radius={'8px'}
        >
          <textarea
            maxLength={600}
            rows={1}
            value={inputValue}
            onChange={onChangeTextareaHandler}
            placeholder='댓글 입력하기'
            required
          />

          {/* 댓글 추가 버튼 */}
          <IconSize.Size40>
            {(inputValue.trim().length === 0)
            ?
            <IconUploadInactive/>
            :
            <BtnResetStyle
              onClick={() => addFeedDetailComment(feedId)}
            >
              <IconUploadActive/>
            </BtnResetStyle>
            }</IconSize.Size40>
        </TextareaStyle>

        {/* 댓글 */}
        <div style={{margin: '12px 0'}}>
          {
            feedDetailCommentData?.length === 0 
            ?
            <div>
              <Body3>댓글이 없습니다.</Body3>
            </div>
            :
            <FeedDetailComments
              commentList={feedDetailCommentData}
            />
          }
        </div>
      </DefaultWrap>
    </OrderByContext.Provider>
    </CommentIdContext.Provider>
  )
}

export default FeedDetailComment