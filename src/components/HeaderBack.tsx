import React from 'react'
import styled from 'styled-components';
import { HFlex } from '../custom/ym/styleStore';
import { useNavigate } from 'react-router-dom';

const HeaderBack = () => {
    const navi = useNavigate();

    return (
        <Header>
            <HFlex>
                <ButtonContainer onClick={() => navi(-1)}>
                    <ButtonImg src={`${process.env.PUBLIC_URL}/icon/back_24.png`} alt='' />
                </ButtonContainer>
            </HFlex>
        </Header>
    )
}

export default HeaderBack;

const Header = styled.header`
    width: 100%;
    height: 60px;
    background-color: white;
    padding-left: 20px;
`

const ButtonContainer = styled.button`
    width: 24px;
    height: 24px;
    border: none;
    background-color: transparent;
    padding: 0;
`

const ButtonImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`