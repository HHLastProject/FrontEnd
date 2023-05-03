import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation } from '../../custom/jh/getUserLocation';
import uuid from 'react-uuid';
import { CenterContext, DispatchContext, ListContextDefault, Markers, SearchedShop, StateContext } from '../../pages/Home';
import { NavermapPointType } from '../../custom/ym/variables';
import styled from 'styled-components';
import MarkerMemo from './MarkerMemo';
import useGetGooList from '../../hooks/useGetGooList';
import makeArrayForCluster from '../../hooks/makeArrayForCluster';
import { useLocation } from 'react-router-dom';

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
    // const [search, setSearch] = useState<SearchedShop>({ shopLng: 0, shopLat: 0 });

    let timeCheck: NodeJS.Timeout | null = null;

    const { center, setCenter } = useContext(CenterContext);

    const {
        activeShop,
        // list,
        userCoord,
    } = useContext(StateContext);

    const {
        setActiveShop,
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
        const guData = makeArrayForCluster(guList.guList);
    }
    // const guData = makeArrayForCluster(gooList);

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
        const changeRange =
            setRange as React.Dispatch<React.SetStateAction<number>>;
        if (zoomUnit > 14 && zoomUnit < 20) {
            changeRange(returnRadius(zoomUnit));
        } else {
            changeRange(0);
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
                    : null}

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