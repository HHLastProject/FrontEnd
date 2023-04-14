import React from 'react'
import styled from 'styled-components'
import { BODY_3 } from '../../../../custom/ym/variables'
import { ChildrenForJSX } from '../../../../custom/ym/types'
import { colorSet } from '../../styles/color'


const TextMedium = ({ children }: ChildrenForJSX) => {
  return (
    <GrayText>{children}</GrayText>
  )
}

const White = ({ children }: ChildrenForJSX) => {
  return (
    <WhiteText>{children}</WhiteText>
  )
}

const TextStrongMedium = ({ children }: ChildrenForJSX) => {
  return (
    <BlackText>{children}</BlackText>
  )
}

export const TagTextColor = { TextMedium, White, TextStrongMedium };

const GrayText = styled.span`
  color : ${colorSet.textMedium};
`;

const WhiteText = styled.span`
  color : white;
`;

const BlackText = styled.span`
  color : ${colorSet.textStrongMedium};
`;

const FontStyle = styled.span`
    width: fit-content;
    height: fit-content;
    padding: 0px;
    margin : 0px;

    font-size: ${BODY_3.fontSize};
    line-height: ${BODY_3.lineHeight};
    font-weight: ${BODY_3.fontWeight};
    color : inherit;
`