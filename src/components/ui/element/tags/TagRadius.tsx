import React from 'react'
import styled from 'styled-components'
import { ChildrenForJSX } from '../../../../custom/ym/types'
import { colorSet } from '../../styles/color'

const Default = ({ children }: ChildrenForJSX) => {
    return (
        <Round hasBorder={false}>{children}</Round>
    )
}

const BorderColor = ({ children }: ChildrenForJSX) => {
    return (
        <Round hasBorder={true}>{children}</Round>
    )
}

export const TagRadius = { Default, BorderColor };

const Round = styled.div<{ hasBorder: boolean }>`
    flex:none;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    border: ${({ hasBorder }) => hasBorder ? `1px solid ${colorSet.lineMedium}` : 'none'};
    border-radius: 100px;
`
