import styled from 'styled-components'
import { iconImgPath } from '../../shared/path';
import { debounce } from '../../custom/jh/debounce';
import { useCallback } from 'react';
import getSearchResult from '../../custom/jh/useSearchResult';

export interface ISearchInput {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  setDataList: React.Dispatch<React.SetStateAction<never[]>> | ISearchResult[] | any;
  children?: React.ReactNode;
};

export interface ISearchResult {
  shopId: number;
  shopName: string;
  shopAddress: string;
};

function SearchStore({
  inputValue,
  setInputValue,
  placeholder,
  setDataList,
  children,
}: ISearchInput) {
  return (
    <SearchStoreStyle>
      <div id='search-input'>
        <img src={iconImgPath.search.loupe} alt="검색하기" />
        <SearchInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={placeholder}
          setDataList={setDataList}
        />
        {children}
      </div>
    </SearchStoreStyle>
  )
};

export default SearchStore

const SearchStoreStyle = styled.div`
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
`;

export function SearchInput({
  inputValue,
  setInputValue,
  placeholder,
  setDataList,
}: ISearchInput) {

  //검색 로직
  const delaySec: number = 1;
  const debounceCallback = useCallback(
    debounce((value: string, delaySec?: number) => {
      getSearchResult(value, setDataList);
    }, (delaySec ? delaySec * 1000 : 2000))
  , []);

  const onChangeInputCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debounceCallback(e.target.value);
  };

  return (
    <InputStyle
      type='text'
      onChange={onChangeInputCallback}
      value={inputValue}
      placeholder={placeholder}
      margin={`0 0 0 11px`}
    />
  )
}

export const InputStyle = styled.input<{ margin?: string }>`
  width: 100%;
  border-style: none;
  margin: ${({ margin }) => margin};
  font-weight: 400;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export const TextareaStyle = styled.div<{ margin?: string, padding?: string, border?: string, radius?: string }>`
  display: flex;
  align-items: center;
  border: ${({ border }) => border};
  border-radius: ${({ radius }) => radius};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};

  input::-webkit-input-placeholder,
  input::-moz-placeholder,
  input:-ms-input-placeholder,
  input:-moz-placeholder,
  input::placeholder {
    text-align: center;
  }

  textarea {
    flex: 1;
    border-style: none;
    font-weight: 400;
    font-size: 14px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
`;