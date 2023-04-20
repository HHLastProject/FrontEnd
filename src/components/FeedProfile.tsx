import React, { PropsWithChildren } from 'react'
import { mypageData } from '../custom/ym/dummydata';
import styled from 'styled-components';
import { HFlex } from '../custom/ym/styleStore';
import SmallProfileCard from './SmallProfileCard';
import FeedNameCard from './FeedNameCard';
import { defaultImgPath } from '../shared/path';

interface IFeedProfile {
    profilePic: string;
    nickname: string;
    createdAt: string;
}

const FeedProfile = ({profilePic, nickname, createdAt}: IFeedProfile) => {
    return (
        <ProfileCard>
            <HFlex gap='4px'>
                <SmallProfileCard>{profilePic}</SmallProfileCard>
                <FeedNameCard
                    createdAt={createdAt}
                    nickname={nickname}
                />
            </HFlex>
        </ProfileCard>
    )
}

export default FeedProfile;

const ProfileCard = styled.div`
    width: 100%;
    height: 38px;
    background-color: #fff;
    font-family: "Pretendard";
`;