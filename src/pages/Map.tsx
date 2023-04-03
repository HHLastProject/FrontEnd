import React from 'react'
import MapModule from '../components/map/MapModule';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps } from 'react-naver-maps';


const Map = () => {
    const navermaps = useNavermaps();
    const circle = new navermaps.Circle({
        map: navermaps.Map,
        center: new navermaps.LatLng("37.5108407", "127.0468975"),
        radius: 500,
        strokeWeight: 3,
        strokeOpacity: 0.4,
        strokeColor: 'rgb(255, 36, 36)',
        fillColor: 'rgb(255, 36, 36)',
        fillOpacity: 0.2
    });

    return (
        <div>
            <MapDiv style={{ width: '496px', height: '969px' }}>
                <NaverMap
                    defaultCenter={new navermaps.LatLng("37.5108407", "127.0468975")}
                    defaultZoom={16}
                    zoomControl={true}
                >
                    <Marker
                        defaultPosition={new navermaps.LatLng("37.5108407", "127.0468975")}
                    />
                    <Overlay element={circle} />
                </NaverMap>
            </MapDiv>
        </div>
    );
}

export default Map;
