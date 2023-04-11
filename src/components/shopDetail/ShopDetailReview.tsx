import React from 'react'
import styled from 'styled-components'

function ShopDetailReview() {
  return (
    <ShopDetailReviewContent>
      <div className='shop-detail-review-profile'>
        <div className='userprofile-pic'>
          <img src="" alt="" />
        </div>
        <div>
          <span>
            <label>별점</label>
            <label>닉네임</label>
          </span>
          <label>작성 날짜</label>
        </div>
      </div>
      <div className='shop-detail-review-img'>
        {/* 이미지 리스트 map */}
      </div>
      <pre>
        {/* 리뷰 내용 */}
      </pre>
    </ShopDetailReviewContent>
  )
}

export default ShopDetailReview

const ShopDetailReviewContent = styled.div`
  
`;