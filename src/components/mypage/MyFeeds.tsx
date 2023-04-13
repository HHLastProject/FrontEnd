import React, { useContext } from 'react'
import { context } from '../../pages/Mypage'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import styled from 'styled-components';
import { TITLE_3 } from '../../custom/ym/variables';
import FeedCount from './FeedCount';
import FeedPictures from './FeedPictures';
import FeedSet from './FeedSet';

const MyFeeds = () => {
    const contextData = useContext(context);
    const feedCount = contextData?.props?.feedCount;
    const feeds = contextData?.props?.feeds;

    return (
        <VFlex gap='12px'>
            <FeedSet>{feedCount}</FeedSet>
            <FeedPictures isAll={false}>{feeds}</FeedPictures>
        </VFlex>
    )
}

export default MyFeeds;

