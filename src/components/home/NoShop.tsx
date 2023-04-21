import React from 'react'
import styled from 'styled-components';
import { Buttons } from '../ui/element/buttons/Buttons';

function NoShop() {
  const noResultImg = `${process.env.PUBLIC_URL}/images/search/no_result.png`;
  return (
    <NoShopContainer>
      <img src={noResultImg} alt="카페가 없습니다." />
      <label>주변엔 카페가 없어요.<br/>반경을 더 넓혀보세요.</label>
      <Buttons.Medium.Default>
        반경 설정하기
      </Buttons.Medium.Default>
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