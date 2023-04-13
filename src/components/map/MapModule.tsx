import React, { useEffect, useRef, useState } from 'react';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation } from '../../custom/jh/getUserLocation';
import data from "../../datasample/data.json"
import styled from 'styled-components';
import { VFlexCenter } from '../../custom/ym/styleStore';
import uuid from 'react-uuid';
import { SAMPLE_DATA } from '../../custom/ym/variables';
import { EachData } from '../../pages/Map';

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
};
type MapModuleProps = {
    category: string
};
const MapModule = ({ category }: MapModuleProps) => {

    const navermaps = useNavermaps();
    // const map = useMap();
    const [range, setRange] = useState(500);
    const [search, setSearch] = useState('');
    const [list, setList] = useState<(EachData | null)[]>([]);
    // const map = useRef(null);

    const [temp, setTemp] = useState({ lat: 37.5108407, lng: 127.0468975 });

    const mapRef = useRef(null);

    // 실시간 유저 위치
    const [userCoord, setUserCoord] = useState<Coordinate>({
        lng: 0,
        lat: 0,
    });

    // 샵 위치
    const [shopCoord, setShopCoord] = useState<Coordinate[]>([]);

    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/icon_mappin_36.png`,
        anchor: new navermaps.Point(0, 0),
    }

    // const circle = new navermaps.Circle(circleData);

    const btnHandler = () => {
        // setCircleData((prev) => {
        //     return { ...prev, radius: 200 };
        // });
        // console.log(circleData);
        // setRange(200);
        setTemp({ lat: 37.5103407, lng: 127.0438975 });
    }


    const moveCenter = () => {
        navermaps.Service.geocode({
            query: search,
        }, (status, response) => {
            if (status !== navermaps.Service.Status.OK) {
                return alert("Something wrong!");
            }
            // console.log(response);
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
        // console.log(userCoord);
        if (category) {
            setList(prev => {
                const searchResult = SAMPLE_DATA.map((item) => item.category === category ? item : null);
                return searchResult;
            })
        } else {
            setList(SAMPLE_DATA);
        }

    }, [category]);

    return (
        <MapDiv style={{ width: '100%', height: '100%' }} id="react-naver-map">
            <NaverMap
                center={temp}
                defaultZoom={18}
                ref={mapRef}
            >
                <Marker
                    icon={`${process.env.PUBLIC_URL}/markers/icon_mylocation_36.png`}
                    position={temp}
                />
                {/* <Overlay element={circleState} /> */}
                {list.map((element) => {
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
