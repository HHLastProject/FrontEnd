import React from 'react'
import { BG_MEDIUM, LINE_LIGHT, PRIMARY_01 } from '../../../../custom/ym/variables'
import styled from 'styled-components'
import { ChildrenForJSX } from '../../../../custom/ym/types'
import { colorSet } from '../../styles/color'


const LineLight = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bc={`${colorSet.lineMedium}`}>{children}</Paint>
    )
}
const Primary01 = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bc={`${colorSet.primary_01}`}>{children}</Paint>
    )
}
const BgMedium = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bc={`${colorSet.bgMedium}`}>{children}</Paint>
    )
}

const White = ({ children }: ChildrenForJSX) => {
    return (
        <Paint bc={`white`}>{children}</Paint>
    )
}
export const TagBg = { LineLight, Primary01, BgMedium, White };

const Paint = styled.div<{ bc: string }>`
    width: fit-content;
    height: fit-content;
    background-color: ${({ bc }) => bc};
`