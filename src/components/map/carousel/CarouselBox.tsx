import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { HFlex, HFlexSpaceBetween, VFlex, VFlexCenter } from '../../../custom/ym/styleStore';
import { DispatchContext, EachData, StateContext } from '../../../pages/Home';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import uuid from 'react-uuid';
import { ShopData } from '../../../custom/ym/variables';
import { dispatches, states } from '../../../custom/ym/contextValues';
import { apiPath, imgPath } from '../../../shared/path';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { keys, mapQueryKeys } from '../../../apis/queries';
import { api_token } from '../../../shared/api';
import SwiperCore from 'swiper';

type CarouselProps = {
    children: (ShopData | null)[]
}
// const CarouselBox = ({ children }: CarouselProps) => {
const CarouselBox = () => {
    const queryClient = useQueryClient();
    const navi = useNavigate();
    const openDetail = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, shopId: number) => {
        e.stopPropagation();
        navi(`/shop/${shopId}`);
    }
    const [now, setNow] = useState<number>(0);
    const [swiper, setSwiper] = useState<SwiperCore>();
    // const swiper = useSwiper();
    // console.log('인덱스', swiper.realIndex);
    // console.log(swiper);

    const { list, activeShop } = useContext(StateContext);
    const { setIsChanged, setActiveShop } = useContext(DispatchContext);
    const { mutate } = useMutation({
        mutationKey: keys.PUT_TOGGLE_BOOKMARK,
        mutationFn: async (payload: number) => {
            console.log("payload:", payload);
            console.log('경로:', `/api/${payload}/scrap`);
            const res = await api_token.put(`/api/${payload}/scrap`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(mapQueryKeys.POST_SHOPS_IN_RANGE);
            console.log("즐겨찾기 변경 성공");
        },
        onError: (error) => {
            throw error;
        }
    })

    const toggleScrap = React.useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>, item: ShopData) => {
        e.stopPropagation();

        const result = mutate(item.shopId);
        const dispatchIsChanged = setIsChanged as React.Dispatch<React.SetStateAction<boolean>>;
        dispatchIsChanged(prev => !prev);
    }, []);

    const convertAddress = (text: string) => {
        const stringData = text.replace("경기도 ", "").replace("특별", "").split(" ");
        return stringData[0].replace("시", "") + " " + stringData[1];
    }

    useEffect(() => {
        const activeChange = setActiveShop as React.Dispatch<React.SetStateAction<number>>;
        activeChange(list[0]?.shopId as number);
    }, []);
    useEffect(() => {
        const activeChange = setActiveShop as React.Dispatch<React.SetStateAction<number>>;
        activeChange(list[now]?.shopId as number);
    }, [now]);

    useEffect(() => {
        const index = list?.findIndex((element) => element?.shopId === activeShop);
        swiper?.slideTo(index);
    }, [activeShop])

    return (
        <CarouselModule onClick={(e) => e.stopPropagation()}>
            <Swiper
                onSwiper={setSwiper}
                spaceBetween={8}
                slidesPerView={1}
                onRealIndexChange={swiper => setNow(swiper.realIndex)}
                parallax
            >
                {list?.map((item, index) => {
                    if (!item) return null;
                    return <SwiperSlide key={uuid()}>
                        <Box onClick={(e) => openDetail(e, item.shopId)}>
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
                                                ? <Thumbnail onClick={(e) => toggleScrap(e, item)} src={`${process.env.PUBLIC_URL}/icon/bookmark checked.png`} alt="즐겨찾기 제거"></Thumbnail>
                                                : <Thumbnail onClick={(e) => toggleScrap(e, item)} src={`${process.env.PUBLIC_URL}/icon/book mark white_28.png`} alt="즐겨찾기 추가"></Thumbnail>}
                                        </Bookmark>
                                    </PictureDiv>
                                    <VFlex>
                                        <ShopName>{item.shopName}</ShopName>
                                        <Region>{convertAddress(item.address)}</Region>
                                        <Summary>{`${item.distance} m | 피드 ${item.feedCount}`}</Summary>
                                        {/* <Summary>{(item as ShopData).distance} m | 피드 {(item as ShopData).reviews}</Summary> */}
                                    </VFlex>
                                </HFlex>
                            </VFlex>
                        </Box>
                    </SwiperSlide>;
                })}
            </Swiper>
        </CarouselModule>
    )
}

export default CarouselBox;

const CarouselModule = styled.div`
    position: absolute;
    bottom: 0;
    width: 332px;
    height: 214px;
    padding-left : 20px;
    padding-right: 0px;
    background-color: transparent;
`;

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
    -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
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
`;