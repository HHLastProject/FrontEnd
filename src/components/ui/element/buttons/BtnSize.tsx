import React from 'react'
import { ChildrenForJSX } from '../../../../custom/ym/types'
import styled from 'styled-components';

const Large = ({ children }: ChildrenForJSX) => {
    return (
        <LargeContainer>{children}</LargeContainer>
    )
}

// const Medium = ({ children }: ChildrenForJSX) => {
//     return (
//         <MediumContainer>{children}</MediumContainer>
//     )
// }


const Small = ({ children }: ChildrenForJSX) => {
    return (
        <SmallContainer>{children}</SmallContainer>
    )
}

const Nav = ({ children }: ChildrenForJSX) => {
    return (
        <NavContainer>{children}</NavContainer>
    )
}




const NavContainer = styled.div`
    width: 100%;
    height: 56px;
`

const LargeContainer = styled.div`
    width: 100%;
    height: 56px;
`
export const Medium = styled.div`
    width: 100%;
    height: 44px;
`
const SmallContainer = styled.div`
    width: 100%;
    height: 32px;
`

export const BtnSize = { Large, Medium, Small, Nav };
