import React, { useState } from 'react'
import styled from 'styled-components';
import { HFlex } from '../custom/ym/styleStore';
import SmallProfileCard from './SmallProfileCard';
import FeedNameCard from './FeedNameCard';
import { defaultImgPath } from '../shared/path';
import { Buttons } from './ui/element/buttons/Buttons';
import { Modals } from './ui/modal/Modals';

type TFeedProfile = {
    profilePic?: string | null;
    nickname?: string;
    createdAt?: string;
    params?: number
}

const FeedProfile = ({ profilePic, nickname, createdAt, params }: TFeedProfile) => {
    const [modifyModal, setModifyModal] = useState(false);

    if (!profilePic) { profilePic = defaultImgPath.shopList };

    const modifyClickHandler = () => {
        setModifyModal((prev) => true);
    }

    return (
        <ProfileCard>
            <HFlex gap='4px' etc='position:relative;'>
                <SmallProfileCard>{profilePic}</SmallProfileCard>
                {(nickname && createdAt) ?
                    <FeedNameCard
                        nickname={nickname}
                        createdAt={createdAt}
                    />
                    :
                    <FeedNameCard />
                }
                <Buttons.Others.IconButton
                    width={24}
                    height={24}
                    onClick={modifyClickHandler}
                    fileName={"feed_modify.png"}
                />
                {(modifyModal && (params !== undefined))
                    ? <Modals.Feed stateDispatch={setModifyModal} params={params} />
                    : null}
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