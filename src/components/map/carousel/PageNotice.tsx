import React from 'react'
import { HFlexSpaceBetween } from '../../../custom/ym/styleStore'
import SearchedCafe from './SearchedCafe'
import { BODY_5, ShopData } from '../../../custom/ym/variables'
import styled from 'styled-components'
import { colorSet } from '../../ui/styles/color'

const PageNotice = ({ arr, index }: { arr: ShopData[], index: number }) => {
    return (
        <HFlexSpaceBetween>
            <SearchedCafe arr={arr} />
            <CountBox>{index + 1}/{arr.length}</CountBox>
        </HFlexSpaceBetween>
    )
}

export default PageNotice;

const CountBox = styled.span`
    width : fit-content;
    font-size: ${BODY_5.fontSize};
    line-height: ${BODY_5.lineHeight};
    font-weight: ${BODY_5.fontWeight};
    color: ${colorSet.textMedium};
`;