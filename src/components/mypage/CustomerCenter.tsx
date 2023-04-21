import React from 'react'
import { VFlex } from '../../custom/ym/styleStore'
import styled from 'styled-components';
import { BODY_4 } from '../../custom/ym/variables';
import CenterContents from './CenterContents';

const CustomerCenter = () => {
    return (
        <VFlex gap='12px'>
            <Title>고객 센터</Title>
            <CenterContents />
        </VFlex>
    )
}

export default CustomerCenter;

const Title = styled.span`
    font-size: ${BODY_4.fontSize};
    line-height: ${BODY_4.lineHeight};
    font-weight: ${BODY_4.fontWeight};
    color: ${BODY_4.color};
`