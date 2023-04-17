import React from 'react'
import styled from 'styled-components';
import { VFlex, VFlexCenter } from '../../custom/ym/styleStore';
import { BODY_4 } from '../../custom/ym/variables';
import { colorSet } from '../ui/styles/color';
import { Buttons } from '../ui/element/buttons/Buttons';
import { useNavigate } from 'react-router-dom';

const BookmarkLogoutComp = () => {

    const navi = useNavigate();

    const loginClickHandler = () => {
        navi('/login');
    }

    return (
        <Container>
            <VFlex gap='16px' etc='justify-content:center; align-items:center'>
                <ImageContainer>
                    <Image src={`${process.env.PUBLIC_URL}/images/bookmark/no_auth_bookmark.png`} />
                </ImageContainer>
                <VFlexCenter height='fit-content'>
                    <Message>로그인 후<br />새로운 카페를 저장해 보세요.</Message>
                </VFlexCenter>
                <Buttons.Medium.Default onClick={loginClickHandler}>로그인 하기</Buttons.Medium.Default>
            </VFlex>
        </Container>
    )
}

export default BookmarkLogoutComp;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ImageContainer = styled.div`
    width: 100px;
    height: 100px;
`

const Container = styled.div`
    padding-top: 160px;
    width: 100%;
    height: fit-content;
    min-height: 100%;
`

const Message = styled.div`
    text-align: center;
    font-size: ${BODY_4.fontSize};
    line-height: ${BODY_4.lineHeight};
    font-weight: ${BODY_4.fontWeight};
    color: ${colorSet.textMedium}
`