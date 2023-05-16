import React, { useContext } from 'react'
import { Headers } from '../ui/element/headers/Headers'
import { getEditedBookmark } from '../../custom/ym/bookmarkFuncs';
import useEditScrapData from '../../hooks/useEditScrapData';
import { ScrapContext, ScrapDispatchesContext } from './bookmarkContext';

const BookmarkHeader = () => {
    const { mutate } = useEditScrapData();

    const { queryData, scrapList, editMode } = useContext(ScrapContext);
    const { setEditMode } = useContext(ScrapDispatchesContext);

    const editFinishClickHandler = () => {
        const payload = getEditedBookmark(queryData, scrapList);
        mutate(payload);
        setEditMode && setEditMode(prev => false);
    }
    const editBackClickHandler = () => setEditMode && setEditMode(prev => false);
    const editModeClickHandler = () => setEditMode && setEditMode(prev => true);

    if (editMode) {
        return (
            <Headers.EditBookmarkHeader
                BackOnClick={editBackClickHandler}
                RightOnClick={editFinishClickHandler}
            >완료</Headers.EditBookmarkHeader>
        );
    }
    return (
        <Headers.BookmarkHeader
            editClickHandler={editModeClickHandler}
        >Favorite</Headers.BookmarkHeader>
    )
}

export default BookmarkHeader