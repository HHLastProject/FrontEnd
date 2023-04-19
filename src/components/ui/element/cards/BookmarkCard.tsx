import React from 'react'
import { HFlex, VFlex } from '../../../../custom/ym/styleStore'
import styled from 'styled-components';
import { BODY_3, TITLE_3 } from '../../../../custom/ym/variables';
import { colorSet } from '../../styles/color';
import { BookmarkChildren } from '../../../../custom/ym/types';
import { useNavigate } from 'react-router-dom';

const BookmarkCard = ({ data }: BookmarkChildren) => {

    const navi = useNavigate();

    const divClickHandler = () => {
        navi(`/shop/${data.shopId}`)
    }

    return (
        <HFlex gap='8px' height={'fit-content'} onClick={divClickHandler}>
            <ThumbnailFrame>
                <Thumbnail src={data.thumbnail} alt={data.shopName} />
            </ThumbnailFrame>
            <VFlex height='100px' etc='align-items:base-line;'>
                <ShopName>{data.shopName}</ShopName>
                <ShopSummary>{data.region}</ShopSummary>
                <ShopSummary>피드 {data.reviews}</ShopSummary>
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