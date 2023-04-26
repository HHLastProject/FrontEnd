import React, { useEffect } from 'react'
import styled from 'styled-components';
import { HFlexSpaceBetween } from '../../../../custom/ym/styleStore';
import { BODY_3 } from '../../../../custom/ym/variables';
import { colorSet } from '../../styles/color';
import { Buttons } from '../buttons/Buttons';
import { TossedFeedData } from '../../../../custom/ym/types';
import { queryClient } from '../../../..';

type InputTextRenameProps = {
    value: string,
    dispatch: React.Dispatch<React.SetStateAction<string>>,
    disableDispatch: React.Dispatch<React.SetStateAction<boolean>>
}

interface MypageQueryData {
    feedCount: number,
    feeds: { feadId: number, feedPic: string }[],
    nickname: string,
    profilePic: string
}

const InputTextRename = ({ value, dispatch, disableDispatch }: InputTextRenameProps) => {

    const nickname = localStorage.getItem("nickname");
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(prev => e.target.value);

        if (e.target.value === nickname) {
            disableDispatch(prev => true);
        } else if (e.target.value === "") {
            disableDispatch(prev => true);
        } else {
            disableDispatch(prev => false);
        }
    }

    const deleteClickHandler = () => {
        dispatch(prev => "");
        disableDispatch(prev => true);
    }

    return (
        <InputBox>
            <HFlexSpaceBetween gap='20px' height={"100%"}>
                <Input value={value} onChange={inputChangeHandler} placeholder='닉네임' />
                <Buttons.Others.IconButton
                    width={16}
                    height={16}
                    onClick={deleteClickHandler}
                    fileName='x gray_16.png'
                />
            </HFlexSpaceBetween>
        </InputBox>
    )
}

export default InputTextRename;

const Input = styled.input`
    width: 300px;
    height: fit-content;
    font-size: ${BODY_3.fontSize};
    line-height: ${BODY_3.lineHeight};
    font-weight: ${BODY_3.fontWeight};
    color: ${colorSet.textStrong};
    border: none;
    padding: 0px;
    margin : 0px;
`

const InputBox = styled.div`
    width : 318px;
    height: 20px;
    border-radius: 8px;
    padding : 16px;
    border : 1px solid ${colorSet.lineMedium};
`;