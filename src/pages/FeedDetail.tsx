import React from 'react'
import { useParams } from 'react-router-dom'
import { mypageData } from '../custom/ym/dummydata';
import HeaderBack from '../components/HeaderBack';
import styled from 'styled-components';
import FeedContents from '../components/feed/FeedContents';

const FeedDetail = () => {
    const { feedId } = useParams();
    const id = parseInt(feedId as string);

    return (
        <FeedDetailContainer>
            <HeaderBack />
            <FeedContents>{id}</FeedContents>
        </FeedDetailContainer>
    )
}

export default FeedDetail;

const FeedDetailContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
`