import React, { useState } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore'
import { FILTER_LIST, SAMPLE_DATA } from '../../custom/ym/variables'
import BookmarkCard from '../ui/element/cards/BookmarkCard'
import { Categorys } from '../ui/element/tags/Categorys'
import uuid from 'react-uuid'
import { categoryTypes } from '../../custom/ym/types'

const BookmarkList = () => {
    const [category, setCategory] = useState<categoryTypes | null>(null);

    const categoryClickHandler = (e: React.MouseEvent<HTMLButtonElement>, element: categoryTypes) => {
        element === category
            ? setCategory(null)
            : setCategory(element);
        console.log(category, element);
    }

    return (
        <>
            <HFlex gap='2px' height='fit-content' etc="padding:8px 20px;">
                {FILTER_LIST.map((element) => {
                    if (category === element) {
                        return (
                            <Categorys.Active
                                key={uuid()}
                                id={element}
                                onClick={(e) => categoryClickHandler(e, element)}
                            >{element}</Categorys.Active>
                        );
                    } else {
                        return (
                            <Categorys.Inactive
                                key={uuid()}
                                id={element}
                                onClick={(e) => categoryClickHandler(e, element)}
                            >{element}</Categorys.Inactive>
                        )
                    }
                })}
            </HFlex>
            <VFlex height='fit-content' gap='20px' etc="padding:20px; flex:none;">
                {SAMPLE_DATA.map((element) => {
                    if (element.category === category || category === null) {
                        return <BookmarkCard>{element}</BookmarkCard>
                    }
                    return null;
                })}
            </VFlex>
        </>
    )
}

export default BookmarkList