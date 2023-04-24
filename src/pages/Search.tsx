import React, { useState } from 'react'
import SearchResultList, { ISearchResult } from '../components/search/SearchResultList';
import styled from 'styled-components';
import SearchStore from '../components/search/SearchInput';
import { useParams, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ListHeader from '../components/home/ListHeader';
import { path } from '../shared/path';

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [dataList, setDataList] = useState([]);
  let link = '';
  const location = useLocation();
  //location.state.toShopDetail
  //location.state.toFeedForm
  

  let param = Number(useParams().isfeed); //피드페이지에서 넘어올때만 있는 파라미터
  if(!param) {
    param = 0;
  };

  interface IDataList {
    shopId: number,
    shopName: string,
    shopAddress: string,
  }

  return (
    <>
      <ListHeader
        close={true}
      />
      <SearchWrap>
        <SearchWrapContainer>
          <SearchStore
            inputValue={inputValue}
            setInputValue={setInputValue}
            setDataList={setDataList}
          />

          <div className='search-result-list'>
            {(dataList?.length !== 0) && dataList?.map((item: IDataList) => {
              if(location.state.toShopDetail) {
                link = `${path.toShopDetail}/${item.shopId}`;
              }
              if(location.state.toFeedForm) {
                link = `${path.feedForm}`;
              }
              return(
                <div key={item.shopId}>
                  <Link 
                    to={link}
                    state={{shopId: item.shopId, shopName: item.shopName}}
                  >
                    <SearchResultList
                      shopId={item.shopId}
                      shopName={item.shopName}
                      shopAddress={item.shopAddress}
                    />
                  </Link>
                </div>
              )
            })}
          </div>
        </SearchWrapContainer>
      </SearchWrap>
    </>
  )
};

export default Search

const SearchWrap = styled.div`
  width: 100%;
  min-height: 100vh;
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