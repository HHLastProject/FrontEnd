import React, { ReactNode } from 'react'
import styled from 'styled-components'

function DefaultWrap({children}: {children: ReactNode}) {
  return (
    <DefaultWrapStyle>{children}</DefaultWrapStyle>
  )
}

export default DefaultWrap

const DefaultWrapStyle = styled.div`
  min-height: 100vh;
  padding: 0 20px;
`;