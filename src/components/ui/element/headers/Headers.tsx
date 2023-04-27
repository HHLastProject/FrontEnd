import React from 'react'
import styled from 'styled-components'
import { HEADING_1, TITLE_4 } from '../../../../custom/ym/variables'
import { ChildrenForSpan, PropsForSpaceHeader } from '../../../../custom/ym/types'
import { HFlex, HFlexSpaceBetween } from '../../../../custom/ym/styleStore'
import { Buttons } from '../buttons/Buttons'
import { colorSet } from '../../styles/color'
import { BtnBorder } from '../buttons/BtnBorder'
import { BtnRadius } from '../buttons/BtnRadius'
import BookmarkHeaderButtons from './BookmarkHeaderButtons'
import { useNavigate } from 'react-router-dom'


const BookmarkHeader = ({ children, ...props }: ChildrenForSpan) => {
    return (
        <HeaderContainer>
            <HFlexSpaceBetween etc='padding:10px 20px;'>
                <TitleSpan>{children}</TitleSpan>
                <BookmarkHeaderButtons />
            </HFlexSpaceBetween>
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
                    <RightButtonText able={state as boolean}>{children}</RightButtonText>
                </BtnRadius.Default>
                {/* <Button onClick={clickHandler} disabled>
                    <span>{children}</span>
                </Button> */}
            </HFlexSpaceBetween>
        </HeaderContainer>
    )
}

const FolderListHeader = ({ dispatch }: { dispatch: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const navi = useNavigate();

    const backClickHandler = () => {
        localStorage.removeItem("FolderList");
        navi(-1);
    }

    const addFolderClickHandler = () => {
        dispatch(prev => true);
    }

    return (
        <HeaderContainer>
            <HFlexSpaceBetween height='100%' etc='padding:0px 20px;'>
                <Buttons.Others.IconButton
                    width={24}
                    height={24}
                    onClick={backClickHandler}
                    fileName='back_24.png'
                />
                <BtnRadius.Default onClick={addFolderClickHandler}>
                    <RightButtonText>폴더추가</RightButtonText>
                </BtnRadius.Default>
            </HFlexSpaceBetween>
        </HeaderContainer>
    )
}

export const Headers = { BookmarkHeader, BackAndFinish, FolderListHeader }

const Button = styled.button`
    border: none;
    background-color: none;
    padding: 0;
    margin: 0;
`

const RightButtonText = styled.span<{ able?: boolean }>`
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