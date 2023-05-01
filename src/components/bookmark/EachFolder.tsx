import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { HFlex, HFlexSpaceBetween, VFlex, VFlexCenter } from '../../custom/ym/styleStore';
import { BODY_1 } from '../../custom/ym/variables';
import { Buttons } from '../ui/element/buttons/Buttons';
import { colorSet } from '../ui/styles/color';
import { EachFolderProps } from '../../custom/ym/types';
import { useMutation } from '@tanstack/react-query';
import { scrapKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { apiPath } from '../../shared/path';
import { queryClient } from '../..';

const EachFolder = ({
    name,
    dispatch,
    index,
    ...props }: EachFolderProps) => {

    const { mutate } = useMutation({
        mutationKey: scrapKeys.DELETE_FOLDER,
        mutationFn: async (folderNumber: number) => {
            const res = await api_token.delete(apiPath.deleteScrapFolder + `/${folderNumber}`);
            console.log(res);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(scrapKeys.GET_SCRAP);
        }
    })

    const deleteClickHandler = () => {
        dispatch(prev => [...prev].filter((element) => element !== name));
        mutate(name.folderId);
    };

    const moveClickHandler = (direction: string, index: number) => {
        console.log(index);
        if (direction === "down") {
            dispatch(prev => {
                if (prev.length - 1 === index) {
                    return prev;
                } else {
                    const temp = [...prev];
                    const prevValue = temp[index];
                    temp[index] = temp[index + 1];
                    temp[index + 1] = prevValue;
                    return temp;
                }
            });
        } else if (direction === "up") {
            dispatch(prev => {
                if (index === 0) {
                    return prev;
                } else {
                    const temp = [...prev];
                    const prevValue = temp[index];
                    temp[index] = temp[index - 1];
                    temp[index - 1] = prevValue;
                    return temp;
                }
            })
        };
    };

    return (
        <Container draggable>
            <VFlexCenter>
                <HFlexSpaceBetween height='56px' etc='flex:1;'>
                    <FolderName>{name.folderName}</FolderName>
                    <HFlex gap="16px" width='fit-content'>
                        <Buttons.Others.IconButton
                            width={24}
                            height={24}
                            onClick={deleteClickHandler}
                            fileName='delete_folder.png' />
                        <Buttons.Others.IconButton
                            width={24}
                            height={24}
                            onClick={() => moveClickHandler("up", index)}
                            fileName='move_up.png' />
                        <Buttons.Others.IconButton
                            width={24}
                            height={24}
                            onClick={() => moveClickHandler("down", index)}
                            fileName='move_down.png' />
                        {/* 향후 드래그 앤 드롭이 들어갈 경우의 버튼
                            <Buttons.Others.IconButton
                            ref={triggerRef}
                            width={24}
                            height={24}
                            onClick={() => downClickHandler(index)}
                            fileName='pulling_bar.png' /> */}
                    </HFlex>
                </HFlexSpaceBetween>
                <Bar />
            </VFlexCenter>
        </Container >
    )
}

export default EachFolder;
const Bar = styled.div`
    flex : none;
    width: 353px;
    height: 1px;
    margin: 0;
    padding: 0;
    background-color: ${colorSet.lineLight};
`
const FolderName = styled.span`
    font-size: ${BODY_1.fontSize};
    line-height: ${BODY_1.lineHeight};
    font-weight: ${BODY_1.fontWeight};
    color : black;
`

const Container = styled.div`
    width: 100%;
    height: 56px;
    padding: 0px 20px;
    background-color: white;
    box-sizing: border-box;
`