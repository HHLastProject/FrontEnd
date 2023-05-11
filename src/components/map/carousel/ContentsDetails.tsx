import React from 'react'
import styled from 'styled-components';
import { VFlex } from '../../../custom/ym/styleStore';
import { ShopData } from '../../../custom/ym/variables';
import { convertAddress } from '../../../custom/ym/carrouselFuncs';
import { colorSet } from '../../ui/styles/color';

const ContentsDetails = ({ item }: { item: ShopData }) => {
    return (
        <VFlex>
            <ShopName>{item.shopName}</ShopName>
            <Region>{convertAddress(item.address)}</Region>
            <Summary>{`${item.distance} m | 피드 ${item.feedCount}`}</Summary>
        </VFlex>
    )
}

export default ContentsDetails;

const Summary = styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: ${colorSet.textMedium};
`;

const Region = styled.span`
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${colorSet.textMedium};
`;

const ShopName = styled.span`
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color:${colorSet.textStrong};
`;