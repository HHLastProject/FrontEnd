import React from 'react'
import { ChildrenForJSX } from '../../../../custom/ym/types'
import styled from 'styled-components';
import { colorSet } from '../../styles/color';

const Default = ({ children }: ChildrenForJSX) => {
    return (
        <Border>{children}</Border>
    )
}

export const BtnBorder = { Default };

const Border = styled.div`
    width: fit-content;
    height: fit-content;
    border : 1px solid ${colorSet.lineMedium};
`