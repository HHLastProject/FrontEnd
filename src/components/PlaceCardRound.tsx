import React from 'react'
import styled from 'styled-components'
import { LINE_MEDIUM } from '../custom/ym/variables'
type Prop = {
    children: JSX.Element
}
const PlaceCardRound = ({ children }: Prop) => {

    return (
        <Round>{children}</Round>
    )
}

export default PlaceCardRound;

const Round = styled.div`
    width: 100%;
    height: 60px;
    overflow: hidden;
    border : 1px solid ${`#${LINE_MEDIUM}`};
    border-radius : 8px;
`