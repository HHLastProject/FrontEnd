import React from 'react'
import styled from 'styled-components';
import FeedContents from '../../feed/FeedContents';
import { ModalContents } from './ModalContents';
import { VFlexCenter } from '../../../custom/ym/styleStore';
import { FolderData } from '../../../custom/ym/types';

const Feed = ({ stateDispatch, params }: { stateDispatch: React.Dispatch<React.SetStateAction<boolean>>, params: number }) => {
    const backgroundClickHandler = () => {
        stateDispatch(false);
    }
    return (
        <ModalContainer>
            <VFlexCenter>
                <GrayBackground onClick={backgroundClickHandler} />
                <ModalContents.FeedModalContents target={params} />
            </VFlexCenter>
        </ModalContainer>
    )
}

const CreateFolder = ({
    dispatch,
    listDispatch
}: {
    dispatch: React.Dispatch<React.SetStateAction<boolean>>,
    listDispatch: React.Dispatch<React.SetStateAction<FolderData[]>>,
}) => {
    return (
        <ModalContainer>
            <VFlexCenter>
                <GrayBackground onClick={() => dispatch(prev => false)} />
                <ModalContents.CreateFolderModalContents dispatch={dispatch} listDispatch={listDispatch} />
            </VFlexCenter>
        </ModalContainer>
    )
}

const MoveScrapToOtherFolder = ({
    dispatch,
}: {
    dispatch: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    return (
        <ModalContainer>
            <VFlexCenter>
                <GrayBackground onClick={() => dispatch(prev => false)} />
                <ModalContents.MoveToOtherFolder dispatch={dispatch} />
            </VFlexCenter>
        </ModalContainer>
    )
}

export const Modals = { Feed, CreateFolder, MoveScrapToOtherFolder };

const ModalContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
    /* left: 50%-(width/2); */
    background-color: transparent;
`

const GrayBackground = styled.div`
    /* left: 50%-195px; */
    width: 390px;
    height: 100%;
    background-color: black;
    opacity: 0.5;
`
