import React from 'react'
import BiasedRound from '../BiasedRound';
import BigSizingBox from '../BigSizingBox';
import styled from 'styled-components';
type Prop = {
    children: string
}
const FeedPicture = ({ children }: Prop) => {
    return (
        <BiasedRound>
            <BigSizingBox>
                <Image src={children} alt="" />
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