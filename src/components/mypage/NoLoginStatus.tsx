import React from 'react'
import { BODY_4 } from '../../custom/ym/variables';
import { colorSet } from '../ui/styles/color';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { VFlexCenter } from '../../custom/ym/styleStore';
import { Buttons } from '../ui/element/buttons/Buttons';

const NoLoginStatus = () => {
    const navi = useNavigate();

    const writeClickHandler = () => {
        navi('/login');
    }

    return (
        <Container>
            <VFlexCenter gap="16px">
                <ImageFrame>
                    <Image src={`${process.env.PUBLIC_URL}/images/bookmark/no_auth_bookmark.png`} alt="피드가 없습니다." />
                </ImageFrame>
                <TextDiv>
                    새로운 공간을 발견하고,<br />
                    나의 순간을 기록해 보세요.
                </TextDiv>
                <Buttons.Medium.Default onClick={writeClickHandler}>로그인 하기</Buttons.Medium.Default>
            </VFlexCenter>
        </Container>
    )
}

export default NoLoginStatus;


const TextDiv = styled.div`
    font-size: ${BODY_4.fontSize};
    line-height: ${BODY_4.lineHeight};
    font-weight: ${BODY_4.fontWeight};
    color : ${colorSet.textMedium};
    text-align: center;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const ImageFrame = styled.div`
    width: 100px;
    height: 100px;
`
const Container = styled.div`
    width: 100%;
    height: fit-content;
    padding-top: 40px;
    padding-bottom: 20px;
`