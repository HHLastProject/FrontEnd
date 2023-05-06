import React, { createContext, useEffect, useReducer, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { VFlex, VFlexCenter } from '../custom/ym/styleStore';
import MapHeader from '../components/map/MapHeader';
import CarouselBox from '../components/map/carousel/CarouselBox';
import { ShopData } from '../custom/ym/variables';
import { Coordinate, categoryTypes } from '../custom/ym/types';
import useMapDataCall from '../hooks/useMapDataCall';
import { dispatches, states } from '../custom/ym/contextValues';
import CategoryButtonBar from '../components/map/CategoryButtonBar';
import { useLocation } from 'react-router-dom';
import { debounce } from '../custom/jh/debounce';
import { getUserLocation } from '../custom/jh/getUserLocation';
import { getRealtimeLocation } from '../custom/jh/getUserLocation';
import shopCoordList from '../custom/ym/shopCoordList';
import Loading from '../components/loading/Loading';
import Intro from '../components/home/Intro';


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

export interface CenterContextDefault {
    center: Coordinate,
    setCenter: React.Dispatch<React.SetStateAction<Coordinate>> | null
}

export interface ListContextDefault {
    list: ShopData[] | null,
    setList: React.Dispatch<React.SetStateAction<ShopData[] | null>> | null
}

export interface Markers {
    shopId: number,
    lat: number,
    lng: number,
}
export interface SearchedShop {
    shopLng: number,
    shopLat: number
}

const defaultCenter: CenterContextDefault = {
    center: {
        lat: 37.5108407,
        lng: 127.0468975
    },
    setCenter: null,
}

export const StateContext = createContext(states);
export const DispatchContext = createContext(dispatches);
export const CenterContext = createContext(defaultCenter);

const Home = () => {
    const [pass, setPass] = useState<boolean>(false);
    const [range, setRange] = useState(300);
    const [category, setCategory] = useState<categoryTypes | ''>('');
    const [list, setList] = useState<ShopData[] | null>(null);
    const [center, setCenter] = useState<Coordinate>(defaultCenter.center);
    const [isChanged, setIsChanged] = useState<boolean>(true);
    const [activeShop, setActiveShop] = useState<number>(0);
    const [markers, setMarkers] = useState<Markers[] | null[]>([]);

    // 실시간 유저 위치
    const [userCoord, setUserCoord] = useState<Coordinate>({ lat: 37.5108407, lng: 127.0468975 });

    // 샵 위치
    const [shopCoord, setShopCoord] = useState<Coordinate[]>([]);

    const stateList = { list, userCoord, shopCoord, category, range, isChanged, activeShop, markers };
    const dispatchList = { setList, setRange, setCategory, setUserCoord, setShopCoord, setIsChanged, setActiveShop, setMarkers };

    const userTextSelectLimit = `
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    position: relative;
    overflow : hidden;
    `;

    const lookaroundHandler = () => {
        localStorage.setItem("look_around", "true");
        setPass(true);
    }


    useEffect(() => {
        if (localStorage.getItem("access_token") || localStorage.getItem("look_around")) {
            setPass(true);
        }
    }, []);

    /*
    로그인 상태에 따라 Intro를 보일 것인지 말것인지 얼리 리턴
    */
    if (!pass) return <Intro dispatch={lookaroundHandler} />;

    return (
        <VFlex etc={userTextSelectLimit}>
            <StateContext.Provider value={{ ...stateList }}>
                <DispatchContext.Provider value={{ ...dispatchList }}>
                    <CenterContext.Provider value={{ center, setCenter }}>
                        <VFlexCenter etc="min-width:390px; height:100%; flex:1;">
                            <MapHeader />
                            <MapModule />
                        </VFlexCenter>
                        <CategoryButtonBar />
                        <CarouselBox />
                    </CenterContext.Provider>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </VFlex>
    );
}

export default Home;