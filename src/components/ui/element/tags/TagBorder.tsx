import React from 'react'
import styled from 'styled-components';
import { colorSet } from '../../styles/color';
import { ChildrenForBtnContents } from '../buttons/BtnContent';
import { ChildrenForJSX } from '../../../../custom/ym/types';

const LineMedium = ({ children }: ChildrenForJSX) => {
    return (
        <Border>{children}</Border>
    )
}

export const TagBorder = { LineMedium };

const Border = styled.div`
    width: fit-content;
    height: fit-content;
    border : 1px solid ${colorSet.lineMedium};
`