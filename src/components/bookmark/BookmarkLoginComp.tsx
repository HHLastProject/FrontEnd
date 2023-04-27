import React, { useEffect, useState } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import { FILTER_LIST, SAMPLE_DATA } from '../../custom/ym/variables';
import BookmarkCard from '../ui/element/cards/BookmarkCard';
import uuid from 'react-uuid';
import { EachData, FolderData, FolderProp, ReceivedBookmarks, ScrapDataSet, ScrapListEachData } from '../../custom/ym/types';
import NoExistBookmark from './NoExistBookmark';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { scrapKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { apiPath } from '../../shared/path';
import { bookmarkData } from '../../custom/ym/dummydata';
import { queryClient } from '../..';

const BookmarkLoginComp = ({ folderState }: FolderProp) => {

    const navi = useNavigate();

    const [scrapList, setScrapList] = useState<ScrapListEachData[]>(bookmarkData.scrapList);
    const [folderList, setFolderList] = useState<FolderData[]>();

    // const pickoutFolderName = (arr: FolderData[]) => {
    //     const result = arr.map((element) => {
    //         return element.folderName;
    //     });

    //     setFolderList(prev => [...prev, ...result]);
    // }

    useEffect(() => {
        queryClient.refetchQueries({ queryKey: scrapKeys.GET_SCRAP, type: 'inactive', exact: true });
        if (queryClient.getQueryData(scrapKeys.GET_SCRAP)) {
            queryClient.refetchQueries();

            const receivedQueryData = queryClient.getQueryData(scrapKeys.GET_SCRAP) as ReceivedBookmarks;
            const scraps = receivedQueryData.scrapList;
            const folders = receivedQueryData.folderList;

            setScrapList(prev => scraps);
            setFolderList(folders);
            // console.log("BookmarkLoginComp scrapList:", scrapList);
            // console.log("BookmarkLoginComp folderList:", folderList);
        } else {
            alert("캐시가 만료되어 새로고침이 필요합니다.");
            navi('/');
            // window.location.reload();
        }
    }, []);

    // const sampleData: ScrapListEachData[] = scrapList.filter((element) => element.folderName === folderState)

    return (
        <VFlex height='fit-content' gap='20px' etc="padding:20px; flex:none;">
            {scrapList.filter((element) => {
                const targetFolder = folderState?.folderName === "" ? null : folderState?.folderName;
                return element.folderName === targetFolder;
            }).length > 0
                ? scrapList?.map((element) => {
                    const targetFolder = folderState?.folderName === "" ? null : folderState?.folderName;
                    return element.folderName === targetFolder
                        ? <BookmarkCard key={uuid()} data={element} />
                        : null;
                })
                : <NoExistBookmark />}
        </VFlex>
    )
}

export default BookmarkLoginComp