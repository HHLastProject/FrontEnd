import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Headers } from '../components/ui/element/headers/Headers';
import NoExistFolders from '../components/bookmark/NoExistFolders';
import ListedFolders from '../components/bookmark/ListedFolders';

const FolderList = () => {

    const [list, setList] = useState<string[]>(['']);

    useEffect(() => {
        const listFromLocal = localStorage.getItem("FolderList")
            ? localStorage.getItem("FolderList")?.split(" ")
            : null;
        listFromLocal && listFromLocal?.pop();
        setList(prev => listFromLocal as string[]);
    }, []);

    return (
        <FolderListContainer>
            <Headers.FolderListHeader />
            {list?.length === 0 ? <NoExistFolders /> : <ListedFolders list={list} dispatch={setList} />}
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