import React, { useState } from 'react'
import styled from 'styled-components'

function ShopDetailReviewForm() {
  const [count, setCount] = useState<number>(0);
  const textCountHnadler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length <= 500) {
      setCount(e.target.value.length);
    }
  };

  return (
    <>
      <form action="/">
        <ShopDetailReviewFormContainer>
          <h2>이 곳은 어땠나요?</h2>
          
          <ShopDetailReviewTextarea 
            onChange={textCountHnadler}
            maxLength={500}
          />
          <div className='text-count'>
            <label>{count}/500</label>
          </div>

          <button
            // onClick={}
          >
            리뷰 작성
          </button>
        </ShopDetailReviewFormContainer>
      </form>
    </>
  )
}

export default ShopDetailReviewForm

const ShopDetailReviewFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
  .text-count {
    display: flex;
    justify-content: flex-end;
  }
`;

const ShopDetailReviewTextarea = styled.textarea`
  height: 220px;
  border: 1px solid #DBDBDB;
  border-radius: 10px;
  resize: none;
  outline: none;
`;