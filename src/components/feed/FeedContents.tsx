import { useState } from 'react'
import { VFlex } from '../../custom/ym/styleStore';
import FeedProfile from '../FeedProfile';
import FeedPicture from './FeedPicture';
import FeedComment from './FeedComment';
import styled from 'styled-components';
import { PRIMARY_01, TITLE_5 } from '../../custom/ym/variables';
import TagList from './TagList';
import PlaceCard, { FeedCardData } from './PlaceCard';
import { imgPath } from '../../shared/path';
import useFeedDataCall from '../../hooks/useFeedDataCall';

type Prop = {
    // feedType: FeedApiPathType,
    children: number
}
const FeedContents = ({ children }: Prop) => {
    const [expand, setExpand] = useState<boolean>(false);
    const { data } = useFeedDataCall(children);

    const pic = imgPath.feedImg + data?.feedPic;
    const comment: string = data?.comment;
    const tags = data?.tags;

    const placeCardData: FeedCardData = {
        shopThumbnail: data?.shopThumbnail,
        shopName: data?.shopName,
        shopAddress: data?.shopAddress,
        isScrap: data?.isScrap,
        shopId: data?.shopId,
    }

    const expandButtonHandler = () => {
        setExpand(prev => !prev);
    }

    return (
        <VFlex gap='12px' etc='padding:20px;'>
            <FeedProfile profilePic={data?.profilePic} />
            <FeedPicture>{pic as string}</FeedPicture>
            <FeedComment isExpanded={expand}>{comment as string}</FeedComment>
            {comment?.length > 86
                ? <ExpandButton onClick={expandButtonHandler}>
                    <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
                </ExpandButton>
                : null
            }
            <TagList>{tags as string[]}</TagList>
            <PlaceCard dataset={placeCardData} />
        </VFlex>
    )
}

export default FeedContents;

const ExpandButton = styled.button`
    width: fit-content;
    padding: 0px;
    margin: 0px;
    border: none;
    background-color: transparent;
`
const ExpandText = styled.span`
    font-family: "Pretendard";
    font-size: ${TITLE_5.fontSize};
    font-weight: ${TITLE_5.fontWeight};
    line-height: ${TITLE_5.lineHeight};
    color: ${`#${PRIMARY_01}`};
`