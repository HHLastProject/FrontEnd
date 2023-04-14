import React from 'react'
import SearchResultList, { ISearchResult } from '../components/search/SearchResultList';
import styled from 'styled-components';

const loupeIcon = `${process.env.PUBLIC_URL}/loupe.png`;

function Search() {

  return (
    <SearchWrap>
      <SearchWrapContainer>
        <div id='search-input'>
          <div>
            <img src={loupeIcon} alt="검색하기" />
            <input type="text" />
          </div>
        </div>
        <div>
          {
          result.map((item) => {
            return(
              <SearchResultList
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
`;

const SearchWrapContainer = styled.div`
  margin: 20px;
  #search-input {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #DBDBDB;
    border-radius: 8px;
    div {
      width: 100%;
      margin: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 20px;
    }
    input {
      width: 100%;
      border-style: none;
      margin-left: 11px;
      font-weight: 400;
      font-size: 14px;
      &:focus {
        outline: none;
      }
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