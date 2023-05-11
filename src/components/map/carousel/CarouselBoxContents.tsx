import React from 'react'
import { HFlex } from '../../../custom/ym/styleStore'
import { ShopData } from '../../../custom/ym/variables'
import ContentsThumbnail from './ContentsThumbnail'
import ContentsDetails from './ContentsDetails'

const CarouselBoxContents = ({ item }: { item: ShopData }) => {
    return (
        <HFlex gap='8px'>
            <ContentsThumbnail item={item} />
            <ContentsDetails item={item} />
        </HFlex>
    )
}

export default CarouselBoxContents;