import React from 'react'
import styled from 'styled-components';
import { VFlexCenter } from '../../custom/ym/styleStore';
import { mypageData } from '../../custom/ym/dummydata';
import { EachFeed } from '../../pages/Mypage';

const PlaceBookMark = () => {
    const { shopThumbnail } = mypageData.feeds[2] as EachFeed;
    return (
        <Box>
            <VFlexCenter>
                <IconBox>
                    <Image src={shopThumbnail} alt="" />
                </IconBox>
            </VFlexCenter>
        </Box>
    )
}

export default PlaceBookMark;

const Box = styled.div`
    width: 60px;
    height: 60px;
    border: none;
    background-color: transparent;
`
const IconBox = styled.div`
    width: 28px;
    height: 28px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`