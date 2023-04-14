import React from 'react'
import styled from 'styled-components';
type Prop = {
    children: JSX.Element
}
const SizingBox = ({ children }: Prop) => {
    return (
        <Box>{children}</Box>
    )
}

export default SizingBox;

const Box = styled.div`
    width: 40px;
    height: 40px;
`
