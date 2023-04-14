import React from 'react'
import SmallRound from './SmallRound'
import SizingBox from './SizingBox'
import ImageBox from './ImageBox'
type Prop = {
    children: string
}
const SmallProfileCard = ({ children }: Prop) => {
    return (
        <SmallRound>
            <SizingBox>
                <ImageBox>{children}</ImageBox>
            </SizingBox>
        </SmallRound>
    )
}

export default SmallProfileCard