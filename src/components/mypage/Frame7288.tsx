import React from 'react'
import styled from 'styled-components';
import { BG_MEDIUM, BODY_4 } from '../../custom/ym/variables';
import { VFlexCenter } from '../../custom/ym/styleStore';

export type TextBox = {
    children: string | number | undefined,
}
const Frame7288 = ({ children }: TextBox) => {
    return (
        <BoxRound>
            <BoxSize>
                <BoxColor>
                    <VFlexCenter>
                        <Text>{children}</Text>
                    </VFlexCenter>
                </BoxColor>
            </BoxSize>
        </BoxRound>
    )
}

export default Frame7288;

const Text = styled.span`
    font-size: ${BODY_4.fontSize};
    line-height: ${BODY_4.lineHeight};
    font-weight: ${BODY_4.fontWeight};
    color : ${BODY_4.color};
`

const BoxColor = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${`#${BG_MEDIUM}`};
`

const BoxRound = styled.div`
    border-radius: 100px;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
`
const BoxSize = styled.div`
    width: 38px;
    height: 24px;
`