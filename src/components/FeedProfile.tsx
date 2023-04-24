import styled from 'styled-components';
import { HFlex } from '../custom/ym/styleStore';
import SmallProfileCard from './SmallProfileCard';
import FeedNameCard from './FeedNameCard';
import { defaultImgPath } from '../shared/path';

type TFeedProfile = {
    profilePic?: string | null;
    nickname?: string;
    createdAt?: string;
}

const FeedProfile = ({ profilePic, nickname, createdAt }: TFeedProfile) => {

    if (!profilePic) { profilePic = defaultImgPath.shopList };
    return (
        <ProfileCard>
            <HFlex gap='4px'>
                <SmallProfileCard>{profilePic}</SmallProfileCard>
                { (nickname && createdAt) &&
                    <FeedNameCard 
                        nickname={nickname}
                        createdAt={createdAt}
                    />
                }
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