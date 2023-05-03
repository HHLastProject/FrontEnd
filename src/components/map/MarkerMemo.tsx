import React, { useContext } from 'react'
import { Marker, useNavermaps } from 'react-naver-maps';
import { StateContext } from '../../pages/Home';
import { ShopData } from '../../custom/ym/variables';

interface MarkerProps {
    element: ShopData,
    onClick: ((e: naver.maps.PointerEvent, shop: number) => void) | undefined,
}
const MarkerMemo = ({ element, onClick }: MarkerProps) => {
    const { activeShop } = useContext(StateContext);
    const navermaps = useNavermaps();

    const clickHandler = onClick as (e: naver.maps.PointerEvent, shop: number) => void;

    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/non_selected_shop.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const activeIcon = {
        url: `${process.env.PUBLIC_URL}/markers/selected_shop.png`,
        anchor: new navermaps.Point(0, 0),
    }

    console.log('요소', element.shopName);

    return (
        <Marker
            onClick={(e) => clickHandler(e, element.shopId)}
            icon={element?.shopId === activeShop
                ? activeIcon
                : icon}
            defaultPosition={new navermaps.LatLng(element.lat, element.lng)} />
    )
}

export default MarkerMemo;
// export default React.memo(MarkerMemo);