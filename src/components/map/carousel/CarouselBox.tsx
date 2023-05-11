import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import uuid from 'react-uuid';
import SwiperCore from 'swiper';
import { MapProps } from '../../../custom/ym/types';
import ContentBox from './ContentBox';
import { filteredList } from '../../../custom/ym/carrouselFuncs';

const CarouselBox = ({ states, dispatches }: MapProps) => {
    const [now, setNow] = useState<number>(0);
    const [swiper, setSwiper] = useState<SwiperCore>();

    const { activeShop, category, list } = states;
    const { setActiveShop } = dispatches;


    useEffect(() => {
        list && setActiveShop(list[0] ? list[0].shopId : 0);
    }, [list]);

    useEffect(() => {
        list && setActiveShop(list.length > now ? list[now].shopId : 0);
    }, [now]);

    useEffect(() => {
        if (list) {
            const index = list?.findIndex((element) => element?.shopId === activeShop);
            swiper?.slideTo(index);
        }
    }, [activeShop]);

    return (
        <CarouselModule onClick={(e) => e.stopPropagation()}>
            <Swiper
                onSwiper={setSwiper}
                spaceBetween={8}
                slidesPerView={1}
                onRealIndexChange={swiper => setNow(swiper.realIndex)}
                parallax
            >
                {filteredList(list, category)?.map((item, index, arr) => {
                    if (!item) return null;
                    return (
                        <SwiperSlide key={uuid()}>
                            <ContentBox item={item} arr={arr} index={index} />
                        </SwiperSlide>
                    );
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





