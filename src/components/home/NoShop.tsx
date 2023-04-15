import React from 'react'
import styled from 'styled-components';

function NoShop() {
  const noResultImg = `${process.env.PUBLIC_URL}/images/home/no_result.png`;
  return (
    <NoShopContainer>
      <img src={noResultImg} alt="카페가 없습니다." />
      <label>주변엔 카페가 없어요.<br/>반경을 더 넓혀보세요.</label>
      <button>반경 설정하기</button>
    </NoShopContainer>
  )
};

export default NoShop;

const NoShopContainer = styled.div`
  width: 100%;
  height: 314px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 120px;
  gap: 25px;
  img {
    width: 100px;
  }
  label {
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    color: #717176;
  }
`;