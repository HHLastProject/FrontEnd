import React from 'react'
import TagRound from '../TagRound'
import TagText from '../TagText'
import TagSize from '../TagSize'
import TagPaint from '../TagPaint'
type Prop = {
    children: string
}
const FeedTag = ({ children }: Prop) => {
    return (
        <TagRound>
            <TagPaint>
                <TagSize>
                    <TagText>{children}</TagText>
                </TagSize>
            </TagPaint>
        </TagRound>
    )
}

export default FeedTag;
