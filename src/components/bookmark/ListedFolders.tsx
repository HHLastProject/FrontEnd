import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import EachFolder from './EachFolder';
import { useMutation } from '@tanstack/react-query';
import { scrapKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { apiPath } from '../../shared/path';
import { queryClient } from '../..';
import { FolderData } from '../../custom/ym/types';
import NoExistFolders from './NoExistFolders';

const ListedFolders = ({
    list,
    dispatch
}: {
    list: FolderData[],
    dispatch: React.Dispatch<React.SetStateAction<FolderData[]>>
}) => {

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
    useEffect(() => {
        console.log('등록 후 list :', list);
        const payload = { folderList: list };
        mutate(payload);
    }, [list]);

    return (
        <ContentsContanier>
            {list.map((element, index) => {
                return <EachFolder
                    name={element}
                    dispatch={dispatch}
                    index={index}
                />
            })}
        </ContentsContanier>
    )
}

export default ListedFolders;

const ContentsContanier = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 100%;
    background-color: white;
`