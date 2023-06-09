import { useEffect } from 'react';
import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import styled from 'styled-components';
import { iconImgPath } from '../../shared/path';

type Size = {
  width: number,
  height: number,
};

type Coordinate = {
  lng: number,
  lat: number,
};

interface IShopDetailMap extends Size, Coordinate {
  width: number,
  height: number,
  lng: number,
  lat: number,
};

const ShopDetailMap = ({ width, height, lng, lat }: IShopDetailMap) => {
  const navermaps = useNavermaps();
  useEffect(() => {

  }, []);

  return (
    <ShopDetailMapWrap
      width={width}
      height={height}
    >
    <div>
      <MapDiv style={{ width: '500px', height: '500px' }}>
        <NaverMap
          center={new navermaps.LatLng(lat, lng)}
          defaultZoom={16}
          zoomControl={true}
        >
          <Marker
            icon={`${iconImgPath.map.selectedShopLocation}`}
            position={new navermaps.LatLng(lat, lng)}
          />
        </NaverMap>
      </MapDiv>
    </div>
    </ShopDetailMapWrap>
  );
};

export default ShopDetailMap;

const ShopDetailMapWrap = styled.div<Size>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;