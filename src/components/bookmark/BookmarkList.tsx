import React from 'react'
import { VFlex } from '../../custom/ym/styleStore'
import { SAMPLE_DATA } from '../../custom/ym/variables'
import BookmarkCard from '../ui/element/cards/BookmarkCard'

const BookmarkList = () => {
    return (
        <VFlex height='fit-content' gap='20px' etc="padding:20px; flex:none;">
            {SAMPLE_DATA.map((element) => <BookmarkCard>{element}</BookmarkCard>)}
        </VFlex>
    )
}

export default BookmarkList