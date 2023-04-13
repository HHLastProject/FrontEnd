import React from 'react'
import SearchResultList, { ISearchResult } from '../components/search/SearchResultList';

function Search() {
  return (
    <div>
      <input type="text" />
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
  )
}

export default Search

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