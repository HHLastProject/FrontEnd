import React, { useContext } from 'react'
import styled from 'styled-components';
import { Buttons } from '../ui/element/buttons/Buttons';
import { ScrapContext, ScrapDispatchesContext } from './bookmarkContext';

const MoveScrap = () => {
    const { selected, editMode } = useContext(ScrapContext);
    const { setModal } = useContext(ScrapDispatchesContext);
    const moveFolderClickHandler = () => setModal(prev => true);
    if (!editMode) return null;
    return (
        <ButtonContainer>
            {
                selected.length > 0
                    ? <Buttons.Large.Default onClick={moveFolderClickHandler}>폴더이동</Buttons.Large.Default>
                    : <Buttons.Large.Inactive>폴더이동</Buttons.Large.Inactive>
            }
        </ButtonContainer>
    )
}

export default MoveScrap;

const ButtonContainer = styled.div`
    position: absolute;
    bottom : 0;
    left : 50%-width/2;
    z-index: 500;
    background-color: white;
    width: 390px;
    height: 88px;
    box-sizing: border-box;
    padding : 12px 16px;
    text-align: center;
`