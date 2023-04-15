import React from 'react'
import styled from 'styled-components';
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
`