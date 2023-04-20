import React from 'react'
import PlaceCardRound from '../PlaceCardRound';
import { HFlex, HFlexSpaceBetween } from '../../custom/ym/styleStore';
import PlacePicture from './PlacePicture';
import PlaceNameCard from './PlaceNameCard';
import PlaceBookMark from './PlaceBookMark';

interface IFeedShopCard {
    shopThumbnail?: string;
    shopName?: string;
    shopAddress?: string;
}

const PlaceCard = ({shopThumbnail, shopName, shopAddress}: IFeedShopCard) => {
    return (
        <PlaceCardRound>
            <HFlexSpaceBetween>
                <PlacePicture
                    shopThumbnail={shopThumbnail}
                />
                <PlaceNameCard
                    shopName={shopName}
                    shopAddress={shopAddress}
                />
                <PlaceBookMark />
            </HFlexSpaceBetween>
        </PlaceCardRound>
    )
}

export default PlaceCard;