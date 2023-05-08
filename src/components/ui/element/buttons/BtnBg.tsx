import React from 'react'
import { ChildrenForJSX } from '../../../../custom/ym/types'
import styled from 'styled-components';
import { colorSet } from '../../styles/color';

// const Black = ({ children, hover, ref, ...props }: ChildrenForJSX) => {
//     return (
//         <Paint bg={'black'} hover={hover}>{children}</Paint>
//     );
// };

// const Gray = ({ children, hover }: ChildrenForJSX) => {
//     return (
//         <Paint bg={colorSet.primary_01} hover={hover}>{children}</Paint>
//     );
// };

// const Lightgray = ({ children, hover }: ChildrenForJSX) => {
//     return (
//         <Paint bg={colorSet.lineMedium} hover={hover}>{children}</Paint>
//     );
// };

// const White = ({ children, hover }: ChildrenForJSX) => {
//     return (
//         <Paint bg={'white'} hover={hover}>{children}</Paint>
//     );
// };

// const Transparent = ({ children }: ChildrenForJSX) => {
//     return (
//         <Paint bg={'transparent'} >{children}</Paint>
//     );
// };
export const Black = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
`
export const Gray = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colorSet.primary_01};
`

export const Lightgray = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colorSet.lineMedium};
`

export const White = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
`
export const Transparent = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
`
export const BtnBg = { Black, Gray, Lightgray, White, Transparent };

// export const Paint = styled.div<{ bg: string, hover?: string }>`
//     width: 100%;
//     height: 100%;
//     background-color: ${({ bg }) => bg};
// `