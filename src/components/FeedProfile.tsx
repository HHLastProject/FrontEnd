import React from 'react'
import { mypageData } from '../custom/ym/dummydata';
import styled from 'styled-components';
import { HFlex } from '../custom/ym/styleStore';
import SmallProfileCard from './SmallProfileCard';
import FeedNameCard from './FeedNameCard';

const FeedProfile = () => {
    const { profilePic } = mypageData;

    return (
        <ProfileCard>
            <HFlex gap='4px'>
                <SmallProfileCard>{profilePic}</SmallProfileCard>
                <FeedNameCard />
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