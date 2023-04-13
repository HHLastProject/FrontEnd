import React from 'react'
import styled from 'styled-components'
import { TITLE_4 } from '../../custom/ym/variables'

const MyAllFeeds = () => {
    return (
        <ButtonLarge>
            <ButtonText>전체 보기</ButtonText>
        </ButtonLarge>
    )
}

export default MyAllFeeds
const ButtonLarge = styled.button`
    border: none;
    background-color: transparent;
    width:100%;
    height: 56px;
    padding : 17px 26px;
    font-family: "Pretendard";
`
const ButtonText = styled.span`
    font-size: ${TITLE_4.fontSize};
    line-height: ${TITLE_4.lineHeight};
    font-weight: ${TITLE_4.fontWeight};
    color : ${TITLE_4.color};
`