import React, { useEffect, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { VFlex, VFlexCenter } from '../custom/ym/styleStore';
import CarouselBox from '../components/map/carousel/CarouselBox';
import { ShopData, defaultCenter, userTextSelectLimit } from '../custom/ym/variables';
import { Coordinate, MapDispatches, MapStates, categoryTypes } from '../custom/ym/types';
import CategoryButtonBar from '../components/map/CategoryButtonBar';
import Intro from '../components/home/Intro';
import { Headers } from '../components/ui/element/headers/Headers';

const Home = () => {
    const [pass, setPass] = useState<boolean>(false);
    const [activeShop, setActiveShop] = useState<number>(0);
    const [category, setCategory] = useState<categoryTypes | ''>('');
    const [center, setCenter] = useState<Coordinate>(defaultCenter.center);
    const [list, setList] = useState<ShopData[]>([]);
    const [range, setRange] = useState(300);

    const stateList: MapStates = { activeShop, category, center, list, range };
    const dispatchList: MapDispatches = { setList, setRange, setCategory, setActiveShop, setCenter };


    const lookaroundHandler = () => {
        localStorage.setItem("look_around", "true");
        setPass(true);
    }


    /* 처음 진입 시, 둘러보기인지 로그인상태인지에 따라 처리 */
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
    로그인 상태에 따라 Intro를 보일지말지 Early return
    */
    if (!pass) return <Intro dispatch={lookaroundHandler} />;

    return (
        <VFlex etc={userTextSelectLimit}>
            <VFlexCenter etc="min-width:390px; height:100%; flex:1;">
                <Headers.MapHeader range={range} />
                <MapModule states={stateList} dispatches={dispatchList} />
            </VFlexCenter>
            <CategoryButtonBar category={category} setCategory={setCategory} />
            <CarouselBox states={stateList} dispatches={dispatchList} />
        </VFlex>
    );
}

export default Home;