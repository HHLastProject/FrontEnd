import React, { useEffect, useRef, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation } from '../custom/jh/getUserLocation';
import data from "../datasample/data.json"
import { VFlexCenter } from '../custom/ym/styleStore';
import styled from 'styled-components';

type Coordinate = {
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
}
const Map = () => {

    const navermaps = useNavermaps();
    // const map = useMap();
    const [range, setRange] = useState(500);
    const [search, setSearch] = useState('');
    // const map = useRef(null);

    const [temp, setTemp] = useState({ lat: 37.5108407, lng: 127.0468975 });
    const [circleData, setCircleData] = useState({
        center: temp,
        radius: range,
        strokeWeight: 3,
        strokeOpacity: 0.4,
        strokeColor: 'rgb(14, 163, 0)',
        fillColor: 'rgb(53, 255, 46)',
        fillOpacity: 0.2
    });

    const mapRef = useRef(null);

    const [circleState, setCircleState] = useState<naver.maps.Circle>(new navermaps.Circle(circleData))
    console.log(data);

    // 실시간 유저 위치
    const [userCoord, setUserCoord] = useState<Coordinate>({
        lng: 0,
        lat: 0,
    });

    // 샵 위치
    const [shopCoord, setShopCoord] = useState<Coordinate[]>([]);

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

    // const circle = new navermaps.Circle(circleData);

    const btnHandler = () => {
        // setCircleData((prev) => {
        //     return { ...prev, radius: 200 };
        // });
        // console.log(circleData);
        // setRange(200);
        setTemp({ lat: 37.5103407, lng: 127.0438975 });
    }

    const changeRadius = () => {
        setCircleData((prev) => {
            return { ...prev, radius: 200 };
        });

        setCircleState((prev) => new navermaps.Circle(circleData));
    }

    const moveCenter = () => {
        navermaps.Service.geocode({
            query: search,
        }, (status, response) => {
            if (status !== navermaps.Service.Status.OK) {
                return alert("Something wrong!");
            }
            console.log(response);
            setTemp((prev) => {
                return {
                    lat: parseFloat(response.v2.addresses[0].y),
                    lng: parseFloat(response.v2.addresses[0].x),
                }
            })
        })
    }

    useEffect(() => {
        getRealtimeLocation(setUserCoord);
        console.log(userCoord);

        dummy.forEach((element) => {
            console.log('요소', element);
            navermaps.Service.geocode({
                query: element,
            }, (status, response) => {

                if (status !== navermaps.Service.Status.OK) {
                    return alert('Something wrong!');
                }

                setShopCoord(prev => [...prev, {
                    lng: parseFloat(response.v2.addresses[0].x),
                    lat: parseFloat(response.v2.addresses[0].y)
                }]);

                console.log(shopCoord);

            });
        });
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            {/* <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
            {/* <button onClick={moveCenter}>이동</button> */}
            <VFlexCenter etc='background-color:pink'>
                {/* <AA>1</AA> */}
                <MapDiv style={{ width: '390px', height: '100vh' }} id="react-naver-map">
                    <NaverMap
                        center={userCoord}
                        defaultZoom={18}
                        ref={mapRef}
                    >
                        <Marker
                            icon={`${process.env.PUBLIC_URL}/markers/me.png`}
                            position={userCoord}
                        />
                        <Overlay element={circleState} />
                        {data.map((element) => {
                            console.log(element);
                            // return null;
                            return <Marker
                                icon={icon}
                                defaultPosition={new navermaps.LatLng(element.lat, element.lng)} />;
                        })}
                    </NaverMap>
                </MapDiv>
            </VFlexCenter>

            {/* <button onClick={btnHandler}>이동하기</button> */}
            {/* <button onClick={changeRadius}>반경 변경</button> */}

        </div>
    );
}

export default Map;
