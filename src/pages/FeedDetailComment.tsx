import React, { useState } from 'react'
import ListHeader from '../components/home/ListHeader'
import DefaultWrap from '../components/ui/container/Wrap'
import { HiddenContext } from '../apis/context'
import useOnClickHiddenHandler from '../custom/jh/useOnClickHiddenHandler'
import { IFeeaCommentList } from '../components/feed/FeeaDetailCommentComp'
import FeeaDetailCommentEl from '../components/feed/FeeaDetailCommentComp'
import SelectBox from '../components/SelectBox'
import { TextareaStyle } from '../components/search/SearchInput'
import { colorSet } from '../components/ui/styles/color'
import { useNavigate, useParams } from 'react-router-dom'
import { SelectData } from '../shared/select'
import postFeedDetailComment from '../custom/jh/postFeedDetailComment'
import { getToken } from '../apis/getToken'
import { path } from '../shared/path'
import useGetFeedDetailComment from '../custom/jh/useGetFeedDetailComment'

function FeedDetailComment() {
  const navi = useNavigate();
  const feedId = Number(useParams().feedId);
  const [inputValue, setInputValue] = useState<string>('');
  const { isSelectHidden, setIsSelectHidden } = useOnClickHiddenHandler(true);

  //data
  const {
    feedDetailCommentData,
    feedDetailCommentIsLoading,
    feedDetailCommentIsError,
  } = useGetFeedDetailComment(feedId);

  const addFeedDetailComment = (feedId: number) => {
    if(!getToken()) {
      const result = window.confirm('로그인 하시겠습니까?');
      if(result) {navi(path.login)};
    }

    if(inputValue !== ''){
      //댓글 데이터 전송
      postFeedDetailComment({feedId: feedId, feedComment: inputValue})
      .then((res) => alert('댓글이 추가되었습니다.'));
    } else {
      alert('댓글을 입력해주세요.');
    }

    if(inputValue.length > 600) {
      alert('600자 이하로 입력해주세요.');
    }
  };

  return (
    <HiddenContext.Provider value={{isSelectHidden, setIsSelectHidden}}>
      <SelectBox
        arr={SelectData.MODIFY_DELETE_SELECT}
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
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='댓글 입력하기'
            required
          />
          <button
            onClick={() => addFeedDetailComment(feedId)}
          >
            추가
          </button>
        </TextareaStyle>

        {/* 댓글 */}
        <div style={{margin: '12px 0'}}>
          {
            feedDetailCommentData &&
            <FeeaDetailCommentEl
              commentList={feedDetailCommentData}
            />
          }
        </div>
      </DefaultWrap>
    </HiddenContext.Provider>
  )
}

export default FeedDetailComment