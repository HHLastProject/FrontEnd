import React from 'react'
import styled from 'styled-components';
import { Headers } from '../components/ui/element/headers/Headers';
import { useNavigate } from 'react-router-dom';

const EditBookmark = () => {
    const navi = useNavigate();
    const backClickHandler = () => {
        navi(-1);
    }
    const finishClickHandler = () => {

    }
    return (
        <EditContainer>
            <Headers.EditBookmarkHeader
                BackOnClick={backClickHandler}
                RightOnClick={finishClickHandler}
            >완료</Headers.EditBookmarkHeader>
        </EditContainer>
    )
}

export default EditBookmark;

const EditContainer = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 100%;
    background-color: white;
`