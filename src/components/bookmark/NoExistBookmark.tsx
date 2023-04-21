import React from 'react'
import { VFlex, VFlexCenter } from '../../custom/ym/styleStore';
import { Buttons } from '../ui/element/buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BODY_4 } from '../../custom/ym/variables';
import { colorSet } from '../ui/styles/color';
import { path } from '../../shared/path';

const NoExistBookmark = () => {

    const navi = useNavigate();

    const loginClickHandler = () => {
        navi(path.feedList);
    }

    return (
        <Container>
            <VFlex gap='16px' etc='justify-content:center; align-items:center'>
                <ImageContainer>
                    <Image src={`${process.env.PUBLIC_URL}/images/bookmark/no_bookmark_result.png`} />
                </ImageContainer>
                <VFlexCenter height='fit-content'>
                    <Message>사람들이 방문한 곳에서<br />새로운 카페를 찾아보세요.</Message>
                </VFlexCenter>
                <Buttons.Medium.Default onClick={loginClickHandler}>피드 구경하기</Buttons.Medium.Default>
            </VFlex>
        </Container>
    )
}

export default NoExistBookmark;


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