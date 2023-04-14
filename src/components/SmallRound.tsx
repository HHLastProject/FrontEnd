import React from 'react'
import styled from 'styled-components'
type Prop = {
  children: JSX.Element
}
const SmallRound = ({ children }: Prop) => {
  return (
    <Rounding>{children}</Rounding>
  )
}

export default SmallRound;

const Rounding = styled.div`
    flex: none;
    width: fit-content;
    height: fit-content;
    border: none;
    border-radius: 12px;
    overflow: hidden;
`