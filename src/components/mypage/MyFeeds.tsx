import React, { useContext } from 'react'
import { context } from '../../pages/Mypage'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import styled from 'styled-components';
import { TITLE_3 } from '../../custom/ym/variables';
import FeedCount from './FeedCount';
import FeedPictures from './FeedPictures';

const MyFeeds = () => {
    const contextData = useContext(context);
    const feedCount = contextData?.props?.feedCount;
    const feeds = contextData?.props?.feeds;

    return (
        <VFlex gap='12px'>
            <HFlex gap='4px'>
                <Title>나의 피드</Title>
                <FeedCount>{feedCount}</FeedCount>
            </HFlex>
            <FeedPictures>{feeds}</FeedPictures>
        </VFlex>
    )
}

export default MyFeeds;

const Title = styled.span`
    font-size: ${TITLE_3.fontSize};
    line-height: ${TITLE_3.lineHeight};
    font-weight: ${TITLE_3.fontWeight};
    color: ${TITLE_3.color};
`