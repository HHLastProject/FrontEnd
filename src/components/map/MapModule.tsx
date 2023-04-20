import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import { getRealtimeLocation } from '../../custom/jh/getUserLocation';
import uuid from 'react-uuid';
import { DispatchContext, EachData, StateContext } from '../../pages/Home';
import { NavermapPointType } from '../../custom/ym/variables';
import styled from 'styled-components';

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
const MapModule = () => {
    const navermaps = useNavermaps();
    const mapRef = useRef(null);
    const [zoom, setZoom] = useState<number>(17);

    let timeCheck: NodeJS.Timeout | null = null;


    const {
        center,
        list,
        userCoord,
        isMoving } = useContext(StateContext);

    const {
        setShopCoord,
        setRange,
        setCenter,
        setIsMoving } = useContext(DispatchContext);


    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/icon_mappin_36.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const centerChangeHandler = (
        setState: React.Dispatch<React.SetStateAction<Coordinate>>,
        centerOnMap: naver.maps.Coord | NavermapPointType
    ) => {

        const newCoord: Coordinate = {
            lng: centerOnMap.x,
            lat: centerOnMap.y,
        }
        timeCheck && clearTimeout(timeCheck);

        timeCheck = setTimeout(() => {
            setState(newCoord);
            timeCheck = null;
        }, 300);
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

    const aimClickListner = () => {

        const tempData: NavermapPointType = {
            x: userCoord.lng,
            y: userCoord.lat,
        }

        const tempSetCenter = setCenter as React.Dispatch<React.SetStateAction<Coordinate>>;
        const tempSetIsMoving = setIsMoving as React.Dispatch<React.SetStateAction<boolean>>;

        tempSetIsMoving(true);
        tempSetCenter(userCoord);
    }


    /* 메모리누수 방지 */
    useEffect(() => {
        return () => {
            if (timeCheck) {
                clearTimeout(timeCheck);
            }
        }
    }, [timeCheck])

    return (
        <MapDiv style={{ width: '100%', height: '100%' }} id="react-naver-map">
            <NaverMap
                center={center}
                defaultZoom={17}
                ref={mapRef}
                disableKineticPan={false}
                onCenterChanged={
                    (centerCoord) => {
                        !isMoving &&
                            centerChangeHandler(
                                setCenter as React.Dispatch<React.SetStateAction<Coordinate>>,
                                centerCoord
                            );
                    }
                }
                onZoomChanged={(value) => zoomChangeHandler(value)}
                zoomOrigin={center}
                maxZoom={19}
            >
                <Marker
                    icon={`${process.env.PUBLIC_URL}/markers/icon_mylocation_36.png`}
                    position={userCoord}
                />
                {list?.map((element) => {
                    if (element) {
                        return <Marker
                            key={uuid()}
                            icon={icon}
                            defaultPosition={new navermaps.LatLng(element.lat, element.lng)} />;
                    } else {
                        return null;
                    }
                })
                }
            </NaverMap>
            <AimBtn onClick={aimClickListner}>
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