import React from 'react'
import styled from 'styled-components'
import { iconImgPath } from '../../shared/path';

export interface ISearchResult {
  shopId : number,
  shopName : string,
  shopAddress : string,
} ;

function SearchResultList({shopId, shopName, shopAddress}: ISearchResult) {
  return (
    <OnClickDivWrap
      // onClick={}
    >
      <SearchResultListContainer>
        <span>
          <img src={iconImgPath.search.marker} alt="위치" className='search-marker'/>
        </span>
        <span className='search-shop-result'>
          <h4>{shopName}</h4>
          <label>{shopAddress}</label>
        </span>
      </SearchResultListContainer>
    </OnClickDivWrap>
  )
};

export default SearchResultList

const OnClickDivWrap = ({children, onClick}: any) => {
  return (
    <div
      style={{cursor: 'pointer'}}
      onClick={onClick}
    >
      {children}
    </div>
  )
};

const SearchResultListContainer = styled.div`
  display: flex;
  padding: 12px 0;
  line-height: 22px;
  border-bottom: 1px solid #DBDBDB;
  .search-marker {
    width: 16px;
  }
  .search-shop-result {
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    h4 {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
    }
    label {
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      color: #717176;
    }
  }
`;