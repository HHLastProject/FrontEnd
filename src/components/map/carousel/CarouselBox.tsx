import React, { useContext } from 'react'
import styled from 'styled-components';
import { HFlex, HFlexSpaceBetween, VFlex, VFlexCenter } from '../../../custom/ym/styleStore';
import { EachData, StateContext } from '../../../pages/Home';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import uuid from 'react-uuid';
import { ShopData } from '../../../custom/ym/variables';
import { states } from '../../../custom/ym/contextValues';
import { imgPath } from '../../../shared/path';

type CarouselProps = {
    children: (ShopData | null)[]
}
// const CarouselBox = ({ children }: CarouselProps) => {
const CarouselBox = () => {
    const navi = useNavigate();
    const openDetail = (shopId: number) => {
        navi(`/shop/${shopId}`);
    }
    const swiper = useSwiper();

    // swiper.translateTo(300, 1000);

    const { range, category, list, userCoord, shopCoord } = useContext(StateContext);

    console.log('list:', list);
    return (
        <Swiper
            spaceBetween={8}
            slidesPerView={1}
            parallax
        >
            {list?.map((item, index) => {
                if (!item) return null;
                return <SwiperSlide key={uuid()}>
                    <Box onClick={() => openDetail((item as ShopData).shopId)}>
                        <VFlex>
                            <HFlexSpaceBetween>
                                <div style={{ fontSize: '12px', fontWeight: '400' }}>
                                    <span>검색된 식당</span>
                                    <span> {list.length}</span>
                                </div>
                                <CountBox>
                                    <VFlexCenter>
                                        {index + 1} / {list.length}
                                    </VFlexCenter>
                                </CountBox>
                            </HFlexSpaceBetween>
                            <HFlex gap='8px'>
                                <PictureDiv pic={`${imgPath.shopThumbnailImg + item.thumbnail}`}>
                                    <Bookmark>
                                        {item.isScrap
                                            ? <Thumbnail src={`${process.env.PUBLIC_URL}/icon/book mark white_28.png`} alt="즐겨찾기 추가"></Thumbnail>
                                            : <Thumbnail src={`${process.env.PUBLIC_URL}/icon/book mark line_28.png`} alt="즐겨찾기 제거"></Thumbnail>}
                                    </Bookmark>
                                </PictureDiv>
                                <VFlex>
                                    <ShopName>{(item).shopName}</ShopName>
                                    <Region>{(item).address}</Region>
                                    <Summary>{`${item.distance} m | 피드 ${item.feedCount}`}</Summary>
                                    {/* <Summary>{(item as ShopData).distance} m | 피드 {(item as ShopData).reviews}</Summary> */}
                                </VFlex>
                            </HFlex>
                        </VFlex>
                    </Box>
                </SwiperSlide>;
            })}
        </Swiper>
    )
}

export default CarouselBox;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Box = styled.div`
    width: 300px;
    height: 142px;
    padding: 16px;
    border: none;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15), 0px 2px 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background-color: white;
`;

const Summary = styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: #717176;
`;

const Region = styled.span`
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #717176;
`;

const ShopName = styled.span`
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color:#191919;
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

const CountBox = styled.span`
    background-color: #909096;
    border-radius: 8px;
    padding: 3px 8px;
    width : fit-content;
    height : 22px;
    font-size: 12px;
    color : white;
`;
const Bookmark = styled.button`
    position: absolute;
    width: 28px;
    height: 28px;
    padding: 0;
    bottom: 9px;
    right: 11px;
    background-color: transparent;
    border:none;
    color: white;
    filter: contrast(0) brightness(100);
`;