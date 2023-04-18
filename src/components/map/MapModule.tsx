import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import { getRealtimeLocation } from '../../custom/jh/getUserLocation';
import uuid from 'react-uuid';
import { DispatchContext, EachData, StateContext } from '../../pages/Home';

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

    const { center, list, userCoord } = useContext(StateContext);
    const { setShopCoord, setRange, setCenter } = useContext(DispatchContext);

    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/icon_mappin_36.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const centerChangeHandler = (
        centerOnMap: naver.maps.Coord,
        setState: React.Dispatch<React.SetStateAction<Coordinate>>
    ) => {
        const newCoord: Coordinate = {
            lng: centerOnMap.x,
            lat: centerOnMap.y,
        }
        timeCheck && clearTimeout(timeCheck);
        timeCheck = setTimeout(() => {
            setState(newCoord);
            timeCheck = null;
        }, 500);
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

    const initZoom = (value: number) => {
        setZoom(value);
        return value;
    }

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


    return (
        <MapDiv style={{ width: '100%', height: '100%' }} id="react-naver-map">
            <NaverMap
                center={center}
                // defaultZoom={initZoom(17)}
                defaultZoom={17}
                ref={mapRef}
                onCenterChanged={
                    (centerCoord) => {
                        centerChangeHandler(
                            centerCoord,
                            setCenter as React.Dispatch<React.SetStateAction<Coordinate>>
                        )
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
                {/* <Overlay element={radius} /> */}
                {list?.map((element) => {
                    // console.log(element);
                    // return null;
                    if (element) {
                        return <Marker
                            key={uuid()}
                            icon={icon}
                            defaultPosition={new navermaps.LatLng(element.lat, element.lng)} />;
                    } else {
                        return null;
                    }
                })}
            </NaverMap>
        </MapDiv>
    );
}

export default MapModule;
