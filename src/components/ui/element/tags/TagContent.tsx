import React from 'react'
import styled from 'styled-components';
import { BODY_3 } from '../../../../custom/ym/variables';
import { ChildrenForBtnContents } from '../../../../custom/ym/types';

const Default = ({ children }: ChildrenForBtnContents) => {
    return (
        <FontStyle>{children}</FontStyle>
    )
}

export const TagContent = { Default };


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