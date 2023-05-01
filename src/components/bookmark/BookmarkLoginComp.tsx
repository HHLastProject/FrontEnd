import React, { useContext, useEffect, useState } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import BookmarkCard from '../ui/element/cards/BookmarkCard';
import uuid from 'react-uuid';
import { FolderData, FolderProp, ReceivedBookmarks, ScrapListEachData } from '../../custom/ym/types';
import NoExistBookmark from './NoExistBookmark';
import { useNavigate } from 'react-router-dom';
import { bookmarkData } from '../../custom/ym/dummydata';
import useScrapData from '../../hooks/useScrapData';
import { ScrapContext } from '../../pages/Bookmark';

const BookmarkLoginComp = ({ folderState }: FolderProp) => {

    const navi = useNavigate();
    const { scrapList, queryData } = useContext(ScrapContext);

    const [folderList, setFolderList] = useState<FolderData[]>();

    const [checkedList, setCheckedList] = useState<number>(0);

    const { scrapData, refetchScrapQuery, isSuccess, isError } = useScrapData();

    useEffect(() => {
        // console.log('쿼리데이터', queryData);
        const data = scrapData as ReceivedBookmarks;
        const fl = data?.folderList;
        const copy = {
            folderList: fl?.map((element) => element)
        };
        const folders = copy?.folderList;
        setFolderList(prev => folders);
    }, [scrapList]);


    return (
        <>
            {scrapList
                ? <VFlex height='fit-content' gap='20px' etc="padding:20px; flex:none;">
                    {scrapList?.filter((element) => {
                        const targetFolder = folderState?.folderName === "" ? null : folderState?.folderName;
                        return element.folderName === targetFolder;
                    }).length > 0
                        ? scrapList?.map((element, index) => {
                            const targetFolder = folderState?.folderName === "" ? null : folderState?.folderName;
                            return element.folderName === targetFolder
                                ? <BookmarkCard key={uuid()} data={element} idx={index} />
                                : null;
                        })
                        : <NoExistBookmark />}
                </VFlex>
                : null}
        </>

    )
}

export default BookmarkLoginComp;
// export default BookmarkLoginComp;