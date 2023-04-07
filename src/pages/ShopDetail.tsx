import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

function ShopDetail() {
  const param = useParams().shopId;
  const tabInfoRef = useRef();
  const tabMenuRef = useRef();
  const tabReviewRef = useRef();

  const scrollToTabInfo = () => {
    // tabInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // const [isCheckedTabInfo, setIsCheckedTabInfo] = useState(true);     //정보
  // const [isCheckedTabMenu, setIsCheckedTabMenu] = useState(false);    //메뉴
  // const [isCheckedTabReview, setIsCheckedTabReview] = useState(false);//리뷰
  // const tabInfo = document.getElementById('detail-tab-info');
  // if(tabInfo) {
  //   // const isCheckedTabInfo: boolean = tabInfo.checked;
  // }

  return (
    <ShopDetailContainer>
      <Header>
        <span>뒤로가기</span>
        <span>책갈피</span>
      </Header>
      <ShopDetailContent>
        <img 
          src=""
          alt=""
          className='thumbnail-img'/>
        <div>
          <h1>가게이름</h1>
          <span>
            <label>★별점</label>
            <label>(리뷰수)</label>
            <div className='category'>카테고리</div>
          </span>
        </div>
      </ShopDetailContent>
      <ShopDetailTab>
        <ul id='detail-tab'>
          <li id="">
            <input type="radio" id='detail-tab-info' name='detail-tab' hidden/>
            <div className='detail-tab-div'>
              <label htmlFor="detail-tab-info">정보</label> 
            </div>
          </li>
          <li id="">
            <input type="radio" id='detail-tab-menu' name='detail-tab' hidden/>
            <div className='detail-tab-div'>
              <label htmlFor="detail-tab-menu">메뉴</label>
            </div>
          </li>
          <li id="">
            <input type="radio" id='detail-tab-review' name='detail-tab' hidden/>
            <div className='detail-tab-div'>
              <label htmlFor="detail-tab-review">리뷰</label>
            </div>
          </li>
        </ul>
      </ShopDetailTab>
      <ShopDetailContent>
        
      </ShopDetailContent>

    </ShopDetailContainer>
  )
}

export default ShopDetail

const Header = styled.header`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  border-bottom: 1px solid;
  span {
    margin: 20px;
  }
`;

const ShopDetailContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 100px;
  margin-top: 60px;
`;

const ShopDetailContent = styled.div`
  width: 100%;
  input[type="radio"]:checked {

  }
`;

const ShopDetailTab = styled.div`
  width: 100%;
  height: 375px;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;

    li {
      width: 33.33%; 
      background-color: #ffc9c9;
    }

    label {
      width: 100%;
      line-height: 50px;
      display: block;
    }

    input[type="radio"] + div {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input[type="radio"]:checked + div {
      border-bottom: 3px solid #2e975a;
      label {
        color: #2e975a;
      }
    }
  }
`;