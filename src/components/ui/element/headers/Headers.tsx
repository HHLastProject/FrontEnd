import React from 'react'
import styled from 'styled-components'
import { HEADING_1, TITLE_4 } from '../../../../custom/ym/variables'
import { ChildrenForSpan, PropsForSpaceHeader } from '../../../../custom/ym/types'
import { HFlex, HFlexSpaceBetween } from '../../../../custom/ym/styleStore'
import { Buttons } from '../buttons/Buttons'
import { colorSet } from '../../styles/color'
import { BtnBorder } from '../buttons/BtnBorder'
import { BtnRadius } from '../buttons/BtnRadius'


const JustTitle = ({ children, ...props }: ChildrenForSpan) => {
    return (
        <HeaderContainer>
            <HFlex etc='padding:10px 20px;'>
                <TitleSpan>{children}</TitleSpan>
            </HFlex>
        </HeaderContainer>
    )
}

const BackAndFinish = ({ children, BackOnClick, RightOnClick, state, ...props }: PropsForSpaceHeader) => {
    // console.log("disabled", disabled);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        RightOnClick(e)
    }
    return (
        <HeaderContainer>
            <HFlexSpaceBetween etc='padding:10px 20px;'>
                <Buttons.Others.IconButton
                    width={24}
                    height={24}
                    onClick={BackOnClick}
                    fileName='back_24.png'
                />
                <BtnRadius.Default onClick={RightOnClick} disabled={state as boolean}>
                    <FinishText able={state as boolean}>{children}</FinishText>
                </BtnRadius.Default>
                {/* <Button onClick={clickHandler} disabled>
                    <span>{children}</span>
                </Button> */}
            </HFlexSpaceBetween>
        </HeaderContainer>
    )
}

export const Headers = { JustTitle, BackAndFinish }

const Button = styled.button`
    border: none;
    background-color: none;
    padding: 0;
    margin: 0;
`

const FinishText = styled.span<{ able: boolean }>`
    font-size: ${TITLE_4.fontSize};
    line-height: ${TITLE_4.lineHeight};
    font-weight: ${TITLE_4.fontWeight};
    color : ${({ able }) => able ? colorSet.textLight : colorSet.blue}
`

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