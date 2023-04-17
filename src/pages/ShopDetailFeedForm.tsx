import styled from 'styled-components'
import useTextCountHandler from '../custom/jh/useTextCountHandler';

function ShopDetailFeedForm() {
  const maxLength = 500;
  const {count, textCountHandler} = useTextCountHandler(maxLength);

  return (
    <>
      <form action="/">
        <ShopDetailReviewFormContainer>
          <h2>이 곳은 어땠나요?</h2>
          
          <ShopDetailReviewTextarea
            onChange={textCountHandler}
            maxLength={maxLength}
            placeholder='후기를 작성해 주세요 :)'
          />
          <div className='text-count'>
            <label>{count}/{maxLength}</label>
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
  height: 220px;
  border: 1px solid #DBDBDB;
  border-radius: 10px;
  resize: none;
  outline: none;
`;