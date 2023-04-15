import React from 'react'
import { ChildrenForJSX } from '../../../../custom/ym/types'
import styled from 'styled-components';
import { colorSet } from '../../styles/color';

const Black = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bg={'black'}>{children}</Paint>
    );
};

const Gray = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bg={colorSet.primary_01}>{children}</Paint>
    );
};

const Lightgray = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bg={colorSet.lineMedium}>{children}</Paint>
    );
};

const White = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bg={'white'}>{children}</Paint>
    );
};

const Transparent = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bg={'transparent'}>{children}</Paint>
    );
};


export const BtnBg = { Black, Gray, Lightgray, White, Transparent };

const Paint = styled.div<{ bg: string }>`
    width: 100%;
    height: 100%;
    background-color: ${({ bg }) => bg};
`