import React from 'react'
import { VFlex } from '../../custom/ym/styleStore'
import { mypageData } from '../../custom/ym/dummydata'
import { EachFeed } from '../../pages/Mypage'
import styled from 'styled-components'
import { B14, BODY_3, MEDIUM, TITLE_5 } from '../../custom/ym/variables'

const PlaceNameCard = ({ shopName, shopAddress }: { shopName?: string, shopAddress?: string }) => {
    const split = shopAddress?.split(" ");
    let modifiedAddress: string = "";

    if (split !== undefined) {
        modifiedAddress = split[0].split("시")[0] + " " + split[1];
    }

    return (
        <VFlex etc='flex:1;font-family : "Pretendard"; padding-left: 16px;'>
            <ShopName>{shopName}</ShopName>
            <ShopAddress>{modifiedAddress}</ShopAddress>
        </VFlex>
    )
}

export default PlaceNameCard;

const ShopName = styled.span`
    font-size: ${TITLE_5.fontSize};
    line-height: ${TITLE_5.lineHeight};
    font-weight: ${TITLE_5.fontWeight};
    color: ${`#${TITLE_5.color}`};
`

const ShopAddress = styled.span`
    font-size: ${BODY_3.fontSize};
    line-height: ${BODY_3.lineHeight};
    font-weight: ${BODY_3.fontWeight};
    color: ${`#${MEDIUM}`};
`