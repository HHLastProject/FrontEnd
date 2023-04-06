import React from 'react'
import { Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import { Container as MapDiv } from 'react-naver-maps';

const MapModule = () => {
    const navermaps = useNavermaps();

    return (
        <MapDiv style={{ width: '100%', height: '100%' }}>
            <NaverMap
                defaultCenter={new navermaps.LatLng(37.5108407, 127.0468975)}
                defaultZoom={15}
                zoomControl={true}
                mapTypeControl={true}
            >
                <Marker
                    defaultPosition={new navermaps.LatLng(37.5108407, 127.0468975)}
                />
            </NaverMap>
        </MapDiv>
    )
}

export default MapModule