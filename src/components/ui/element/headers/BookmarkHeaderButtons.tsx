import React from 'react'
import styled from 'styled-components';
import { TITLE_4 } from '../../../../custom/ym/variables';
import { colorSet } from '../../styles/color';
import { BtnRadius } from '../buttons/BtnRadius';
import { Buttons } from '../buttons/Buttons';
import { HFlex } from '../../../../custom/ym/styleStore';
import { useNavigate } from 'react-router-dom';

const BookmarkHeaderButtons = () => {
    const navi = useNavigate();

    const folderListHandler = () => {
        navi('/folder');
    }

    return (
        <HFlex width={'fit-content'} gap={'16px'}>
            <Buttons.Others.IconButton
                width={24}
                height={24}
                onClick={folderListHandler}
                fileName='edit_folder.png'
            />
            <BtnRadius.Default>
                <EditText>편집</EditText>
            </BtnRadius.Default>
        </HFlex>
    )
}

export default BookmarkHeaderButtons;

const EditText = styled.span`
    font-size: ${TITLE_4.fontSize};
    line-height: ${TITLE_4.lineHeight};
    font-weight: ${TITLE_4.fontWeight};
    color: ${colorSet.textMedium};
`