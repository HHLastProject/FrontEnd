import React from 'react'
import { HFlex, VFlex } from '../../../custom/ym/styleStore'
import { ShopData } from '../../../custom/ym/variables'
import { convertAddress, toggleScrap } from '../../../custom/ym/carrouselFuncs'
import { useNavigate } from 'react-router-dom'
import useScrapToggle from '../../../hooks/useScrapToggle'
import { imgPath } from '../../../shared/path'
import styled from 'styled-components'
import { Buttons } from '../../ui/element/buttons/Buttons'
import { colorSet } from '../../ui/styles/color'

const CarouselBoxContents = ({ item }: { item: ShopData }) => {
    const navi = useNavigate();
    const { mutate } = useScrapToggle();

    return (
        <HFlex gap='8px'>
            <PictureDiv pic={`${imgPath.shopThumbnailImg + item.thumbnail}`}>
                <Bookmark>
                    {item.isScrap
                        ? <Buttons.Others.IconButton
                            width={28}
                            height={28}
                            fileName='bookmark checked.png'
                            onClick={(e) => toggleScrap(e, item, mutate, navi)}
                        />
                        : <Buttons.Others.IconButton
                            width={28}
                            height={28}
                            fileName='book mark white_28.png'
                            onClick={(e) => toggleScrap(e, item, mutate, navi)}
                        />
                    }
                </Bookmark>
            </PictureDiv>
            <VFlex>
                <ShopName>{item.shopName}</ShopName>
                <Region>{convertAddress(item.address)}</Region>
                <Summary>{`${item.distance} m | 피드 ${item.feedCount}`}</Summary>
            </VFlex>
        </HFlex>
    )
}

export default CarouselBoxContents;

const Bookmark = styled.div`
    position: absolute;
    width: 28px;
    height: 28px;
    padding: 0;
    bottom: 9px;
    right: 11px;
    background-color: transparent;
    border:none;
`

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

const PictureDiv = styled.div<{ pic: string }>`
    position: relative;
    flex : none;
    width: 112px;
    height: 112px;
    border-radius: 5px;
    background-image: url(${({ pic }) => pic});
    background-repeat: no-repeat;
    background-size: cover;
`;