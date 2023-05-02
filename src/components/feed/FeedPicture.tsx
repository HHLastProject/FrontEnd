import React from 'react'
import BiasedRound from '../BiasedRound';
import BigSizingBox from '../BigSizingBox';
import styled from 'styled-components';
import { imgPath } from '../../shared/path';
import { displayHandler } from '../../custom/jh/useOnClickHiddenHandler';
type Prop = {
    children: string
}
const FeedPicture = ({ children }: Prop) => {
    return (
        <BiasedRound>
            <BigSizingBox>
                <Image 
                    onError={(e) => displayHandler(`${children}`)}
                    id={`${children}`}
                    src={children}
                    alt="피드 이미지"
                />
            </BigSizingBox>
        </BiasedRound>
    )
}

export default FeedPicture;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`