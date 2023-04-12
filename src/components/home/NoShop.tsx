import React from 'react'
import styled from 'styled-components';
import noImg from '../../images/home/No_Shop.png'

function NoShop() {
  return (
    <NoShopContainer>
      <img src={noImg} alt="카페가 없습니다." />
      <label>쳇, 주변에 카페가 없어요</label>
      <button>추천 카페 보기</button>
    </NoShopContainer>
  )
}

export default NoShop;

const NoShopContainer = styled.div`
  width: 100%;
  height: 314px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  img {
    width: 100px;
    height: 100px;
  }
  label {
    font-size: 13px;
    color: #717176;
  }
`;