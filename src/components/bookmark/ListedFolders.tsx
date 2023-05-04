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
import useCreateFolder from '../../hooks/useCreateFolder';

const ListedFolders = ({
    list,
    dispatch
}: {
    list: FolderData[],
    dispatch: React.Dispatch<React.SetStateAction<FolderData[]>>
}) => {

    return (
        <ContentsContanier>
            {list.map((element, index) => {
                if (index === 0) return null;
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