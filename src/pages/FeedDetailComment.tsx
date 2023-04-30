import React, { useState } from 'react'
import ListHeader from '../components/home/ListHeader'
import DefaultWrap from '../components/ui/container/Wrap'
import { CommentIdContext, HiddenContext, OrderByContext } from '../apis/context'
import useOnClickHiddenHandler from '../custom/jh/useOnClickHiddenHandler'
import FeeaDetailComments from '../components/feed/FeeaDetailCommentComp'
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
import Loading from '../components/Loading'

function FeedDetailComment() {
  const navi = useNavigate();
  const feedId = Number(useParams().feedId);
  const [inputValue, setInputValue] = useState<string>('');
  const [commentId, setCommentId] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>('');
  const { isSelectHidden, setIsSelectHidden } = useOnClickHiddenHandler(true);

  //data
  const {
    feedDetailCommentData,
    feedDetailCommentIsLoading,
    feedDetailCommentIsError,
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
      const result = window.confirm('로그인 하시겠습니까?');
      if(result) {navi(path.login)};
    }

    if(inputValue !== ''){
      //댓글 데이터 전송
      postFeedDetailComment({feedId: feedId, feedComment: inputValue})
      .then((res) => {
        alert('댓글이 추가되었습니다.');
        setInputValue('');
      });
    } else {
      alert('댓글을 입력해주세요.');
    }

    if(inputValue.length > 600) {
      alert('600자 이하로 입력해주세요.');
    }
  };

  if(feedDetailCommentIsLoading) return <Loading/>;

  return (
    <HiddenContext.Provider value={{isSelectHidden, setIsSelectHidden}}>
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
          padding='8px 8px 8px 16px'
          border={`1px solid ${colorSet.lineMedium}`}
          radius='8px'
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
          <div
            style={{width: '40px', height: '40px', cursor: 'pointer'}}
            onClick={() => addFeedDetailComment(feedId)}
          >
            {(inputValue.length === 0)
            ?
            <IconUploadInactive/>
            :
            <IconUploadActive/>
            }
          </div>
        </TextareaStyle>

        {/* 댓글 */}
        <div style={{margin: '12px 0'}}>
          {
            feedDetailCommentData &&
            <FeeaDetailComments
              commentList={feedDetailCommentData}
            />
          }
        </div>
      </DefaultWrap>
    </OrderByContext.Provider>
    </CommentIdContext.Provider>
    </HiddenContext.Provider>
  )
}

export default FeedDetailComment

const CommentPostBtn = styled.button<{width?: string, height?: string}>`
  width: ${({width}) => width};
  height: ${({height}) => height};
  border: none;
  border-radius: 100px;
`;