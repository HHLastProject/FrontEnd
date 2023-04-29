import React, { useContext, useEffect, useState } from 'react'
import { HFlex } from '../../custom/ym/styleStore'
import { FILTER_LIST } from '../../custom/ym/variables'
import { Categories } from '../ui/element/tags/Categories'
import uuid from 'react-uuid'
import { FolderData, ReceivedBookmarks, ScrapListEachData, categoryTypes } from '../../custom/ym/types'
import BookmarkLoginComp from './BookmarkLoginComp'
import BookmarkLogoutComp from './BookmarkLogoutComp'
import { bookmarkData } from '../../custom/ym/dummydata'
import { useQuery } from '@tanstack/react-query'
import { api_token } from '../../shared/api'
import { apiPath } from '../../shared/path'
import { scrapKeys } from '../../apis/queries'
import { queryClient } from '../..'
import useScrapData from '../../hooks/useScrapData'
import { ScrapContext } from '../../pages/Bookmark'

const BookmarkList = () => {

    const [folder, setFolder] = useState<FolderData | null>();
    const [folderList, setFolderList] = useState<FolderData[]>([]);
    // const [scrapList, setScrapList] = useState<ScrapListEachData[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const { queryData } = useContext(ScrapContext);
    const { scrapData, refetchScrapQuery, isSuccess, isError } = useScrapData();

    const folderClickHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
        element: FolderData
    ) => {
        if (isLogin) {
            element.folderName === folder?.folderName
                ? setFolder(null)
                : setFolder(element)
        }
    }

    useEffect(() => {
        const data = scrapData as ReceivedBookmarks;
        console.log('폴더리스트:', data);
        setFolder(data?.folderList[0]);
        localStorage.getItem("access_token") && setIsLogin(prev => !prev);
        data?.folderList && setFolderList(data?.folderList);
    }, [])

    return (
        <>
            <HFlex gap='2px' height='fit-content' etc="padding:8px 20px;">
                {
                    folderList.length > 0 && folderList.map((element) => {
                        if (folder === element) {
                            return (
                                <Categories.Active
                                    key={uuid()}
                                    name={element.folderName}
                                    onClick={(e) => folderClickHandler(e, element)}
                                >{element.folderName}</Categories.Active>
                            );
                        } else {
                            return (
                                <Categories.Inactive
                                    key={uuid()}
                                    name={element.folderName}
                                    onClick={(e) => folderClickHandler(e, element)}
                                >{element.folderName}</Categories.Inactive>
                            )
                        }
                    })
                }
            </HFlex>
            {
                isLogin
                    ? <BookmarkLoginComp folderState={folder as FolderData} />
                    : <BookmarkLogoutComp />
            }
        </>
    )
}

export default BookmarkList