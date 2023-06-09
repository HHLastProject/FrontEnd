import React from 'react'
import styled from 'styled-components'
import { ChildrenForJSX } from '../../../../custom/ym/types'


const Tag = ({ children }: ChildrenForJSX) => {
    return (
        <TagSizing>{children}</TagSizing>
    )
}

const Category = ({ children }: ChildrenForJSX) => {
    return (
        <CategorySizing>{children}</CategorySizing>
    )
}

export const TagSize = { Tag, Category };

const TagSizing = styled.div`
    white-space: nowrap;
    width: fit-content;
    height: fit-content;
    min-width: 44px;
    padding: 7px 12px;
`

export const CategorySizing = styled.div`
    white-space: nowrap;
    width: fit-content;
    height: fit-content;
    min-width: 44px;
    padding: 8px 12px;
`