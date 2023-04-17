import styled from 'styled-components'
import { iconImgPath } from '../../shared/path';

export type ISearchInput = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

function SearchStore({inputValue, setInputValue, placeholder}: ISearchInput) {
  return(
    <SearchStoreStyle>
      <div id='search-input'>
        <img src={iconImgPath.search.loupe} alt="검색하기" />
        <SearchInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeholder={placeholder}
        />
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

export function SearchInput({inputValue, setInputValue, placeholder}: ISearchInput) {
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  return (
    <SearchInputStyle
      type='text'
      onChange={onChangeInputHandler}
      value={inputValue}
      placeholder={placeholder}
    />
  )
}

const SearchInputStyle = styled.input`
  width: 100%;
  border-style: none;
  margin-left: 11px;
  font-weight: 400;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;