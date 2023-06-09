import React from 'react'
import styled from 'styled-components';
import { colorSet } from '../../styles/color';
import { InternalJSX } from '../../../../custom/ym/types';

const Default = ({ onClick, children, disabled = false, ...props }: InternalJSX) => {
    // console.log('버튼에서 disable:')
    return (
        <DefaultContainer onClick={onClick} disabled={disabled} {...props}>{children}</DefaultContainer>
    )
}

const Others = ({ onClick, children, ...props }: InternalJSX) => {
    return (
        <OtherContainer onClick={onClick} {...props}>{children}</OtherContainer>
    )
}

const Rounded = ({ onClick, children, ...props }: InternalJSX) => {
    return (
        <RoundedContainer onClick={onClick} {...props}>{children}</RoundedContainer>
    )
}

const Aim = ({ onClick, children, ...props }: InternalJSX) => {
    return (
        <AimContainer onClick={onClick} {...props}>{children}</AimContainer>
    )
}

export const BtnRadius = { Default, Others, Rounded, Aim };

export const RoundedContainer = styled.button`
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    border-radius: 100px;
    border: 1px solid ${colorSet.lineMedium};
    padding: 0px;
    background-color: transparent;
`

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

const AimContainer = styled.button`
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    border-radius: 4px;
    border: none;
    padding: 6px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    background-color: white;
`