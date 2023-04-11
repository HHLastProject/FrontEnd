import { Container as MapDiv,  Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import styled from 'styled-components';

type ISize = {
  width: number,
  height: number,
};

type ICoordinate = {
  lng: number,
  lat: number,
};

interface IShopDetailMap extends ISize, ICoordinate {
  width: number,
  height: number,
  lng: number,
  lat: number,
};

const ShopDetailMap = ({width, height, lng, lat} : IShopDetailMap) => {
  const navermaps = useNavermaps();

  return (
    <ShopDetailMapWrap
      width={width}
      height={height}
    >
      <div>
        <MapDiv style={{ width: '500px', height: '500px' }}>
          <NaverMap
            defaultCenter={new navermaps.LatLng(lat, lng)}
            defaultZoom={16}
            zoomControl={true}
          >
          <Marker
            icon={`${process.env.PUBLIC_URL}/markers/me.png`}
            defaultPosition={new navermaps.LatLng(lat, lng)}
          />
        </NaverMap>
        </MapDiv>
      </div>
    </ShopDetailMapWrap>
  );
}

export default ShopDetailMap;

const ShopDetailMapWrap = styled.div<ISize>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;