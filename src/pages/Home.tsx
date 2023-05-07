import React, { createContext, useEffect, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { VFlex, VFlexCenter } from '../custom/ym/styleStore';
import MapHeader from '../components/map/MapHeader';
import CarouselBox from '../components/map/carousel/CarouselBox';
import { ShopData, defaultCenter } from '../custom/ym/variables';
import { Coordinate, MapDispatches, MapStates, categoryTypes } from '../custom/ym/types';
import { dispatches, states } from '../custom/ym/contextValues';
import CategoryButtonBar from '../components/map/CategoryButtonBar';
import Intro from '../components/home/Intro';

const Home = () => {
    const [pass, setPass] = useState<boolean>(false);

    const [activeShop, setActiveShop] = useState<number>(0);
    const [category, setCategory] = useState<categoryTypes | ''>('');
    const [center, setCenter] = useState<Coordinate>(defaultCenter.center);
    const [list, setList] = useState<ShopData[]>([]);
    const [range, setRange] = useState(300);

    const stateList: MapStates = { activeShop, category, center, list, range };
    const dispatchList: MapDispatches = { setList, setRange, setCategory, setActiveShop, setCenter };

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
            <VFlexCenter etc="min-width:390px; height:100%; flex:1;">
                <MapHeader range={range} />
                <MapModule states={stateList} dispatches={dispatchList} />
            </VFlexCenter>
            <CategoryButtonBar category={category} setCategory={setCategory} />
            <CarouselBox states={stateList} dispatches={dispatchList} />
        </VFlex>
    );
}

export default Home;