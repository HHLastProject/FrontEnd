import React, { useContext } from 'react'
import { context } from '../../pages/Mypage'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import styled from 'styled-components';
import { TITLE_3 } from '../../custom/ym/variables';
import FeedCount from './FeedCount';
import FeedPictures from './FeedPictures';
import FeedSet from './FeedSet';
import NoMyFeeds from './NoMyFeeds';

const MyFeeds = () => {
    const contextData = useContext(context);
    const feedCount = contextData?.props?.feedCount as number;
    const feeds = contextData?.props?.feeds;

    console.log('props:', contextData?.props);

    return (
        <VFlex gap='12px'>
            <FeedSet>{feedCount}</FeedSet>
            {feedCount > 0
                ? <FeedPictures isAll={false}>{feeds}</FeedPictures>
                : <NoMyFeeds />
            }
        </VFlex>
    )
}

export default MyFeeds;

