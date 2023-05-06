import React, { useContext } from 'react'
import styled from 'styled-components';
import { FILTER_LIST, LINE_LIGHT, LINE_MEDIUM, PRIMARY_01, RANGE_FILTER_LIST, STRONG_MEDIUM } from '../../custom/ym/variables';
import { categoryTypes, rangeTypes } from '../../custom/ym/types';
import { fontType } from '../ui/styles/typo';
import { ShopCategory } from '../../apis/context';
import { Swiper, SwiperSlide } from 'swiper/react';
import LOCALSTORAGE_KEY from '../../shared/locatstorageKey';

export type TPageName = 'SHOP_LIST' | 'FEED_LIST';
interface IPageName {
  [key: string]: TPageName;
}

export const PAGE_NAME: IPageName = {
  SHOP_LIST : 'SHOP_LIST',
  FEED_LIST : 'FEED_LIST',
}

export const ListCategoryButtonBar = ({pageName}: {pageName: TPageName}) => {
  const {category, setCategory} = useContext(ShopCategory); //선택한 카테고리 이름

  const filterClickHandler = (buttonName: categoryTypes) => {
    if(setCategory) {
      setCategory(buttonName);
      if(pageName === PAGE_NAME.SHOP_LIST){
        localStorage.setItem(LOCALSTORAGE_KEY.shop.CATEGORY, buttonName);
      } else if (pageName === PAGE_NAME.FEED_LIST) {
        localStorage.setItem(LOCALSTORAGE_KEY.feed.CATEGORY, buttonName);
      }
    }
    if((category === buttonName) && setCategory ) {
      setCategory('');
      if(pageName === PAGE_NAME.SHOP_LIST){
        localStorage.removeItem(LOCALSTORAGE_KEY.shop.CATEGORY);
      } else if (pageName === PAGE_NAME.FEED_LIST) {
        localStorage.removeItem(LOCALSTORAGE_KEY.feed.CATEGORY);
      }
    }
  };

  return (
    <>
    <SlideCase2>
    <Swiper
      spaceBetween={4}
      slidesPerView={'auto'}
      style={{ boxSizing: 'border-box', width: 'fit-content' }}
    >
      <div className='nowrap-buttons'>
        {FILTER_LIST.map((filterName) => 
          <SwiperSlide key={filterName} style={{ width: 'fit-content', flex: 'none' }}>
            <FilterBtn
              category={'shopCategory'}
              name={filterName}
              selected={category}
              onClick={(e) => filterClickHandler(filterName)}
            >
              {filterName}
            </FilterBtn>
          </SwiperSlide>
          )
        }
      </div>
    </Swiper>
    </SlideCase2>
    </>
  )
}

export const RangeFilterButtonBar = () => {
  const {range, setRange} = useContext(ShopCategory);

  const filterClickHandler = (range: rangeTypes) => {
    if(setRange) {
      setRange(range);
      localStorage.setItem(LOCALSTORAGE_KEY.RANGE, String(range));
    }
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
            {(item < 1000) ? `${item}m` : `${item / 1000}km`}
          </FilterBtn>
        )
      })}
    </div>
  </CategoryButtons>
  )
}

const SlideCase2 = styled.div`
width: 100%;
height: fit-content;
box-sizing: border-box;
overflow-x: hidden;
`

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
    padding : 11px 16px;
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