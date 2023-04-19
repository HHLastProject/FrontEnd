import React from 'react'
import styled from 'styled-components';
import { colorSet } from '../../styles/color';
import { InternalJSX } from '../../../../custom/ym/types';

const Default = ({ onClick, children, ...props }: InternalJSX) => {
    return (
        <DefaultContainer onClick={onClick}>{children}</DefaultContainer>
    )
}

const Others = ({ onClick, children, ...props }: InternalJSX) => {
    return (
        <OtherContainer onClick={onClick}>{children}</OtherContainer>
    )
}

export const BtnRadius = { Default, Others };

const DefaultContainer = styled.button`
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    border-radius: 8px;
    border: none;
    padding: 0px;
    background-color: transparent;
`

const OtherContainer = styled.button`
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid ${colorSet.lineMedium};
    background-color: transparent;
    padding: 0px;
`