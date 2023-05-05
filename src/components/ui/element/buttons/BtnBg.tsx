import React from 'react'
import { ChildrenForJSX } from '../../../../custom/ym/types'
import styled from 'styled-components';
import { colorSet } from '../../styles/color';

const Black = ({ children, hover, ref, ...props }: ChildrenForJSX) => {
    return (
        <Paint bg={'black'} hover={hover}>{children}</Paint>
    );
};

const Gray = ({ children, hover }: ChildrenForJSX) => {
    return (
        <Paint bg={colorSet.primary_01} hover={hover}>{children}</Paint>
    );
};

const Lightgray = ({ children, hover }: ChildrenForJSX) => {
    return (
        <Paint bg={colorSet.lineMedium} hover={hover}>{children}</Paint>
    );
};

const White = ({ children, hover }: ChildrenForJSX) => {
    return (
        <Paint bg={'white'} hover={hover}>{children}</Paint>
    );
};

const Transparent = ({ children, hover }: ChildrenForJSX) => {
    return (
        <Paint bg={'transparent'} hover={hover}>{children}</Paint>
    );
};


export const BtnBg = { Black, Gray, Lightgray, White, Transparent };

const Paint = styled.div<{ bg: string, hover?: string }>`
    width: 100%;
    height: 100%;
    background-color: ${({ bg }) => bg};
    &:hover {
        background-color: ${({ hover }) => hover ? hover : null};
    }
`