import React from 'react'
import styled from 'styled-components';
import { mypageData } from '../../custom/ym/dummydata';
import { EachFeed } from '../../pages/Mypage';

const PlacePicture = ({shopThumbnail} : {shopThumbnail?: string}) => {
    if(!shopThumbnail) {
        let dumi = mypageData.feeds[2] as EachFeed;
        shopThumbnail = dumi.shopThumbnail;
    }
    return (
        <PictureSize>
            <Picture src={shopThumbnail} alt="" />
        </PictureSize>
    )
}

export default PlacePicture;
const PictureSize = styled.div`
    width: 60px;
    height: 60px;
    flex : none;
`
const Picture = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`