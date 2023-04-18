import React from 'react'
import styled from 'styled-components'
import { IconMapFilled24 } from '../ui/element/icons/IconsStyle';

export interface ISearchResult {
  shopId : number;
  shopName : string;
  shopAddress : string;
} ;

function SearchResultList({shopId, shopName, shopAddress}: ISearchResult) {
  const onClickSetValueHadler = () => {

  };

  return (
    <div
      onClick={onClickSetValueHadler}
    >
      <SearchResultListContainer>
        <IconMapFilled24/>
        <span className='search-shop-result'>
          <h4>{shopName}</h4>
          <label>{shopAddress}</label>
        </span>
      </SearchResultListContainer>
    </div>
  )
};

export default SearchResultList

const SearchResultListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 12px 0;
  line-height: 22px;
  border-bottom: 1px solid #DBDBDB;
  cursor: pointer;
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