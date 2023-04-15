import React from 'react'
import styled from 'styled-components';
import { SpanImg } from '../ImgStyle';

interface IShopDetailContentInfo {
  icon: string;
  content: string;
};

function ShopDetailContentInfo({icon, content}: IShopDetailContentInfo) {
  return (
    <ShopDetailContentInfoStyle>
      <SpanImg
        height={15}
        imgUrl={icon}
      />
      <label>{content}</label>
    </ShopDetailContentInfoStyle>
  )
};

export default ShopDetailContentInfo

const ShopDetailContentInfoStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #EDEDED;
  label {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    margin-left: 7px;
  }
`;