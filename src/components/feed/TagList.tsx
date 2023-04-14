import React from 'react'
import { HFlex } from '../../custom/ym/styleStore'
import { Tags } from '../ui/element/tags/Tags'
type Prop = {
    children: string[] | null | undefined
}
const TagList = ({ children }: Prop) => {
    return (
        <HFlex gap='4px' height='fit-content' etc='flex-wrap:wrap;'>
            {children?.map((item) => {
                return <Tags.Default>{item}</Tags.Default>;
            })}
        </HFlex>
    )
}

export default TagList;

