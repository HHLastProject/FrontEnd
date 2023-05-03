import styled from 'styled-components';
import { imgPath } from '../../shared/path';

const PlacePicture = ({
    imgUrl,
    onClick
}: {
    imgUrl?: string,
    onClick: React.MouseEventHandler<HTMLDivElement>
}) => {
    // const { shopThumbnail } = mypageData.feeds[2] as EachFeed;
    const url: string = imgPath.shopThumbnailImg + imgUrl;
    // console.log(url);
    return (
        <PictureSize onClick={onClick}>
            <Picture src={url} alt="" />
        </PictureSize>
    )
}

export default PlacePicture;
const PictureSize = styled.div`
    cursor: pointer;
    width: 60px;
    height: 60px;
    flex : none;
`
const Picture = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`