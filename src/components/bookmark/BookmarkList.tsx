import React, { useEffect, useState } from 'react'
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

const BookmarkList = () => {
    // const [category, setCategory] = useState<categoryTypes | null>(null);
    const [folder, setFolder] = useState<FolderData | null>();
    const [folderList, setFolderList] = useState<FolderData[]>([]);
    const [scrapList, setScrapList] = useState<ScrapListEachData[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const { data, refetch, isSuccess, isError } = useQuery({
        queryKey: scrapKeys.GET_SCRAP,
        queryFn: async () => {
            const res = await api_token.get(apiPath.scrapList);
            console.log('데이터', res.data);
            return res.data as ReceivedBookmarks;
        },
        onSuccess(data) {
            setScrapList(data.scrapList);
            setFolderList(data.folderList);
            setFolder(data.folderList[0]);
            return data;
        },
        onError(err) {
            throw err;
        },
    });

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
        refetch();
        localStorage.getItem("access_token") && setIsLogin(prev => !prev);
        data?.folderList && setFolderList(data?.folderList);
        // const folderListForMap = data?.folderList as FolderData[];
        // localStorage.setItem("FolderList", `${data?.folderList}`);
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