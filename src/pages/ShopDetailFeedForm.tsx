import styled from 'styled-components'
import { useState } from 'react';
import { useParams } from 'react-router';
import useNavigateHandler from '../custom/jh/useNavigateHandler';
import useTextCountHandler from '../custom/jh/useTextCountHandler';
import SearchStore from '../components/search/SearchInput';

function ShopDetailFeedForm() {
  const maxLength = 500;
  const {count, textCountHandler} = useTextCountHandler(maxLength);
  const [inputValue, setInputValue] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const {searchClickHandler} = useNavigateHandler();
  const param = useParams().shopId;
  console.log(param);
  return (
    <>
      <form action={`/${param}`}>
        <ShopDetailReviewFormContainer>
          <h2>새로운 기록</h2>
          <div>
            <div>
              <h3>방문한 카페</h3>
              <label>선택</label>
            </div>
            <div
              onClick={searchClickHandler}
            >
              <SearchStore
                inputValue={inputValue}
                setInputValue={setInputValue}
                placeholder='카페 이름 입력하기'
              />
            </div>
          </div>
          <div>
            <div>
              <h3>사진</h3>
              <label>필수</label>
            </div>
            <div
              // onClick={}
            >
              {imgFile && <img src='' alt=''/>}
            </div>
          </div>
          <div>
            <div>
              <h3>코멘트</h3>
              <label>선택</label>
            </div>
            <ShopDetailReviewTextarea
              onChange={textCountHandler}
              maxLength={maxLength}
              placeholder='카페에서의 순간을 작성해 주세요.'
            />
            <div className='text-count'>
              <label>{count}/{maxLength}</label>
            </div>
          </div>

          <button
            className='sticky-btn'
            // onClick={}
          >
            작성 완료
          </button>
        </ShopDetailReviewFormContainer>
      </form>
    </>
  )
}

export default ShopDetailFeedForm

const ShopDetailReviewFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
  .text-count {
    display: flex;
    justify-content: flex-end;
  }
  .sticky-btn {
    position: sticky;
    bottom: 0;
  }
`;

const ShopDetailReviewTextarea = styled.textarea`
  width: 100%;
  height: 220px;
  border: 1px solid #DBDBDB;
  border-radius: 10px;
  resize: none;
  outline: none;
`;