import React from 'react'
import styled from 'styled-components'
type Prop = {
    children: JSX.Element
}
const TagSize = ({ children }: Prop) => {
    return (
        <Sizing>{children}</Sizing>
    )
}

export default TagSize;

const Sizing = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 7px 12px;
`