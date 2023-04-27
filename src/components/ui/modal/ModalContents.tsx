import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { VFlex } from '../../../custom/ym/styleStore';
import ModalContentsCover from './ModalContentsCover';
import { BODY_1 } from '../../../custom/ym/variables';
import { queryClient } from '../../..';
import { useMutation } from '@tanstack/react-query';
import { feedKeys, scrapKeys } from '../../../apis/queries';
import { api_token } from '../../../shared/api';
import { useNavigate } from 'react-router-dom';
import { BtnRadius } from '../element/buttons/BtnRadius';
import { Inputs } from '../element/input/Inputs';
import { Buttons } from '../element/buttons/Buttons';
import { FolderData, ReceivedBookmarks } from '../../../custom/ym/types';
import { apiPath } from '../../../shared/path';

const FeedModalContents = ({ target }: { target: number }) => {

    const navi = useNavigate();

    const { mutate } = useMutation({
        mutationKey: feedKeys.DELETE_MYFEED,
        mutationFn: async (feedId: number) => {
            const res = await api_token.delete(`/api/mypage/${feedId}`);
            console.log(res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["GET_USER_FEED"]);
        }
    })

    const deleteFeedHandler = () => {
        mutate(target);
        navi('/mypage');
    }
    return (
        <ModalContentsContainer>
            <VFlex>
                <ModalContentsCover />
                <FeedSelector>
                    <FeedSelectorLabel>수정하기</FeedSelectorLabel>
                </FeedSelector>
                <FeedSelector>
                    <BtnRadius.Default onClick={deleteFeedHandler}>
                        <FeedSelectorLabel>삭제하기</FeedSelectorLabel>
                    </BtnRadius.Default>
                </FeedSelector>
            </VFlex>
        </ModalContentsContainer>
    )
}

const CreateFolderModalContents = ({
    dispatch,
    listDispatch
}: {
    dispatch: React.Dispatch<React.SetStateAction<boolean>>,
    listDispatch: React.Dispatch<React.SetStateAction<FolderData[]>>
}) => {
    const [newFolder, setNewFolder] = useState<string>('');
    const [validate, setValidate] = useState<boolean>(false);
    const [beforeList, setBeforeList] = useState<string[]>(['']);

    const { mutate } = useMutation({
        mutationKey: scrapKeys.POST_FOLDER,
        mutationFn: async (payload: object) => {
            const res = await api_token.post(apiPath.createScrapFolder, payload);
            console.log('생성 결과', res);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(scrapKeys.GET_SCRAP);
        }
    })

    const checkValidation = (text: string) => {
        return beforeList.filter((element) => element !== text).length === beforeList.length
            ? true
            : false;
    }

    const addListHandler = () => {
        const payload = {
            folderList: [...beforeList, newFolder]
        }
        mutate(payload);
        dispatch(prev => false);
    }

    useEffect(() => {
        !queryClient.getQueryData(scrapKeys.GET_SCRAP) && queryClient.refetchQueries({
            queryKey: scrapKeys.GET_SCRAP,
            type: 'inactive',
            exact: true
        });
        const data = queryClient.getQueryData(scrapKeys.GET_SCRAP) as ReceivedBookmarks;
        const pickoutFolderNames = data.folderList.map((element) => element.folderName);
        setBeforeList(pickoutFolderNames);
    }, []);

    useEffect(() => {
        checkValidation(newFolder)
            ? setValidate(true)
            : setValidate(false);
    }, [newFolder]);

    return (
        <ModalContentsContainer>
            <VFlex>
                <ModalContentsCover />
                <FolderEditArea>
                    <VFlex gap='12px' etc="align-items: center; margin-top : 20px;">
                        <Inputs.CreateFolder
                            value={newFolder}
                            dispatch={setNewFolder as React.Dispatch<React.SetStateAction<string>>}
                            disableDispatch={setValidate}
                        />
                        {validate
                            ? <Buttons.Large.Default onClick={addListHandler}>완료</Buttons.Large.Default>
                            : <Buttons.Large.Inactive disabled>완료</Buttons.Large.Inactive>}
                    </VFlex>
                </FolderEditArea>
            </VFlex>
        </ModalContentsContainer>
    )
}

export const ModalContents = { FeedModalContents, CreateFolderModalContents };

const FolderEditArea = styled.div`
    height: fit-content;
    min-height: 772px;
    width: 100%;
    background-color:white;
`

const FeedSelectorLabel = styled.span`
    font-size: ${BODY_1.fontSize};
    line-height: ${BODY_1.lineHeight};
    font-weight: ${BODY_1.fontWeight};
    color: black;
`

const ModalContentsContainer = styled.div`
    position: absolute;
    bottom: 0px;
    left: 50%-195px;
    width: 390px;
    height: fit-content;
`
const FeedSelector = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 62px;
    padding: 20px;
    padding-right: auto;
    background-color: white;
`