import React, { useContext } from 'react'
import styled from 'styled-components';
import { FILTER_LIST, LINE_MEDIUM, MEDIUM, STRONG_MEDIUM } from '../../custom/ym/variables';
import { DispatchContext, StateContext } from '../../pages/Home';
import { categoryTypes } from '../../custom/ym/types';
import uuid from 'react-uuid';

const CategoryButtonBar = () => {
    const { category, isChanged } = useContext(StateContext);
    const { setCategory } = useContext(DispatchContext);

    const changeCategory = setCategory as React.Dispatch<React.SetStateAction<"" | categoryTypes>>;

    const filterClickHandler = (buttonName: categoryTypes) => {
        if (category === buttonName) {
            changeCategory("");
        } else {
            changeCategory(prev => buttonName);
        }
    }

    return (
        <>
            {
                isChanged
                    ? <CategoryButtons>
                        {
                            FILTER_LIST.map((element) => <FilterBtn
                                selected={category}
                                name={element}
                                key={uuid()}
                                onClick={(e) => filterClickHandler(element)}
                            >{element}</FilterBtn>)
                        }
                    </CategoryButtons >
                    : null}
        </>
    )
}

export default CategoryButtonBar;


const CategoryButtons = styled.div`
    position: absolute;
    display: flex;
    gap : 4px;
    z-index: 50;
    top: 80px;
    left : 20px;
`

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
    font-family : "Pretendard";
    font-weight : 400;
    line-height : 22px;
    font-size : 14px;
    background-color : ${({ selected, name }) => selected === name ? `#${MEDIUM}` : 'white'};
`;