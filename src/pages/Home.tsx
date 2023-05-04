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

    const [range, setRange] = useState(300);
    const [category, setCategory] = useState<categoryTypes | ''>('');
    const [list, setList] = useState<ShopData[] | null>(null);
    const [center, setCenter] = useState<Coordinate>(defaultCenter.center);
    // const [isMoving, setIsMoving] = useState<boolean>(false);
    const [isChanged, setIsChanged] = useState<boolean>(true);
    const [activeShop, setActiveShop] = useState<number>(0);
    const [markers, setMarkers] = useState<Markers[] | null[]>([]);
    const [search, setSearch] = useState<SearchedShop>({ shopLng: 0, shopLat: 0 });

    // 실시간 유저 위치
    const [userCoord, setUserCoord] = useState<Coordinate>({ lat: 37.5108407, lng: 127.0468975 });

    // 샵 위치
    const [shopCoord, setShopCoord] = useState<Coordinate[]>([]);

    const stateList = { list, userCoord, shopCoord, category, range, isChanged, activeShop, markers };
    const dispatchList = { setList, setRange, setCategory, setUserCoord, setShopCoord, setIsChanged, setActiveShop, setMarkers };
    const { data, mutate, isSuccess, isError, isLoading, mutateAsync } = useMapDataCall();

    //검색 페이지에서 받는 위도 경도
    const location = useLocation();
    let shopLng = 0;
    let shopLat = 0;

    const userTextSelectLimit = `
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    position: relative;
    overflow : hidden;
    `;

    /* HTTPS로 전환할 경우, 현재 사용자 위치 가져올 것 */
    // useEffect(() => {
    //     getRealtimeLocation(setUserCoord);
    //     setCenter(userCoord);
    // }, []);

    const convert = (data: ShopData[] | null[]) => {
        if (data) {
            return data?.map((element) => {
                return {
                    shopId: element?.shopId,
                    lat: element?.lat,
                    lng: element?.lng
                } as Markers;
            })
        } else return [null];
    }


    useEffect(() => {
        if (location.state) {
            shopLng = Number(location.state.lng);
            shopLat = Number(location.state.lat);
        }
        mutate({ lat: userCoord.lat, lng: userCoord.lng, range });
    }, []);


    /* 카테고리 버튼에 대한 데이터 리렌더링 */
    useEffect(() => {
        if (category) {
            setList(prev => {
                const searchResult = data?.filter(
                    (item: ShopData) => item.category === category);
                setMarkers(convert(searchResult));
                return searchResult;
            });
        } else {
            setList(data);
            setMarkers(convert(data));
        }
    }, [category]);


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