import React from 'react'
import styled from 'styled-components';
import { Headers } from '../components/ui/element/headers/Headers';
import { VFlex } from '../custom/ym/styleStore';
import BookmarkList from '../components/bookmark/BookmarkList';

const Bookmark = () => {
    return (
        <BookmarkContainer>
            <VFlex>
                <Headers.JustTitle>Favorite</Headers.JustTitle>
                <BookmarkList />
            </VFlex>
        </BookmarkContainer>
    )
}

export default Bookmark;

const BookmarkContainer = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 100%;
`