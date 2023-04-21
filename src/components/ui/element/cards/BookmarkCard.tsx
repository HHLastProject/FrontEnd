import React from 'react'
import { HFlex, VFlex } from '../../../../custom/ym/styleStore'
import styled from 'styled-components';
import { BODY_3, TITLE_3 } from '../../../../custom/ym/variables';
import { colorSet } from '../../styles/color';
import { BookmarkChildren } from '../../../../custom/ym/types';
import { useNavigate } from 'react-router-dom';
import { imgPath } from '../../../../shared/path';

const BookmarkCard = ({ data }: BookmarkChildren) => {

    const navi = useNavigate();

    const divClickHandler = () => {
        navi(`/shop/${data.shopId}`)
    }

    const convertAddress = (text: string) => {
        const stringData = text.replace("경기도 ", "").replace("특별", "").split(" ");
        return stringData[0].replace("시", "") + " " + stringData[1];
    }

    return (
        <HFlex gap='8px' height={'fit-content'} onClick={divClickHandler}>
            <ThumbnailFrame>
                <Thumbnail src={imgPath.shopThumbnailImg + data.thumbnail} alt={data.shopName} />
            </ThumbnailFrame>
            <VFlex height='100px' etc='align-items:base-line;'>
                <ShopName>{data.shopName}</ShopName>
                <ShopSummary>{convertAddress(data.address)}</ShopSummary>
                <ShopSummary>피드 {data.feedCount}</ShopSummary>
            </VFlex>
        </HFlex>
    )
}

export default BookmarkCard;

const ThumbnailFrame = styled.div`
    width: 100px;
    height: 100px;
    flex : none;
`

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ShopName = styled.span`
    font-size: ${TITLE_3.fontSize};
    font-weight: ${TITLE_3.fontWeight};
    line-height: ${TITLE_3.lineHeight};
    color : ${colorSet.textStrong};
`

const ShopSummary = styled.span`
    font-size: ${BODY_3.fontSize};
    font-weight: ${BODY_3.fontWeight};
    line-height: ${BODY_3.lineHeight};
    color:${colorSet.textMedium};
`