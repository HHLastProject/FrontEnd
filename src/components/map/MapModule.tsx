import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation } from '../../custom/jh/getUserLocation';
import uuid from 'react-uuid';
import { CenterContext, DispatchContext, ListContextDefault, Markers, SearchedShop, StateContext } from '../../pages/Home';
import { MapCoordPayload, NavermapPointType, ShopData, clusterHTML } from '../../custom/ym/variables';
import styled from 'styled-components';
import MarkerMemo from './MarkerMemo';
import useGetGooList from '../../hooks/useGetGooList';
import makeArrayForCluster from '../../hooks/makeArrayForCluster';
import { useLocation } from 'react-router-dom';
import { colorSet } from '../ui/styles/color';
import { GuInformation } from '../../shared/guCoordInform';
import useMapDataCall from '../../hooks/useMapDataCall';
import shopCoordList from '../../custom/ym/shopCoordList';
import { debounce } from 'lodash';
import { Listener } from 'react-naver-maps';
import { Buttons } from '../ui/element/buttons/Buttons';
export type Coordinate = {
    lng: number,
    lat: number,
};
type JsonData = {
    shopName: string,
    category: string,
    jibunAddress: string,
    roadAddress: string,
    lat: number,
    lng: number
};
type MapModuleProps = {
    category: string
};

interface MapProps {
    list: Markers[] | null[],
    setList: React.Dispatch<React.SetStateAction<Markers[] | null[]>>,
}

