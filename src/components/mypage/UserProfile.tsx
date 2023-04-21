import React, { useContext } from 'react'
import styled from 'styled-components';
import { HFlex } from '../../custom/ym/styleStore';
import { TITLE_2 } from '../../custom/ym/variables';
import { StateContextType, context } from '../../pages/Mypage';

const UserProfile = () => {

    const contextObjects = useContext(context);

    return (
        <ProfileContainer>
            <HFlex gap='12px'>
                <ImageFrame>
                    <ProfileImage src={contextObjects?.props?.profilePic} alt="프로필 사진" />
                </ImageFrame>
                <Nickname>{contextObjects?.props?.nickname}의 피드</Nickname>
            </HFlex>
        </ProfileContainer>
    )
}

export default UserProfile;

const Nickname = styled.span`
    font-size: ${TITLE_2.fontSize};
    line-height: ${TITLE_2.lineHeight};
    font-weight: ${TITLE_2.fontWeight};
`

const ProfileContainer = styled.div`
    width: 100%;
    height: 60px;
    font-family: "Pretendard";
`
const ImageFrame = styled.div`
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 20px;
    overflow: hidden;
`
const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`