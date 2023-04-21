import React from 'react'
import styled from 'styled-components'
import { TITLE_4 } from '../../custom/ym/variables'
import { useNavigate } from 'react-router-dom'


// 통신 연결 전까지만 통신으로 피드의 수를 전달함
type Props = {
    temp: number
}

const MyAllFeedsButton = ({ temp }: Props) => {
    const navi = useNavigate();
    const buttonClickHandler = () => {
        navi(`/mypage/feeds/${temp}`);
    }
    return (
        <ButtonLarge onClick={buttonClickHandler}>
            <ButtonText>전체 보기</ButtonText>
        </ButtonLarge>
    )
}

export default MyAllFeedsButton
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