const MapModule = () => {
    const navermaps = useNavermaps();
    const mapRef = useRef(null);
    const [zoom, setZoom] = useState<number>(17);
    const [map, setMap] = useState<naver.maps.Map | null>(null);
    const [moving, setMoving] = useState<boolean>(false);
    const [editedList, setEditedList] = useState<ShopData[] | null>(null);
    const [prevPos, setPrevPos] = useState<Coordinate>({
        lat: 37.5108407,
        lng: 127.0468975
    });
    // const [markers, setMarkers] = useState<Markers[] | null[]>([]);
    // const [search, setSearch] = useState<SearchedShop>({ shopLng: 0, shopLat: 0 });

    let timeCheck: NodeJS.Timeout | null = null;
    let guData: GuInformation[] | null = null;

    const [refreshHover, setRefreshHover] = useState<boolean>(false);

    const { center, setCenter } = useContext(CenterContext);
    const { data, mutate, isSuccess, isError, isLoading } = useMapDataCall();
    const {
        range,
        activeShop,
        category,
        list,
        userCoord,
        markers,
        isChanged
    } = useContext(StateContext);

    const {
        setActiveShop,
        setShopCoord,
        setCategory,
        setList,
        setMarkers,
        setRange,
        setIsChanged
    } = useContext(DispatchContext);


    const defaultSearchResult: SearchedShop = {
        shopLat: 0,
        shopLng: 0,
    }

    //검색 페이지에서 받는 위도 경도
    const location = useLocation();
    if (location.state) {
        const searchedShop = {
            shopLng: Number(location.state.lng),
            shopLat: Number(location.state.lat)
        };

        // setSearch(searchedShop);
    }

    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/non_selected_shop.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const activeIcon = {
        url: `${process.env.PUBLIC_URL}/markers/selected_shop.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const { guList, gooIsSuccess } = useGetGooList();
    if (gooIsSuccess) {
        guData = makeArrayForCluster(guList.guList);
    }

    const returnRadius = (value: number) => {
        switch (value) {
            case 19:
                return 100;
            case 18:
                return 200;
            case 17:
                return 300;
            case 16:
                return 500;
            case 15:
                return 1000;
            default:
                return 300;
        }
    }

    const rangeRefresh = (zoomUnit: number) => {
        if (zoomUnit > 14 && zoomUnit < 20) {
            // console.log(zoomUnit);
            // console.log(returnRadius(zoomUnit));
            setRange && setRange(returnRadius(zoomUnit));
        } else {
            setList && setList([]);
            setRange && setRange(0);
        }
    }

    const aimClickHandler = () => {
        const tempPrev = { ...prevPos }; // 이전 위치
        const tempCenter = { ...center }; // 변경됐던 위치
        console.log('tempprev', tempPrev);
        console.log('tempCenter', tempCenter)
        map?.panTo(prevPos);             // 이전 위치로 돌아감
        setPrevPos(tempCenter);        // 이전 위치정보에는 변경됐던 좌표를 넣음
        setCenter && setCenter(tempPrev);  // 현재 위치를 다시 이전 위치 좌표로 할당
        console.log('prevPos', prevPos);
        console.log('center', center);
        refreshData();
    }

    const markerClickHandler = (e: naver.maps.PointerEvent, shop: number) => {
        const dispatch = setActiveShop as React.Dispatch<React.SetStateAction<number>>;

        dispatch(shop);
    }




    const reMutate = () => {
        const newPayload: MapCoordPayload = {
            lat: map?.getCenter().y as number,
            lng: map?.getCenter().x as number,
            range: 1000
        }
        setPrevPos({ ...center });
        setCenter && setCenter({ lat: newPayload.lat, lng: newPayload.lng });
        localStorage.setItem("lat", String(newPayload.lat));
        localStorage.setItem("lng", String(newPayload.lng));
        mutate(newPayload);
    }



    const refreshListByRange = (data: ShopData[]) => {
        const result = data?.filter((element) => element.distance <= range);
        setList && setList(result);
        // console.log(result);
        return result;
    }


    const refreshData = () => {
        refreshListByRange(data);
    }




    /* 클러스터 */
    const clusterText = (guName: string, num: number) => {
        const clusterHTML = `<div style="cursor:pointer;width:fit-content;min-width:40px;height:fit-content;line-height:22px;font-size:12px;color:${colorSet.primary_02};text-align:center;font-weight:bold;background-color:white;border:2px solid ${colorSet.primary_02};border-radius:5px;"><div style="font-weight:bold;color:${colorSet.primary_01}">${guName}</div>${num}</div>`
        return clusterHTML
    }
    const clusterClickHandler = (lat: number, lng: number) => {
        map?.setCenter({ lat: lat, lng: lng });
        map?.setZoom(15);
        setCenter && setCenter({ lng, lat });
    }
    const createClusterMarkerIcon = (guName: string, count: number) => {
        const result = {
            content: clusterText(guName, count),
            size: new navermaps.Size(40, 40),
            anchor: new navermaps.Point(20, 20)
        }
        return result
    }

    useEffect(() => {
        if (location.state) {
            const searchedShop = {
                lng: Number(location.state.lng),
                lat: Number(location.state.lat),
                range: 1000,
            };
            setCenter && setCenter({ lat: searchedShop.lat, lng: searchedShop.lng });
            mutate(searchedShop);
        } else {
            const newPayload = { lng: center.lng, lat: center.lat, range: 1000 };
            localStorage.setItem("lng", String(center.lng));
            localStorage.setItem("lat", String(center.lat));
            mutate(newPayload);
        }
    }, []);

    useEffect(() => {
        isSuccess && refreshListByRange(data);
    }, [isSuccess]);

    useEffect(() => {
        refreshData();
    }, [range]);


    /* 메모리누수 방지 */
    useEffect(() => {
        return () => {
            if (timeCheck) {
                clearTimeout(timeCheck);
            }
        }
    }, [timeCheck]);

    useEffect(() => {

    }, [category]);

    useEffect(() => {
        list && (setActiveShop && setActiveShop(list[0]?.shopId as number));
    }, [list]);

    return (
        <MapDiv style={{ width: '100%', height: '100%' }} id="react-naver-map">
            <NaverMap
                center={center}
                ref={(e) => setMap(e)}
                onZoomChanged={(value) => {
                    setZoom(value);
                    rangeRefresh(value);
                }}
                zoomOrigin={center}
                disableKineticPan={true}
                defaultZoom={17}
                maxZoom={19}
                minZoom={11}
            >
                <Marker
                    icon={`${process.env.PUBLIC_URL}/markers/icon_mylocation_36.png`}
                    position={center}
                />

                {zoom > 14
                    ? list?.map((element: ShopData | null) => {
                        if (element?.category === category || category === "") {
                            return <Marker
                                key={uuid()}
                                onClick={(e) => markerClickHandler(e, element?.shopId as number)}
                                icon={element?.shopId === activeShop
                                    ? activeIcon
                                    : icon}
                                defaultPosition={new navermaps.LatLng(element?.lat as number, element?.lng as number)} />
                        } else {
                            return null;
                        }
                    })
                    : guData?.map((element) => {
                        return <Marker
                            key={uuid()}
                            icon={createClusterMarkerIcon(element.guName, element.shopCount)}
                            position={{ lat: element.lat, lng: element.lng }}
                            onClick={() => clusterClickHandler(element.lat, element.lng)}
                        />
                    })}

            </NaverMap>
            <AimBtn onClick={aimClickHandler}>
                <Image src={`${process.env.PUBLIC_URL}/icon/current location_24.png`} alt="" />
            </AimBtn>
            {zoom > 14
                ? <RefreshBtnDiv
                    onMouseEnter={() => setRefreshHover(true)}
                    onMouseLeave={() => setRefreshHover(false)}
                    onClick={reMutate}
                >
                    {
                        refreshHover
                            ? <Buttons.Medium.RefreshHover>이 위치에서 검색</Buttons.Medium.RefreshHover>
                            : <Buttons.Medium.Refresh>이 위치에서 검색</Buttons.Medium.Refresh>
                    }
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
`

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
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`;