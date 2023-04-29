import PlaceCardRound from '../PlaceCardRound';
import { HFlexSpaceBetween } from '../../custom/ym/styleStore';
import PlacePicture from './PlacePicture';
import PlaceNameCard from './PlaceNameCard';
import PlaceBookMark from './PlaceBookMark';
import { useNavigate } from 'react-router-dom';
import { path } from '../../shared/path';


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
    const navi = useNavigate();

    const cardClickHandler = () => {
        navi(`${path.toShopDetail + '/' + dataset?.shopId}`)
    }
    return (
        <PlaceCardRound>
            <HFlexSpaceBetween>
                <PlacePicture imgUrl={dataset?.shopThumbnail} onClick={cardClickHandler} />
                <PlaceNameCard shopName={dataset?.shopName} shopAddress={dataset?.shopAddress} onClick={cardClickHandler} />
                <PlaceBookMark isScrap={dataset?.isScrap} shop={dataset?.shopId} />
            </HFlexSpaceBetween>
        </PlaceCardRound>
    )
}

export default PlaceCard;