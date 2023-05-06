import React from 'react'
import styled from 'styled-components';
import { VFlex, VFlexCenter } from '../../custom/ym/styleStore';
import { BODY_1 } from '../../custom/ym/variables';
import KakaoLogin from '../login/KakaoLogin';
import { Buttons } from '../ui/element/buttons/Buttons';
import { AdminButton } from '../../pages/Login';
import { useNavigate } from 'react-router-dom';
import { path } from '../../shared/path';

const Intro = ({ dispatch }: { dispatch: () => void }) => {

    const navi = useNavigate();

    const flexStyle = `
        z-index:5;
        background-image: url(${process.env.PUBLIC_URL}/images/intro/Img_intro.png);
        background-repeat: no-repeat;
        background-position: center;
        justify-content : flex-start;
        padding-top: 193px;
    `

    const adminHandler = () => {
        navi(path.adminLogin);
    }


    return (
        <IntroContainer>
            <VFlexCenter gap='180px' etc={flexStyle}>
                <VFlexCenter gap='8px' height='fit-content'>
                    <Logo src={`${process.env.PUBLIC_URL}/images/intro/logo.svg`} />
                    <TextBox>내 주변 카페 쉽게 찾고<br />유저들과 공유하기</TextBox>
                </VFlexCenter>
                <VFlexCenter height='fit-content' gap='9px'>
                    <KakaoLogin />
                    <Buttons.Large.Default onClick={dispatch}>둘러보기</Buttons.Large.Default>
                    <AdminButton onClick={adminHandler}>관리자로 로그인하기</AdminButton>
                </VFlexCenter>
            </VFlexCenter>
        </IntroContainer>
    )
}

export default Intro;


const TextBox = styled.div`
    font-size: ${BODY_1.fontSize};
    line-height: ${BODY_1.lineHeight};
    font-weight: ${BODY_1.fontWeight};
    color: black;
`

const Logo = styled.img`
    /* position: absolute; */
    width: fit-content;
    height: fit-content;
`

const BgImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* object-position: 50% 50%; */
`
const BackGroundDiv = styled.div`
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    /* object-position: 50% 50%; */
`

const IntroContainer = styled.div`
    position: fixed;
    display: relative;
    width: 390px;
    height: 100%;
    top: 0;
    left: 50%-width/2;
    z-index: 1000;
    background-color: white;
`