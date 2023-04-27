import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Headers } from '../components/ui/element/headers/Headers';
import NoExistFolders from '../components/bookmark/NoExistFolders';
import ListedFolders from '../components/bookmark/ListedFolders';
import { Modals } from '../components/ui/modal/Modals';
import { queryClient } from '..';
import { scrapKeys } from '../apis/queries';
import { ReceivedBookmarks } from '../custom/ym/types';

const FolderList = () => {

    const [folderList, setFolderList] = useState<string[]>(['']);
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        !queryClient.getQueryData(scrapKeys.GET_SCRAP) && queryClient.refetchQueries({
            queryKey: scrapKeys.GET_SCRAP,
            type: 'inactive',
            exact: true
        });
        const data = queryClient.getQueryData(scrapKeys.GET_SCRAP) as ReceivedBookmarks;
        const folderList = data.folderList;
        setFolderList(folderList);
        // const listFromLocal = localStorage.getItem("FolderList")
        //     ? localStorage.getItem("FolderList")?.split(",")
        //     : null;
        // setList(prev => listFromLocal as string[]);
    }, []);

    useEffect(() => {
        localStorage.setItem("FolderList", `${folderList}`);
        // console.log('완료후:', folderList);
    }, [folderList]);

    return (
        <FolderListContainer>
            {modal ? <Modals.CreateFolder dispatch={setModal} listDispatch={setFolderList} /> : null}
            <Headers.FolderListHeader dispatch={setModal} />
            {folderList === null ? <NoExistFolders /> : <ListedFolders list={folderList} dispatch={setFolderList} />}
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