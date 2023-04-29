import React from 'react'
import styled from 'styled-components';
import { VFlexCenter } from '../../../custom/ym/styleStore';
import { colorSet } from '../styles/color';

const ModalContentsCover = () => {
    return (
        <ContentsHeader>
            <VFlexCenter>
                <PullingBar />
            </VFlexCenter>
        </ContentsHeader>
    )
}

export default ModalContentsCover;

const ContentsHeader = styled.div`
    height: 32px;
    width: 100%;
    border-radius : 20px 20px 0px 0px;
    padding : 12px 165px auto 165px;
    background-color: white;
`

const PullingBar = styled.div`
    width: 60px;
    height: 4px;
    border-radius: 100px;
    background-color: ${colorSet.lineMedium};
`