import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Headers } from '../components/ui/element/headers/Headers';
import NoExistFolders from '../components/bookmark/NoExistFolders';
import ListedFolders from '../components/bookmark/ListedFolders';
import { Modals } from '../components/ui/modal/Modals';
import { queryClient } from '..';
import { scrapKeys } from '../apis/queries';
import { FolderData, ReceivedBookmarks } from '../custom/ym/types';
import useScrapData from '../hooks/useGetScrapData';

const FolderList = () => {

    const [folderList, setFolderList] = useState<FolderData[]>();
    const [modal, setModal] = useState<boolean>(false);
    const { scrapData } = useScrapData()


    useEffect(() => {
        const queriedData = scrapData?.folderList;
        setFolderList(queriedData);
    }, []);

    return (
        <FolderListContainer>
            {
                modal
                    ? <Modals.CreateFolder
                        dispatch={setModal}
                        listDispatch={setFolderList as React.Dispatch<React.SetStateAction<FolderData[]>>}
                    /> : null
            }
            <Headers.FolderListHeader dispatch={setModal} />
            {
                !folderList
                    ? <NoExistFolders />
                    : <ListedFolders
                        list={folderList}
                        dispatch={setFolderList as React.Dispatch<React.SetStateAction<FolderData[]>>} />
            }
        </FolderListContainer>
    )
}

export default FolderList;


const FolderListContainer = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 100%;
    background-color: white;
`