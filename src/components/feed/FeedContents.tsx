import React, { useState } from 'react'
import { mypageData } from '../../custom/ym/dummydata';
import moment from 'moment';
import { VFlex } from '../../custom/ym/styleStore';
import FeedProfile from '../FeedProfile';
import FeedPicture from './FeedPicture';
import FeedComment from './FeedComment';
import styled from 'styled-components';
import { PRIMARY_01, TITLE_5 } from '../../custom/ym/variables';
import TagList from './TagList';
import PlaceCard from './PlaceCard';
type Prop = {
    children: number
}
const FeedContents = ({ children }: Prop) => {

    const [expand, setExpand] = useState<boolean>(false);
    const { nickname, profilePic, feeds } = mypageData;
    const createAt = new Date(2023, 4, 13);

    const date = moment(createAt).format('YYYY.MM.DD');
    const pic = feeds[children]?.feedPic;
    const comment = feeds[children]?.comment;
    const tags = feeds[children]?.tags;

    const expandButtonHandler = () => {
        setExpand(prev => !prev);
    }

    return (
        <VFlex gap='12px' etc='padding:20px;'>
            <FeedProfile />
            <FeedPicture>{pic as string}</FeedPicture>
            <FeedComment isExpanded={expand}>{comment as string}</FeedComment>
            <ExpandButton onClick={expandButtonHandler}>
                <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
            </ExpandButton>
            <TagList>{tags}</TagList>
            <PlaceCard />
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