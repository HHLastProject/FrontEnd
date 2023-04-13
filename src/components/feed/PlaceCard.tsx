import React from 'react'
import PlaceCardRound from '../PlaceCardRound';
import { HFlex, HFlexSpaceBetween } from '../../custom/ym/styleStore';
import PlacePicture from './PlacePicture';
import PlaceNameCard from './PlaceNameCard';
import PlaceBookMark from './PlaceBookMark';

const PlaceCard = () => {
    return (
        <PlaceCardRound>
            <HFlexSpaceBetween>
                <PlacePicture />
                <PlaceNameCard />
                <PlaceBookMark />
            </HFlexSpaceBetween>
        </PlaceCardRound>
    )
}

export default PlaceCard;