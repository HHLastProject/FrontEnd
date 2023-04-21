import React, { PropsWithChildren } from 'react'
import { mypageData } from '../custom/ym/dummydata';
import styled from 'styled-components';
import { HFlex } from '../custom/ym/styleStore';
import SmallProfileCard from './SmallProfileCard';
import FeedNameCard from './FeedNameCard';
import { defaultImgPath } from '../shared/path';

const FeedProfile = ({ profilePic }: { profilePic?: string }) => {

    // console.log('feedProfile', profilePic);
    if (!profilePic) { profilePic = defaultImgPath.shopList };
    return (
        <ProfileCard>
            <HFlex gap='4px'>
                <SmallProfileCard>{profilePic}</SmallProfileCard>
                {/* <FeedNameCard a={true}/> 프롭스로 구분(주희님껀지, 용민껀지*/}
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