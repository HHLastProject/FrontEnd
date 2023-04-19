import React, { ButtonHTMLAttributes, createContext, useContext, useEffect, useRef, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation, getUserLocation } from '../custom/jh/getUserLocation';
import data from "../datasample/data.json"
import { HFlex, HFlexSpaceBetween, PublicContainer, VFlex, VFlexCenter } from '../custom/ym/styleStore';
import styled from 'styled-components';
import MapHeader from '../components/map/MapHeader';
import CarouselBox from '../components/map/carousel/CarouselBox';
import { FILTER_LIST, LINE_MEDIUM, STRONG_MEDIUM, SAMPLE_DATA, ShopData } from '../custom/ym/variables';
import uuid from 'react-uuid';
import { MEDIUM } from '../custom/ym/variables';
import { Coordinate, categoryTypes } from '../custom/ym/types';
import useMapDataCall from '../hooks/useMapDataCall';
import { dispatches, states } from '../custom/ym/contextValues';
import CategoryButtonBar from '../components/map/CategoryButtonBar';


export interface EachData {
    shopId: number,
    category: string,
    shopName: string,
    thumbnail: string,
    region: string,
    distance: number,
    rate: number,
    reviews: number,
    lat: number,
    lng: number
}

export const StateContext = createContext(states);
export const DispatchContext = createContext(dispatches);

const Home = () => {

    const navermaps = useNavermaps();
    // const map = useMap();
    const [range, setRange] = useState(300);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<categoryTypes | ''>('');
    const [list, setList] = useState<(ShopData | null)[]>([]);
    const [center, setCenter] = useState<Coordinate>({ lat: 37.5108407, lng: 127.0468975 });

    // 실시간 유저 위치
    const [userCoord, setUserCoord] = useState<Coordinate>({ lat: 37.5108407, lng: 127.0468975 });

    // 샵 위치
    const [shopCoord, setShopCoord] = useState<Coordinate[]>([]);

    const stateList = { userCoord, shopCoord, category, range, list, center };
    const dispatchList = { setRange, setCategory, setList, setUserCoord, setShopCoord, setCenter };


    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/shop3.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const { data, mutate, isSuccess, isError, isLoading, mutateAsync } = useMapDataCall();

    const shopCoordList = (arr: ShopData[]) => {
        const result: Coordinate[] = arr?.map((item) => {
            return {
                lng: item.lng,
                lat: item.lat
            }
        })
        return result;
    }
    /* 비동기 처리를 위해 mutateAsync로 프로미스를 반환받고 state dispatch 진행 */
    useEffect(() => {
        console.log('실행되는중');
        console.log(center.lng, center.lat);
        mutateAsync({ lng: center.lng, lat: center.lat, range: range })
            .then((data) => {
                setList(data);
                setShopCoord(shopCoordList(data));
                console.log('새로바뀐 list :', list);
                console.log('새로바뀐 shopCoord:', shopCoord);
            });
    }, [range, center]);

    useEffect(() => {
        if (category) {
            setList(prev => {
                const searchResult = data?.filter(
                    (item: ShopData) => item.category === category);
                return searchResult;
            })
        } else {
            setList(data);
        }
    }, [category]);

    const aimClickListner = () => {
        setCenter(userCoord);
    }

    return (
        <VFlex etc='position: relative;'>
            <StateContext.Provider value={{ ...stateList }}>
                <DispatchContext.Provider value={{ ...dispatchList }}>
                    <VFlexCenter etc="min-width:390px; height:100%; flex:1;">
                        <MapHeader />
                        <MapModule />
                    </VFlexCenter>
                    <CategoryButtonBar />
                    <AimBtn onClick={aimClickListner}>
                        <Image src={`${process.env.PUBLIC_URL}/icon/current location_24.png`} alt="" />
                    </AimBtn>
                    <CarouselModule>
                        <CarouselBox />
                    </CarouselModule>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </VFlex>
    );
}

export default Home;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`;

const AimBtn = styled.button`
    position: absolute;
    bottom: 236px;
    z-index: 1;
    width: 40px;
    height : 40px;
    right: 35px;
    padding: 6px;
    border : none;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    background-color: white;
`;

const CarouselModule = styled.div`
    position: absolute;
    bottom: 0;
    width: 332px;
    height: 214px;
    /* padding : 20px; */
    padding-right: 0px;
    background-color: transparent;
`;
