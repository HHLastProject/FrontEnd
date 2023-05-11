import React from 'react'
import styled from 'styled-components';
import { ShopData } from '../../../custom/ym/variables';
import { imgPath } from '../../../shared/path';
import { toggleScrap } from '../../../custom/ym/carrouselFuncs';
import { useNavigate } from 'react-router-dom';
import useScrapToggle from '../../../hooks/useScrapToggle';
import { Buttons } from '../../ui/element/buttons/Buttons';

const ContentsThumbnail = ({ item }: { item: ShopData }) => {
    const navi = useNavigate();
    const { mutate } = useScrapToggle();
    return (
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
    )
}

export default ContentsThumbnail;

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