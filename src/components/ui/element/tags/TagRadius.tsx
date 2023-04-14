import React from 'react'
import styled from 'styled-components'
import { ChildrenForJSX } from '../../../../custom/ym/types'

const Default = ({ children }: ChildrenForJSX) => {
    return (
        <Round>{children}</Round>
    )
}

export const TagRadius = { Default, };

const Round = styled.div`
    flex:none;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    border: none;
    border-radius: 100px;
`