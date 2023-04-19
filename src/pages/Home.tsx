import React, { createContext, useEffect, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { Container as MapDiv, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation, getUserLocation } from '../custom/jh/getUserLocation';
import { VFlex, VFlexCenter } from '../custom/ym/styleStore';
import styled from 'styled-components';
import MapHeader from '../components/map/MapHeader';
import CarouselBox from '../components/map/carousel/CarouselBox';
import { MapCoordPayload, ShopData } from '../custom/ym/variables';
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

    const [range, setRange] = useState(300);
    const [category, setCategory] = useState<categoryTypes | ''>('');
    const [list, setList] = useState<(ShopData | null)[]>([]);
    const [center, setCenter] = useState<Coordinate>({ lat: 37.5108407, lng: 127.0468975 });
    const [isMoving, setIsMoving] = useState<boolean>(false);

    // 실시간 유저 위치
    const [userCoord, setUserCoord] = useState<Coordinate>({ lat: 37.5108407, lng: 127.0468975 });

    // 샵 위치
    const [shopCoord, setShopCoord] = useState<Coordinate[]>([]);

    const stateList = { userCoord, shopCoord, category, range, list, center, isMoving };
    const dispatchList = { setRange, setCategory, setList, setUserCoord, setShopCoord, setCenter, setIsMoving };

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

    const a = "경기도 수원시 권선구 ㅇㅇ로";
    const b = a.replace('경기도 ', "");
    console.log(b);
    /* 비동기 처리를 위해 mutateAsync로 프로미스를 반환받고 state dispatch 진행 */
    useEffect(() => {
        const newPayload = { lng: center.lng, lat: center.lat, range: range };
        mutateAsync(newPayload)
            .then((data) => {
                setList(data);
                setShopCoord(shopCoordList(data));
                setIsMoving(false);
            });
    }, [range, center]);

    /* 카테고리 버튼에 대한 데이터 리렌더링 */
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

    return (
        <VFlex etc='position: relative;'>
            <StateContext.Provider value={{ ...stateList }}>
                <DispatchContext.Provider value={{ ...dispatchList }}>
                    <VFlexCenter etc="min-width:390px; height:100%; flex:1;">
                        <MapHeader />
                        <MapModule />
                    </VFlexCenter>
                    <CategoryButtonBar />
                    <CarouselModule>
                        <CarouselBox />
                    </CarouselModule>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </VFlex>
    );
}

export default Home;

const CarouselModule = styled.div`
    position: absolute;
    bottom: 0;
    width: 332px;
    height: 214px;
    /* padding : 20px; */
    padding-right: 0px;
    background-color: transparent;
`;
