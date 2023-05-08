import styled from 'styled-components';
import { useState } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { path } from '../shared/path';
import SearchStore from '../components/search/SearchInput';
import ListHeader from '../components/home/ListHeader';
import SearchResultList from '../components/search/SearchResultList';
import NoResult from '../components/home/NoShop';

interface IDataList {
  shopId: number,
  shopName: string,
  shopAddress: string,
  lat : number,
  lng : number,
}

//Link state로 검색 후 돌아갈 link 값을 받고, 클릭하면 해당 link로 다시 돌아가는 로직
function Search() {
  const [inputValue, setInputValue] = useState('');
  const [dataList, setDataList] = useState<undefined | IDataList[] | []>(undefined);
  const location = useLocation();
  let link = '';

  return (
    <>
      <ListHeader
        close={true}
      />
      <SearchWrap>
        <SearchWrapContainer>
          {/* 디바운스 적용된 검색 로직 들어있는 input */}
          <SearchStore
            inputValue={inputValue}
            setInputValue={setInputValue}
            setDataList={setDataList}
            placeholder={'카페 이름 검색하기'}
          />

          {/* 검색 결과 */}
          <div className='search-result-list'>
            {(dataList !== undefined)
              ? 
              ((dataList?.length !== 0) && dataList?.map((item: IDataList) => {
              // state로 받는 값에 따라 링크가 달라짐
              link = `${path.toShopDetail}/${item.shopId}`;
              if(location.state.link) {link = location.state.link;}
              return(
                <div key={item.shopId}>
                  <Link
                    to={link}
                    state={{
                      isFeedForm: true,
                      shopId: item.shopId,
                      shopName: item.shopName,
                      lat: item.lat,
                      lng: item.lng,
                    }}
                  >
                    <SearchResultList
                      shopId={item.shopId}
                      shopName={item.shopName}
                      shopAddress={item.shopAddress}
                    />
                  </Link>
                </div>
              )}))
              :
              <>
                {/* <VFlex gap={'12px'}>
                  <Title5>최근 검색어</Title5>
                  <Body3>검색 내역이 없습니다.</Body3>
                </VFlex> */}
              </>
            }

            {/* undefined일 때 아무것도 없고, []일때 결과없음 띄움 */}
            {(dataList !== undefined) && (dataList?.length === 0 && <NoResult search={true} />)}
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