import React, { useContext } from 'react'
import styled from 'styled-components';
import { FILTER_LIST, LINE_LIGHT, LINE_MEDIUM, MEDIUM, PRIMARY_01, RANGE_FILTER_LIST, STRONG_MEDIUM } from '../../custom/ym/variables';
import { categoryTypes, rangeTypes } from '../../custom/ym/types';
import { fontType } from '../ui/styles/typo';
import { ShopCategory } from '../../apis/context';
import { Body3 } from '../FontStyle';

export const ListCategoryButtonBar = () => {
  const {category, setCategory} = useContext(ShopCategory);
  
  //category = 선택한 카테고리 이름;

  const filterClickHandler = (buttonName: categoryTypes) => {
    if(setCategory) { setCategory(buttonName); }
  };

  return (
    <CategoryButtons>
      <div className='nowrap-buttons'>
        {FILTER_LIST.map((filterName) => 
          <FilterBtn
            key={filterName}
            category={'shopCategory'}
            name={filterName}
            selected={category}
            onClick={(e) => filterClickHandler(filterName)}
          >
            {filterName}
          </FilterBtn>)
        }
      </div>
    </CategoryButtons>
  )
}

export const RangeFilterButtonBar = () => {
  const {range, setRange} = useContext(ShopCategory);

  const filterClickHandler = (range: rangeTypes) => {
    if(setRange) {setRange(range);}
  };

  return (
    <CategoryButtons>
      <div>
        {range && RANGE_FILTER_LIST.map((item: rangeTypes) => {
          return(
            <FilterBtn
              key={`filter${item}`}
              category={'range'}
              name={String(item)}
              selected={String(range)}
              onClick={(e) => filterClickHandler(item)}
            >
              {(item <= 1000) ? `${item}m` : `${item / 1000}km`}
            </FilterBtn>
          )
        })}
      </div>
    </CategoryButtons>
  )
}

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

  div{
    display: flex;
    gap : 4px;
  }
  .nowrap-buttons {
    flex-wrap: nowrap;
    white-space: nowrap;
  }
`;

const categoryBtnStyle = (selected: string, name: string) => {
  const color = (selected === name) ? 'white' : `#${STRONG_MEDIUM}`;
  const border = (selected === name) ? `#${PRIMARY_01}` : `#${LINE_MEDIUM}`;
  const bgc = (selected === name) ? `#${PRIMARY_01}` : 'white';
  return(`
    color : ${color};
    border : 1px solid ${border};
    border-radius: 18px;
    padding : 7px 12px;
    background-color : ${bgc};
  `);
}
const rangeBtnStyle = (selected: string, name: string) => {
  const color = (selected === name) ? 'white' : `#${STRONG_MEDIUM}`;
  const bgc = (selected === name) ? `#${PRIMARY_01}` : `#${LINE_LIGHT}`;
  return(`
    color : ${color};
    border : none;
    border-radius: 12px;
    padding : 10px 14px;
    background-color : ${bgc};
  `);
}

const FilterBtn = styled.button<{
  category: string,
  name: string,
  selected: string,
}>`
  color : ${({ selected, name }) => selected === name ? 'white' : `#${STRONG_MEDIUM}`};
  ${fontType.body_3}

  ${({selected, name, category}) => {
    if(category === 'shopCategory') return categoryBtnStyle(selected, name);
    if(category === 'range') return rangeBtnStyle(selected, name);
  }};
`;

