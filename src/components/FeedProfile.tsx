import React, { PropsWithChildren, useState } from 'react'
import { mypageData } from '../custom/ym/dummydata';
import styled from 'styled-components';
import { HFlex } from '../custom/ym/styleStore';
import SmallProfileCard from './SmallProfileCard';
import FeedNameCard from './FeedNameCard';
import { defaultImgPath } from '../shared/path';
import { Buttons } from './ui/element/buttons/Buttons';
import { Modals } from './ui/modal/Modals';

const FeedProfile = ({ profilePic, params }: { profilePic?: string, params: number }) => {

    const [modifyModal, setModifyModal] = useState(false);

    if (!profilePic) { profilePic = defaultImgPath.shopList };

    const modifyClickHandler = () => {
        setModifyModal((prev) => true);
    }

    return (
        <ProfileCard>
            <HFlex gap='4px' etc='position:relative;'>
                <SmallProfileCard>{profilePic}</SmallProfileCard>
                <FeedNameCard />
                <Buttons.Others.IconButton
                    width={24}
                    height={24}
                    onClick={modifyClickHandler}
                    fileName={"feed_modify.png"}
                />
                {modifyModal
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