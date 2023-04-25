import React, { useContext } from 'react'
import styled from 'styled-components';
import { HFlex } from '../../custom/ym/styleStore';
import { TITLE_2 } from '../../custom/ym/variables';
import { StateContextType, context } from '../../pages/Mypage';
import { Buttons } from '../ui/element/buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import { path } from '../../shared/path';

const UserProfile = () => {

    const contextObjects = useContext(context);
    const navi = useNavigate();

    const EditNicknameHandler = () => {
        navi(path.editNickname);
    }

    return (
        <ProfileContainer>
            <HFlex gap='12px'>
                <ImageFrame>
                    <ProfileImage src={contextObjects?.props?.profilePic} alt="프로필 사진" />
                </ImageFrame>
                <Nickname>{contextObjects?.props?.nickname}</Nickname>
                <Buttons.Others.IconButton
                    width={16}
                    height={16}
                    onClick={EditNicknameHandler}
                    fileName='nickname_modify.png'
                />
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