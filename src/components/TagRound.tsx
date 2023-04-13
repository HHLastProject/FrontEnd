import React from 'react'
import styled from 'styled-components'
type Prop = {
    children: JSX.Element
}
const TagRound = ({ children }: Prop) => {
    return (
        <Round>{children}</Round>
    )
}

export default TagRound;

const Round = styled.div`
    flex:none;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    border: none;
    border-radius: 100px;
`