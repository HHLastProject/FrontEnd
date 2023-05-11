import React from 'react'
import { HFlex, VFlex } from '../../../../custom/ym/styleStore'
import styled from 'styled-components';
import { BODY_5, TITLE_3 } from '../../../../custom/ym/variables';
import { colorSet } from '../../styles/color';

const MapHeaderLeftSide = ({ range }: { range: number }) => {
    return (
        <VFlex height="fit-content" etc='flex:1;' width={'fit-content'}>
            <AroundSpan>내 주변</AroundSpan>
            <HFlex height='fit-content' gap='2px'>
                <RangeSpan>{range !== 0 ? `${range}m` : '다른 지역'}</RangeSpan>
                <HeaderTextMedium>의 카페</HeaderTextMedium>
            </HFlex>
        </VFlex>
    )
}

export default MapHeaderLeftSide;

const AroundSpan = styled.span`
    font-size: ${BODY_5.fontSize};
    line-height: ${BODY_5.lineHeight};
    font-weight: ${BODY_5.fontWeight};
    color: ${colorSet.textStrong};
    margin: 0px;
    padding: 0px;
`

const RangeSpan = styled.span`
    font-size: ${TITLE_3.fontSize};
    line-height: ${TITLE_3.lineHeight};
    font-weight: ${TITLE_3.fontWeight};
    color: ${colorSet.primary_02};
    margin: 0px;
    padding: 0px;
`

const HeaderTextMedium = styled.span`
    font-size : ${TITLE_3.fontWeight};
    line-height: ${TITLE_3.lineHeight};
    font-weight: ${TITLE_3.fontWeight};
    color : ${colorSet.textStrong};
    margin: 0px;
    padding: 0px;
`