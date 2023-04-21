import React from 'react'
import styled from 'styled-components';
type Prop = {
    children: JSX.Element
}
const BiasedRound = ({ children }: Prop) => {
    return (
        <Round>{children}</Round>
    )
}

export default BiasedRound;

const Round = styled.div`
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    border: none;
    border-top-right-radius: 60px;
`