import styled from 'styled-components';
import { useState } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { path } from '../shared/path';
import SearchStore from '../components/search/SearchInput';
import ListHeader from '../components/home/ListHeader';
import SearchResultList from '../components/search/SearchResultList';
import NoResult from '../components/home/NoShop';

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [dataList, setDataList] = useState([]);
  let link = '';
  const location = useLocation();

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
            placeholder={'카페 이름 검색하기'}
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
            }).length === 0 && <NoResult search={true} />
            }
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