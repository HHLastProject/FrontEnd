import React, { useEffect, useMemo, useState } from 'react';
import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import uuid from 'react-uuid';
import { activeIcon, defaultCenter, icon } from '../../custom/ym/variables';
import styled from 'styled-components';
import makeArrayForCluster from '../../hooks/makeArrayForCluster';
import { useLocation } from 'react-router-dom';
import { GuInformation } from '../../shared/guCoordInform';
import useMapDataCall from '../../hooks/useMapDataCall';
import { Buttons } from '../ui/element/buttons/Buttons';
import { Coordinate, MapProps } from '../../custom/ym/types';
import { createClusterMarkerIcon } from '../../custom/ym/clusterFuncs';
import Error from '../../pages/Error';
import rangeRefresh from '../../custom/ym/rangeRefresh';
import reMutate from '../../custom/ym/reMutate';
import saveCenterInLocalStorage from '../../custom/ym/saveCenterInLocalStorage';
import changeListbyCategory from '../../custom/ym/changeListbyCategory';
import { aimClickHandler } from '../../custom/ym/mapFuncs';
import useGetGuList from '../../hooks/useGetGooList';

const MapModule = ({ states, dispatches }: MapProps) => {
    const navermaps = useNavermaps();

    const [zoom, setZoom] = useState<number>(17);
    const [map, setMap] = useState<naver.maps.Map | null>(null);
    const [prevPos, setPrevPos] = useState<Coordinate>(defaultCenter.center);

    const { range, activeShop, category, list, center } = states;
    const { setRange, setActiveShop, setList, setCenter } = dispatches;
    const { data, mutate, isSuccess, isError } = useMapDataCall();

    let guData: GuInformation[] | null = null;


    /* 
    검색 시, 검색 결과 저장 
    */
    const location = useLocation();


    /* 클러스터 셋팅(지역구 단위) */
    const { guList, guIsSuccess } = useGetGuList();
    if (guIsSuccess) {
        guData = makeArrayForCluster(guList.guList);
    }

    const clusterClickHandler = (lat: number, lng: number) => {
        map?.setCenter({ lat: lat, lng: lng });
        map?.setZoom(16);
        setCenter && setCenter({ lng, lat });
    }


    /* 마커 메모이제이션 */
    const memoizedMarkers = useMemo(
        () =>
            list?.filter((element) => element.category === category || category === "")
                .map((element) => (
                    <Marker
                        key={element.shopId}
                        onClick={(e) => setActiveShop(element.shopId)}
                        icon={
                            element.shopId === activeShop
                                ? activeIcon
                                : icon
                        }
                        defaultPosition={new navermaps.LatLng(
                            element.lat,
                            element.lng
                        )}
                    />
                )),
        [list, category, activeShop]
    );

    /* 첫 렌더링 및 각각 state 변화에 따른 렌더처리 */
    useEffect(() => {
        if (location.state) {
            const searchedShop = {
                lng: Number(location.state.lng),
                lat: Number(location.state.lat),
                range: 500,
            };
            setCenter({ lat: searchedShop.lat, lng: searchedShop.lng });
            mutate(searchedShop);
        } else {
            const newPayload = { lng: center.lng, lat: center.lat, range: 500 };
            saveCenterInLocalStorage(center);
            mutate(newPayload);
        }
    }, []);

    useEffect(() => {
        isSuccess && setList(data);
        changeListbyCategory(setList, data, category, range);
    }, [isSuccess]);

    useEffect(() => {
        changeListbyCategory(setList, data, category, range);
    }, [category, range]);

    useEffect(() => {
        list && (setActiveShop(list[0]?.shopId as number));
    }, [list]);

    if (isError) return <Error />;


    return (
        <MapDiv style={{ width: '100%', height: '100%' }} id="react-naver-map">
            <NaverMap
                center={center}
                ref={(e) => setMap(e)}
                zoomOrigin={center}
                disableKineticPan={true}
                defaultZoom={17}
                maxZoom={19}
                minZoom={11}
                onZoomChanged={(value) => {
                    setZoom(value);
                    rangeRefresh(value, setList, setRange);
                }}
            >
                <Marker
                    icon={`${process.env.PUBLIC_URL}/markers/icon_mylocation_36.png`}
                    position={center}
                />
                {zoom > 15
                    ? memoizedMarkers
                    : guData?.map((element) => {
                        return <Marker
                            key={uuid()}
                            icon={createClusterMarkerIcon(element.guName, element.shopCount)}
                            position={{ lat: element.lat, lng: element.lng }}
                            onClick={() => clusterClickHandler(element.lat, element.lng)}
                        />
                    })}
            </NaverMap>
            <AimBtn onClick={() => aimClickHandler(
                prevPos,
                setPrevPos,
                states,
                map,
                dispatches
            )}>
                <Image src={`${process.env.PUBLIC_URL}/icon/current location_24.png`} alt="" />
            </AimBtn>
            {zoom > 15
                ? <RefreshBtnDiv onClick={() => reMutate(map, center, setPrevPos, setCenter, mutate)}>
                    <Buttons.Medium.Refresh>이 위치에서 검색</Buttons.Medium.Refresh>
                </RefreshBtnDiv>
                : null}
        </MapDiv>
    );
}



export default MapModule;

const RefreshBtnDiv = styled.div`
    position: absolute;
    width: fit-content;
    height: fit-content;
    bottom: 234px;
    left: 50%;
    transform: translateX(-50%);
`;
const AimBtn = styled.div`
    position: absolute;
    bottom: 236px;
    z-index: 1;
    width: 30px;
    height : 30px;
    /* width: fit-content; */
    /* height: fit-content; */
    right: 35px;
    padding: 6px;
    border : none;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    background-color: white;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`;