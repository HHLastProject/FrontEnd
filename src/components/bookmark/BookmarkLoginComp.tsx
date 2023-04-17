import React, { useState } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import { FILTER_LIST, SAMPLE_DATA } from '../../custom/ym/variables';
import BookmarkCard from '../ui/element/cards/BookmarkCard';
import uuid from 'react-uuid';
import { CategoryProp, EachData } from '../../custom/ym/types';
import NoExistBookmark from './NoExistBookmark';
import { useNavigate } from 'react-router-dom';

const BookmarkLoginComp = ({ categoryState }: CategoryProp) => {

    const navi = useNavigate();

    const sampleData: EachData[] = categoryState
        ? SAMPLE_DATA.filter((element) => element.category === categoryState)
        : SAMPLE_DATA;

    return (
        <VFlex height='fit-content' gap='20px' etc="padding:20px; flex:none;">
            {sampleData?.length === 0
                ? <NoExistBookmark />
                : sampleData?.map((element) => {
                    if (element.category === categoryState || categoryState === null) {
                        return <BookmarkCard key={uuid()} data={element} />;
                    }
                    return null;
                })}
        </VFlex>
    )
}

export default BookmarkLoginComp