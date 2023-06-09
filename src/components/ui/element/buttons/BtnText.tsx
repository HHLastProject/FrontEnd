import React from 'react'
import { ChildrenForJSX } from '../../../../custom/ym/types';
import styled from 'styled-components';
import { fontType } from '../../styles/typo';

// const Large = ({ children }: ChildrenForJSX) => {
//     return (
//         <Title4>{children}</Title4>
//     )
// }
// const Medium = ({ children }: ChildrenForJSX) => {
//     return (
//         <Title5>{children}</Title5>
//     )
// }
// const Small = ({ children }: ChildrenForJSX) => {
//     return (
//         <Body4>{children}</Body4>
//     )
// }

const Large = styled.div`
    font-size: ${fontType.title_4.fontSize};
    line-height: ${fontType.title_4.lineHeight};
    font-weight: ${fontType.title_4.fontWeight};
`

const Medium = styled.div`
    font-size: ${fontType.title_5.fontSize};
    line-height: ${fontType.title_5.lineHeight};
    font-weight: ${fontType.title_5.fontWeight};
`

const Small = styled.div`
    font-size: ${fontType.body_4.fontSize};
    line-height: ${fontType.body_4.lineHeight};
    font-weight: ${fontType.body_4.fontWeight};
`

export const BtnText = { Large, Medium, Small };

// const Large = styled.div`
//     font-size: ${fontType.title_4.fontSize};
//     line-height: ${fontType.title_4.lineHeight};
//     font-weight: ${fontType.title_4.fontWeight};
// `

// export const Medium = styled.div`
//     font-size: ${fontType.title_5.fontSize};
//     line-height: ${fontType.title_5.lineHeight};
//     font-weight: ${fontType.title_5.fontWeight};
// `

// const Small = styled.div`
//     font-size: ${fontType.body_4.fontSize};
//     line-height: ${fontType.body_4.lineHeight};
//     font-weight: ${fontType.body_4.fontWeight};
// `