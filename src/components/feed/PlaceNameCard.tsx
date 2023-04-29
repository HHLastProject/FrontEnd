import React from 'react'
import { VFlex } from '../../custom/ym/styleStore'
import styled from 'styled-components'
import { BODY_3, MEDIUM, TITLE_5 } from '../../custom/ym/variables'


interface NameCardProps extends React.ComponentPropsWithRef<'div'> {
    shopName?: string,
    shopAddress?: string,
    onClick: React.MouseEventHandler<HTMLDivElement>,
}

const PlaceNameCard = ({ shopName, shopAddress, onClick }: NameCardProps) => {
    const split = shopAddress?.split(" ");
    let modifiedAddress: string = "";

    if (split !== undefined) {
        if (split[0] === '서울특별시') {
            modifiedAddress = split[0].split("특별시")[0] + " " + split[1];
        } else {
            modifiedAddress = split[0].split("시")[0] + " " + split[1];
        }
    }

    return (
        <VFlex etc='cursor: pointer; flex:1;font-family : "Pretendard"; padding-left: 16px;' onClick={onClick}>
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