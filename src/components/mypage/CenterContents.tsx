import React from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import styled from 'styled-components';
import { BODY_1 } from '../../custom/ym/variables';

const CenterContents = () => {
    const logoutButtonHandler = () => {
        localStorage.removeItem("access_token");
    }
    return (
        <VFlex height='fit-content'>
            <EachItem>
                <HFlex>
                    <ButtonContainer><Text>이용약관</Text></ButtonContainer>
                </HFlex>
            </EachItem>
            <EachItem>
                <HFlex>
                    <ButtonContainer onClick={logoutButtonHandler}><Text>로그아웃</Text></ButtonContainer>
                </HFlex>
            </EachItem>
            <EachItem>
                <HFlex>
                    <ButtonContainer><Text>탈퇴하기</Text></ButtonContainer>
                </HFlex>
            </EachItem>
        </VFlex>
    )
}

export default CenterContents;

const EachItem = styled.div`
    width: 100%;
    height: 62px;
    background-color: white;
    /* padding : 20px 0px; */
`
const ButtonContainer = styled.button`
    width: fit-content;
    height: fit-content;
    padding: 0px;
    border : none;
    background-color: transparent;
`
const Text = styled.span`
    
    font-family: "Pretendard";
    padding: 0;
    font-size: ${BODY_1.fontSize};
    line-height: ${BODY_1.lineHeight};
    font-weight: ${BODY_1.fontWeight};
    color: ${BODY_1.color};
`