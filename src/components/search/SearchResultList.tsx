import React from 'react'
import styled from 'styled-components'

export interface ISearchResult {
  shopId : number,
  shopName : string,
  shopAddress : string,
} ;

function SearchResultList({shopId, shopName, shopAddress}: ISearchResult) {
  return (
    <SearchResultListContainer>
      <span>마커위치</span>
      <span className='shop-result'>
        <h4>{shopName}</h4>
        <label>{shopAddress}</label>
      </span>
    </SearchResultListContainer>
  )
};

export default SearchResultList

const SearchResultListContainer = styled.div`
  .shop-result {
    display: flex;
    flex-direction: column;
    line-height: 22px;
    h4 {
      font-size: 16px;
      font-weight: 400;
    }
  }
`;