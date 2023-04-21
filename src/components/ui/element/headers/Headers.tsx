import React from 'react'
import styled from 'styled-components'
import { HEADING_1 } from '../../../../custom/ym/variables'
import { ChildrenForSpan } from '../../../../custom/ym/types'
import { HFlex } from '../../../../custom/ym/styleStore'


const JustTitle = ({ children, ...props }: ChildrenForSpan) => {
    return (
        <HeaderContainer>
            <HFlex etc='padding:10px 20px;'>
                <TitleSpan>{children}</TitleSpan>
            </HFlex>
        </HeaderContainer>
    )
}

export const Headers = { JustTitle }


const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
`
const TitleSpan = styled.span`
    font-size: ${HEADING_1.fontSize};
    line-height: ${HEADING_1.lineHeight};
    font-weight: ${HEADING_1.fontWeight};
    color : 'black';
`