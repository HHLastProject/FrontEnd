import React, { useContext } from 'react'
import HeaderBack from '../components/HeaderBack';
import { VFlex } from '../custom/ym/styleStore';
import FeedSet from '../components/mypage/FeedSet';
import { mypageData } from '../custom/ym/dummydata';
import FeedPictures from '../components/mypage/FeedPictures';
import styled from 'styled-components';
import { context } from './Mypage';
import { useParams } from 'react-router-dom';

const AllFeeds = () => {

    const param = useParams();
    const { userId } = param;
    const temp = parseInt(userId as string);

    return (
        <AllfeedContainer>
            <HeaderBack />
            <ContentsContainer>
                <VFlex gap='12px'>
                    <FeedSet>{temp}</FeedSet>
                    {/* <FeedSet>{2}</FeedSet> */}
                    <FeedPictures isAll={true}>{mypageData.feeds}</FeedPictures>
                </VFlex>
            </ContentsContainer>
        </AllfeedContainer>
    )
}

export default AllFeeds;

const AllfeedContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
`
const ContentsContainer = styled.div`
    padding : 20px;
`