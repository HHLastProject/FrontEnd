import React, { useContext } from 'react'
import styled from 'styled-components';
import { FILTER_LIST, LINE_MEDIUM, MEDIUM, STRONG_MEDIUM } from '../../custom/ym/variables';
import { categoryTypes } from '../../custom/ym/types';
import { fontType } from '../ui/styles/typo';
import { ShopCategory } from '../../apis/context';

const ListCategoryButtonBar = () => {
  const { category, setCategory} = useContext(ShopCategory);

  const filterClickHandler = (buttonName: categoryTypes) => {
    if(setCategory) {
      setCategory(buttonName);
    }
  };

  return (
    <CategoryButtons>
      <div>
        {FILTER_LIST.map((filterName) => 
          <FilterBtn
            key={filterName}
            selected={category}
            name={filterName}
            onClick={(e) => filterClickHandler(filterName)}
          >
            {filterName}
          </FilterBtn>)
        }
      </div>
    </CategoryButtons>
  )
}

export default ListCategoryButtonBar;


const CategoryButtons = styled.div`
  position: relative;
  overflow: hidden;
  overflow-x: scroll;
  //스크롤
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  };
  div {
    display: flex;
    gap : 4px;
    flex-wrap: nowrap;
    white-space: nowrap;
  }
`;

const FilterBtn = styled.button<{
  selected: string,
  name: string,
}>`
  height: 36px;
  padding : 7px 12px;
  border : 1px solid ${({ selected, name }) =>
    selected === name ? `#${MEDIUM}` : `#${LINE_MEDIUM}`
  };
  border-radius: 18px;
  color : ${({ selected, name }) =>
    selected === name ? 'white' : `#${STRONG_MEDIUM}`
  };
  ${fontType.body_3}
  background-color : ${({ selected, name }) => selected === name ? `#${MEDIUM}` : 'white'};
`;