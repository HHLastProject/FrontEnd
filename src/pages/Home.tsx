import React, { createContext, useEffect, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { VFlex, VFlexCenter } from '../custom/ym/styleStore';
import MapHeader from '../components/map/MapHeader';
import CarouselBox from '../components/map/carousel/CarouselBox';
import { ShopData, defaultCenter } from '../custom/ym/variables';
import { Coordinate, Markers, categoryTypes } from '../custom/ym/types';
import { dispatches, states } from '../custom/ym/contextValues';
import CategoryButtonBar from '../components/map/CategoryButtonBar';
import Intro from '../components/home/Intro';

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
        // if (!(!localStorage.getItem("access_token")) && !(!localStorage.getItem("look_around"))) {
        if (localStorage.getItem("access_token") && localStorage.getItem("look_around")) {
            localStorage.removeItem("look_around");
        }
        if (localStorage.getItem("access_token") || localStorage.getItem("look_around")) {
            setPass(true);
        } else {
            localStorage.removeItem("look_around");
            setPass(false);
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