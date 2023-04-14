import React from 'react'
import styled from 'styled-components';

export type InternalJSX = {
    children: JSX.Element
}

const Long = ({ children }: InternalJSX) => {
    return (
        <LongCase>{children}</LongCase>
    );
}

const Medium = ({ children }: InternalJSX) => {
    return (
        <MediumCase>{children}</MediumCase>
    );
}

const Short = ({ children }: InternalJSX) => {
    return (
        <ShortCase>{children}</ShortCase>
    );
}

export const BtnLargeLength = { Long, Medium, Short };


const BtnMediumDefault = ({ children }: InternalJSX) => {
    return (
        <MDCase>{children}</MDCase>
    );
}

const BtnSmallDefault = ({ children }: InternalJSX) => {
    return (
        <SDCase>{children}</SDCase>
    );
}


export const BtnMediumLength = { Default: BtnMediumDefault }
export const BtnSmallLength = { Default: BtnSmallDefault }

const SDCase = styled.div`
    width: 93px;
    height: fit-content;
`

const MDCase = styled.div`
width: 156px;
height: fit-content;
`

const LongCase = styled.div`
    width: 350px;
    height: fit-content;
`
const MediumCase = styled.div`
    width: 240px;
    height: fit-content;
`
const ShortCase = styled.div`
    width: 102px;
    height: fit-content;
`