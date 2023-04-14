import React from 'react'
import { InternalJSX } from './BtnLength'
import styled from 'styled-components';
import { colorSet } from '../../styles/color';

const Default = ({ children }: InternalJSX) => {
    return (
        <DefaultContainer>{children}</DefaultContainer>
    )
}

const Others = ({ children }: InternalJSX) => {
    return (
        <OtherContainer>{children}</OtherContainer>
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