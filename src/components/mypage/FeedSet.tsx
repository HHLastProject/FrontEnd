import React from 'react'
import { HFlex } from '../../custom/ym/styleStore'
import FeedCount from './FeedCount'
import styled from 'styled-components'
import { TITLE_3 } from '../../custom/ym/variables'

type Prop = {
    children: number | undefined
}
const FeedSet = ({ children }: Prop) => {
    return (
        <HFlex gap='4px'>
            <Title>나의 피드</Title>
            <FeedCount>{children}</FeedCount>
        </HFlex>
    )
}

export default FeedSet;

const Title = styled.span`
    font-size: ${TITLE_3.fontSize};
    line-height: ${TITLE_3.lineHeight};
    font-weight: ${TITLE_3.fontWeight};
    color: ${TITLE_3.color};
`