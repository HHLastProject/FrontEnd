import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { HFlex } from '../../custom/ym/styleStore';
import { TITLE_2 } from '../../custom/ym/variables';
import { Buttons } from '../ui/element/buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import { path } from '../../shared/path';
import useMypage from '../../hooks/useMypage';

const UserProfile = () => {

    const [profilePic, setProfilePic] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const navi = useNavigate();

    const EditNicknameHandler = () => {
        navi(path.editNickname);
    }

    const { data } = useMypage();

    useEffect(() => {
        if (data) {
            setProfilePic(data?.profilePic);
            setNickname(data?.nickname);
        }
        console.log('유즈이펙트', data);
    }, [data]);

    return (
        <ProfileContainer>
            <HFlex gap='12px'>
                <ImageFrame>
                    {profilePic
                        ? <ProfileImage src={profilePic} alt="프로필 사진" />
                        : null}
                </ImageFrame>
                {nickname
                    ? <Nickname>{nickname}</Nickname>
                    : null}
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