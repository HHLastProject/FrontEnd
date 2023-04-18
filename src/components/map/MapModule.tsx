import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation } from '../../custom/jh/getUserLocation';
import data from "../../datasample/data.json"
import styled from 'styled-components';
import { VFlexCenter } from '../../custom/ym/styleStore';
import uuid from 'react-uuid';
import { SAMPLE_DATA, ShopData } from '../../custom/ym/variables';
import { DispatchContext, EachData, StateContext } from '../../pages/Home';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mapQueryKeys } from '../../apis/queries';
import useMapDataCall from '../../hooks/useMapDataCall';

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
const MapModule = ({ category }: MapModuleProps) => {

    const navermaps = useNavermaps();
    const [temp, setTemp] = useState({ lat: 37.5108407, lng: 127.0468975 });
    const mapRef = useRef(null);

    const { range, list, shopCoord } = useContext(StateContext);
    const { setShopCoord, setRange } = useContext(DispatchContext);

    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/icon_mappin_36.png`,
        anchor: new navermaps.Point(0, 0),
    }


    return (
        <MapDiv style={{ width: '100%', height: '100%' }} id="react-naver-map">
            <NaverMap
                center={temp}
                defaultZoom={18}
                ref={mapRef}
                onCenterChanged={(centerCoord) => {
                    console.log("센터위치: ", centerCoord);
                }}
            // onZoomChanged={() => console.log(data)}
            >
                <Marker
                    icon={`${process.env.PUBLIC_URL}/markers/icon_mylocation_36.png`}
                    position={temp}
                />
                {/* <Overlay element={circleState} /> */}
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
