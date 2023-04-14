import styled from 'styled-components'
import { ISearchInput } from '../../pages/Search';

function SearchInput({inputValue, setInputValue}: ISearchInput) {
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  return (
    <SearchInputStyle
      type='text'
      onChange={onChangeInputHandler}
      value={inputValue}
    />
  )
}

export default SearchInput

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