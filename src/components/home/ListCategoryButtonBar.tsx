import React, { useContext } from 'react'
import styled from 'styled-components';
import { FILTER_LIST, LINE_MEDIUM, MEDIUM, STRONG_MEDIUM } from '../../custom/ym/variables';
import { DispatchContext, StateContext } from '../../pages/Home';
import { categoryTypes } from '../../custom/ym/types';
import uuid from 'react-uuid';
import { colorSet } from '../ui/styles/color';
import { fontType } from '../ui/styles/typo';

const ListCategoryButtonBar = () => {
    const { category } = useContext(StateContext);
    const { setCategory } = useContext(DispatchContext);

    const changeCategory = setCategory as React.Dispatch<React.SetStateAction<"" | categoryTypes>>;

    const filterClickHandler = (buttonName: categoryTypes) => {
        if (category === buttonName) {
            changeCategory("");
        } else {
            changeCategory(prev => buttonName);
        }

        console.log(category);
        console.log(buttonName);
    }

    return (
        <CategoryButtons>
          <div>
            {FILTER_LIST.map((element) => <FilterBtn
                selected={category}
                name={element}
                key={uuid()}
                onClick={(e) => filterClickHandler(element)}
            >{element}</FilterBtn>)}
          </div>
        </CategoryButtons>
    )
}

export default ListCategoryButtonBar;


const CategoryButtons = styled.div`
  position: relative;
  overflow: hidden;
  overflow-x: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none;
  };
  div {
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
    selected === name ? `#${MEDIUM}` : `#${LINE_MEDIUM}`};
  border-radius: 18px;
  color : ${({ selected, name }) =>
    selected === name ? 'white' : `#${STRONG_MEDIUM}`};
  ${fontType.body_3}
  background-color : ${({ selected, name }) => selected === name ? `#${MEDIUM}` : 'white'};
`;