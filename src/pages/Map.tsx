import React, { useEffect, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';

type Coordinate = {
    lng: number,
    lat: number,
};

interface EachCoord {
    lng: number,
    lat: number,
}

const Map = () => {
    const navermaps = useNavermaps();
    const map = useMap();

    const [coord, setCoord] = useState<Coordinate[]>([{
        lng: 127,
        lat: 38,
    }]);

    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/shop3.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const dummy: string[] = [
        "서울 강남구 봉은사로63길 11",
        "서울 강남구 봉은사로59길 32 (삼성동) 1동",
        "서울 강남구 봉은사로 454",
        "서울 강남구 선릉로112길 68",
    ];
    const circle = new navermaps.Circle({
        map: map,
        center: new navermaps.LatLng(37.5108407, 127.0468975),
        radius: 500,
        strokeWeight: 3,
        strokeOpacity: 0.4,
        strokeColor: 'rgb(14, 163, 0)',
        fillColor: 'rgb(53, 255, 46)',
        fillOpacity: 0.2
    });

    useEffect(() => {
        dummy.forEach((element) => {
            console.log('요소', element);
            navermaps.Service.geocode({
                query: element,
            }, (status, response) => {
                if (status !== navermaps.Service.Status.OK) {
                    return alert('Something wrong!');
                }
                setCoord(prev => [...prev, {
                    lng: parseFloat(response.v2.addresses[0].x),
                    lat: parseFloat(response.v2.addresses[0].y)
                }]);
                console.log(coord);
            });
        });
    }, []);

    return (
        <div>
            <MapDiv style={{ width: '496px', height: '969px' }}>
                <NaverMap
                    defaultCenter={new navermaps.LatLng(37.5108407, 127.0468975)}
                    defaultZoom={16}
                    zoomControl={true}
                >
                    <Marker
                        icon={`${process.env.PUBLIC_URL}/markers/me.png`}
                        defaultPosition={new navermaps.LatLng(37.5108407, 127.0468975)}
                    />
                    <Overlay element={circle} />
                    {coord.map((element) => {
                        return <Marker
                            icon={icon}
                            defaultPosition={new navermaps.LatLng(element.lat, element.lng)} />;
                    })}
                </NaverMap>
            </MapDiv>
        </div>
    );
}

export default Map;
