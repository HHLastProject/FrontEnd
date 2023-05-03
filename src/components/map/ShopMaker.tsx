import React from 'react'
import { Marker, useNavermaps } from 'react-naver-maps';
import { ShopData } from '../../custom/ym/variables';
import { StateContext } from '../../pages/Home';

const ShopMaker = ({ func, element
}: {
    func: (e: naver.maps.PointerEvent, shop: number) => void,
    element: ShopData,
}) => {
    const navermaps = useNavermaps();

    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/non_selected_shop.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const activeIcon = {
        url: `${process.env.PUBLIC_URL}/markers/selected_shop.png`,
        anchor: new navermaps.Point(0, 0),
    }

    return (
        <StateContext.Consumer>
            {value => <Marker
                onClick={(e) => func(e, element.shopId)}
                icon={element?.shopId === value.activeShop
                    ? activeIcon
                    : icon}
                defaultPosition={new navermaps.LatLng(element.lat, element.lng)}
            />}
        </StateContext.Consumer>
    )
}

export default ShopMaker;