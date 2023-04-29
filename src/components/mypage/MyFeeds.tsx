import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../pages/Mypage'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import styled from 'styled-components';
import { TITLE_3 } from '../../custom/ym/variables';
import FeedCount from './FeedCount';
import FeedPictures from './FeedPictures';
import FeedSet from './FeedSet';
import NoMyFeeds from './NoMyFeeds';
import useMypage from '../../hooks/useMypage';
import { ReceivedFeed } from '../../custom/ym/types';

const MyFeeds = () => {
    const contextData = useContext(context);
    const [feeds, setFeeds] = useState<ReceivedFeed[]>();
    const [feedCount, setFeedCount] = useState<number>();
    // const feedCount = contextData?.props?.feedCount as number;
    // const feeds = contextData?.props?.feeds;
    const { data } = useMypage();
    console.log('props:', contextData?.props);

    useEffect(() => {
        if (data) {
            setFeeds(data?.feeds as ReceivedFeed[]);
            setFeedCount(data?.feedCount)
        }
    }, []);

    return (
        <VFlex gap='12px'>
            {
                typeof feedCount === "number"
                    ? <FeedSet>{feedCount}</FeedSet>
                    : null
            }
            {
                feedCount as number > 0
                    ? <FeedPictures isAll={false}>{feeds}</FeedPictures>
                    : <NoMyFeeds />
            }
        </VFlex>
    )
}

export default MyFeeds;

