import React from 'react'
import styled from 'styled-components';
import { colorSet } from './ui/styles/color';
type Prop = {
    children: JSX.Element
}
const BigSizingBox = ({ children }: Prop) => {
    return (
        <Sizing>{children}</Sizing>
    )
}

export default BigSizingBox;

const Sizing = styled.div`
    width: 350px;
    height: 350px;
    background-color: ${colorSet.lineMedium};
`