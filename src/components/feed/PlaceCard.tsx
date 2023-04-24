import React, { createContext, useState } from 'react'
import PlaceCardRound from '../PlaceCardRound';
import { HFlex, HFlexSpaceBetween } from '../../custom/ym/styleStore';
import PlacePicture from './PlacePicture';
import PlaceNameCard from './PlaceNameCard';
import PlaceBookMark from './PlaceBookMark';


interface childrenForPlaceCard {
    dataset?: FeedCardData
}

export interface FeedCardData {
    shopThumbnail: string,
    shopName: string,
    shopAddress: string,
    isScrap: boolean,
    shopId: number,
}

const PlaceCard = ({ dataset }: childrenForPlaceCard) => {

    return (
        <PlaceCardRound>
            <HFlexSpaceBetween>
                <PlacePicture imgUrl={dataset?.shopThumbnail} />
                <PlaceNameCard shopName={dataset?.shopName} shopAddress={dataset?.shopAddress} />
                <PlaceBookMark isScrap={dataset?.isScrap} shop={dataset?.shopId} />
            </HFlexSpaceBetween>
        </PlaceCardRound>
    )
}

export default PlaceCard;