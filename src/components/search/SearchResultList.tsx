import React from 'react'
import styled from 'styled-components'

export interface ISearchResult {
  shopId : number,
  shopName : string,
  shopAddress : string,
} ;

const searchMarkerImg = `${process.env.PUBLIC_URL}/images/search/search_result_marker.png`;

function SearchResultList({shopId, shopName, shopAddress}: ISearchResult) {
  return (
    <OnClickDivWrap
      // onClick={}
    >
      <SearchResultListContainer>
        <span>
          <img src={searchMarkerImg} alt="마커" className='search-marker'/>
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