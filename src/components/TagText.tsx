import React from 'react'
import styled from 'styled-components'
import { BG_MEDIUM, BODY_3 } from '../custom/ym/variables'

type Prop = {
  children: string
}

const TagText = ({ children }: Prop) => {
  return (
    <TagSize>{children}</TagSize>
  )
}

export default TagText;

const TagSize = styled.span`
    width: fit-content;
    height: fit-content;
    font-family: "Pretendard";
    font-size: ${BODY_3.fontSize};
    line-height: ${BODY_3.lineHeight};
    font-weight: ${BODY_3.fontWeight};
    color:${BODY_3.color};
`