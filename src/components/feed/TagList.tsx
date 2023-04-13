import React from 'react'
import { HFlex } from '../../custom/ym/styleStore'
import FeedTag from './FeedTag'
type Prop = {
    children: string[] | null | undefined
}
const TagList = ({ children }: Prop) => {
    return (
        <HFlex gap='4px' height='fit-content' etc='flex-wrap:wrap;'>
            {children?.map((item) => {
                return <FeedTag>{item}</FeedTag>;
            })}
        </HFlex>
    )
}

export default TagList;

