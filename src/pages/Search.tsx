import React, { useState } from 'react'
import SearchResultList, { ISearchResult } from '../components/search/SearchResultList';
import styled from 'styled-components';
import SearchStore from '../components/search/SearchInput';

function Search() {
  const [inputValue, setInputValue] = useState('');

  return (
    <SearchWrap>
      <SearchWrapContainer>
        <SearchStore
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <div className='search-result-list'>
          {
          result.map((item) => {
            return(
              <SearchResultList
                key={item.shopId}
                shopId={item.shopId}
                shopName={item.shopName}
                shopAddress={item.shopAddress}
              />
            )
          })
        }
        </div>
      </SearchWrapContainer>
    </SearchWrap>
  )
};

export default Search

const SearchWrap = styled.div`
  width: 390px;
  height: 100vh;
  background-color: #fff;
  display: inline-block;
`;

const SearchWrapContainer = styled.div`
  margin: 20px;
  #search-input-div {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #DBDBDB;
    border-radius: 8px;
    #search-input {
      width: 100%;
      margin: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 20px;
    }
    
  }
`;

const result : ISearchResult[] = [
  {
    shopId : 1,
    shopName : '가게이름1',
    shopAddress : '주소1',
  },
  {
    shopId : 2,
    shopName : '가게이름2',
    shopAddress : '주소2',
  },
  {
    shopId : 3,
    shopName : '가게이름3',
    shopAddress : '주소3',
  },
  {
    shopId : 4,
    shopName : '가게이름4',
    shopAddress : '주소4',
  },
];