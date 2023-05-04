import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation } from '../../custom/jh/getUserLocation';
import uuid from 'react-uuid';
import { CenterContext, DispatchContext, ListContextDefault, Markers, SearchedShop, StateContext } from '../../pages/Home';
import { NavermapPointType, ShopData, clusterHTML } from '../../custom/ym/variables';
import styled from 'styled-components';
import MarkerMemo from './MarkerMemo';
import useGetGooList from '../../hooks/useGetGooList';
import makeArrayForCluster from '../../hooks/makeArrayForCluster';
import { useLocation } from 'react-router-dom';
import { colorSet } from '../ui/styles/color';
import { GuInformation } from '../../shared/guCoordInform';
import useMapDataCall from '../../hooks/useMapDataCall';
import shopCoordList from '../../custom/ym/shopCoordList';

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

const MapModule = ({ list, setList }: MapProps) => {
    const navermaps = useNavermaps();
    const mapRef = useRef(null);
    const [zoom, setZoom] = useState<number>(17);
    const [map, setMap] = useState<naver.maps.Map | null>(null);
    const [markers, setMarkers] = useState<Markers[] | null[]>([]);
    // const [search, setSearch] = useState<SearchedShop>({ shopLng: 0, shopLat: 0 });

    let timeCheck: NodeJS.Timeout | null = null;
    let guData: GuInformation[] | null = null;
    const { isChanged } = useContext(StateContext);
    const { setIsChanged } = useContext(DispatchContext);
    const { center, setCenter } = useContext(CenterContext);
    const { data, mutate, isSuccess, isError, isLoading } = useMapDataCall();
    const {
        range,
        activeShop,
        category,
        // list,
        userCoord,
    } = useContext(StateContext);

    const {
        setActiveShop,
        setShopCoord,
        setCategory,
        setRange,
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
    // const guData = makeArrayForCluster(gooList);
    // const cluster = new MarKerClustering();



    const centerChangeHandler = (
        centerOnMap: naver.maps.Coord | NavermapPointType
    ) => {

        const newCoord: Coordinate = {
            lng: centerOnMap.x,
            lat: centerOnMap.y,
        }
        timeCheck && clearTimeout(timeCheck);

        timeCheck = setTimeout(() => {
            setCenter && setCenter(newCoord);
            timeCheck = null;
        }, 100);
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

    // const initZoom = (value: number) => {
    //     setZoom(value);
    //     return value;
    // }
    const zoomChangeHandler = (zoomUnit: number) => {
        setZoom(zoomUnit);

        if (zoomUnit > 14 && zoomUnit < 20) {
            setIsChanged && setIsChanged(true);
            setRange && setRange(returnRadius(zoomUnit));
        } else {
            setIsChanged && setIsChanged(false);
            setRange && setRange(0);
            /* 클러스터링은 이쪽에서 향후에 컨트z롤 할 것 */
        }
    }

    const aimClickHandler = () => {
        const tempData: NavermapPointType = {
            x: userCoord.lng,
            y: userCoord.lat,
        }
        map?.panTo({ lng: tempData.x, lat: tempData.y });
        const centerDispatch = setCenter as React.Dispatch<React.SetStateAction<Coordinate>>;
        centerDispatch(userCoord);
    }

    const markerClickHandler = (e: naver.maps.PointerEvent, shop: number) => {
        const dispatch = setActiveShop as React.Dispatch<React.SetStateAction<number>>;

        dispatch(shop);
    }




    map?.addListener('dragend', () => {
        if (zoom > 14) {
            centerChangeHandler(map.getCenter());
        }
    });

    map?.addListener('zoom_changed', () => {
        setZoom(map.getZoom());
        const newPayload = { lng: center.lng, lat: center.lat, range: range };
        // console.log("요청했음");
        mutate(newPayload);
    })



    const clusterText = (guName: string, num: number) => {
        const clusterHTML = `<div style="cursor:pointer;width:fit-content;min-width:40px;height:fit-content;line-height:22px;font-size:12px;color:${colorSet.primary_02};text-align:center;font-weight:bold;background-color:white;border:2px solid ${colorSet.primary_02};border-radius:5px;"><div style="font-weight:bold;color:${colorSet.primary_01}">${guName}</div>${num}</div>`
        return clusterHTML
    }
    const clusterClickHandler = (lat: number, lng: number) => {
        map?.setCenter({ lat: lat, lng: lng });
        map?.setZoom(15);
        centerChangeHandler({ x: lng, y: lat });
    }
    const createClusterMarkerIcon = (guName: string, count: number) => {
        const result = {
            content: clusterText(guName, count),
            size: new navermaps.Size(40, 40),
            anchor: new navermaps.Point(20, 20)
        }
        return result
    }
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
        const listPivot = list?.map((element) => element?.shopId).sort() as number[];
        const dataPivot = data?.map((element: ShopData) => element?.shopId).sort() as number[];
        const equal = (a: number[], b: number[]) => JSON.stringify(a) === JSON.stringify(b);
        if (!equal(listPivot, dataPivot)) {
            setList(data);
            const searchResult = data?.filter(
                (item: ShopData) => item.category === category);
            setMarkers(convert(category ? searchResult : data));
            setShopCoord && setShopCoord(shopCoordList(data));
        }
    }, [isSuccess]);

    useEffect(() => {
        if (location.state) {
            const searchedShop = {
                shopLng: Number(location.state.lng),
                shopLat: Number(location.state.lat)
            };
            centerChangeHandler({ y: searchedShop.shopLat, x: searchedShop.shopLng });
        }
    }, [location.state]);


    /* 메모리누수 방지 */
    useEffect(() => {
        return () => {
            if (timeCheck) {
                clearTimeout(timeCheck);
            }
        }
    }, [timeCheck]);

    useEffect(() => {
        list && (setActiveShop && setActiveShop(list[0]?.shopId as number));
    }, [list]);

    return (
        <MapDiv style={{ width: '100%', height: '100%' }} id="react-naver-map">
            <NaverMap
                center={center}
                defaultZoom={17}
                ref={e => setMap(e)}
                disableKineticPan={true}
                onZoomChanged={(value) => zoomChangeHandler(value)}
                zoomOrigin={center}
                maxZoom={19}
                minZoom={11}
            >
                <Marker
                    icon={`${process.env.PUBLIC_URL}/markers/icon_mylocation_36.png`}
                    position={center}
                />

                {zoom > 14
                    ? list?.map((element: Markers | null) => {
                        if (element) {
                            return <Marker
                                key={uuid()}
                                onClick={(e) => markerClickHandler(e, element.shopId)}
                                icon={element?.shopId === activeShop
                                    ? activeIcon
                                    : icon}
                                defaultPosition={new navermaps.LatLng(element.lat, element.lng)} />
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
        </MapDiv>
    );
}

export default MapModule;


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