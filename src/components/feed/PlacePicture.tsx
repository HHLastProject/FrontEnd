import styled from 'styled-components';
import { imgPath } from '../../shared/path';

const PlacePicture = ({ imgUrl }: { imgUrl?: string }) => {
    // const { shopThumbnail } = mypageData.feeds[2] as EachFeed;
    const url: string = imgPath.shopThumbnailImg + imgUrl;
    console.log(url);
    return (
        <PictureSize>
            <Picture src={url} alt="" />
        </PictureSize>
    )
}

export default PlacePicture;
const PictureSize = styled.div`
    width: 60px;
    height: 60px;
    flex : none;
`
const Picture = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`