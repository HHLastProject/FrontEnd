import React from 'react'
import { BG_MEDIUM, LINE_LIGHT, PRIMARY_01 } from '../../../../custom/ym/variables'
import styled from 'styled-components'
import { ChildrenForJSX } from '../../../../custom/ym/types'


const LineLight = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bc={`#${LINE_LIGHT}`}>{children}</Paint>
    )
}
const Primary01 = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bc={`#${PRIMARY_01}`}>{children}</Paint>
    )
}
const BgMedium = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bc={`#${BG_MEDIUM}`}>{children}</Paint>
    )
}

export const TagBg = { LineLight, Primary01, BgMedium };

const Paint = styled.div<{ bc: string }>`
    width: fit-content;
    height: fit-content;
    background-color: ${({ bc }) => bc};
`