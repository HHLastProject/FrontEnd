import React from 'react'
import styled from 'styled-components';
import CategoryDetailSpan from '../shopDetail/CategoryDetailSpan';

interface IShopDetail {
  shopName: string;
  category: string;
};

function ShopDetailStoreName({shopName, category}: IShopDetail) {
  return (
    <ShopDetailStoreNameStyle>
      <div>
        <h1>{shopName}</h1>
        <div>
          <CategoryDetailSpan>{category}</CategoryDetailSpan>
        </div>
      </div>
    </ShopDetailStoreNameStyle>
  )
};

export default ShopDetailStoreName

const ShopDetailStoreNameStyle = styled.div`
  width: 370px;
  display: inline-block;
  position: absolute;
  bottom: 0;
  border-radius: 0 32px 0 0;
  background-color: #ffff;

  & > div {
    margin-top: 24px;
    margin: 24px 20px;
    div {
      margin-top: 4px;
    }
  }

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
  }
`;