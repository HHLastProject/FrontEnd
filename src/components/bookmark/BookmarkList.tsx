import React, { useEffect, useState } from 'react'
import { HFlex } from '../../custom/ym/styleStore'
import { FILTER_LIST } from '../../custom/ym/variables'
import { Categories } from '../ui/element/tags/Categories'
import uuid from 'react-uuid'
import { ReceivedBookmarks, ScrapListEachData, categoryTypes } from '../../custom/ym/types'
import BookmarkLoginComp from './BookmarkLoginComp'
import BookmarkLogoutComp from './BookmarkLogoutComp'
import { bookmarkData } from '../../custom/ym/dummydata'
import { useQuery } from '@tanstack/react-query'
import { api_token } from '../../shared/api'
import { apiPath } from '../../shared/path'
import { scrapKeys } from '../../apis/queries'

const BookmarkList = () => {
    // const [category, setCategory] = useState<categoryTypes | null>(null);
    const [folder, setFolder] = useState<string | null>("");
    const [folderList, setFolderList] = useState<string[]>([]);
    const [scrapList, setScrapList] = useState<ScrapListEachData[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const { data, refetch, isSuccess, isError } = useQuery({
        queryKey: scrapKeys.GET_SCRAP,
        queryFn: async () => {
            const res = await api_token.get(apiPath.scrapList);
            return res.data as ReceivedBookmarks;
        },
        cacheTime: 60000,
        onSuccess(data) {
            setScrapList(data.scrapList);
            setFolderList(data.folderList);
            return data;
        },
        onError(err) {
            throw err;
        },
    });

    const folderClickHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
        element: string
    ) => {

        if (isLogin) {
            element === folder
                ? setFolder(null)
                : setFolder(element)
        } else;

        console.log(folder);
    }

    useEffect(() => {
        refetch();
        localStorage.getItem("access_token") && setIsLogin(prev => !prev);
        setFolder("즐겨찾기");
        data?.folderList && setFolderList(prev => [...data?.folderList as string[]]);
        localStorage.setItem("FolderList", `${folderList}`);
        // console.log('폴더리스트:', folderList);
    }, [])

    return (
        <>
            <HFlex gap='2px' height='fit-content' etc="padding:8px 20px;">
                {folder
                    ? <Categories.Active
                        name={"즐겨찾기"}
                        onClick={(e) => folderClickHandler(e, "즐겨찾기")}
                    >즐겨찾기</Categories.Active>
                    : <Categories.Inactive
                        name={"즐겨찾기"}
                        onClick={(e) => folderClickHandler(e, "즐겨찾기")}
                    >즐겨찾기</Categories.Inactive>
                }

                {
                    folderList.length > 0 && folderList.map((element) => {
                        if (folder === element) {
                            return (
                                <Categories.Active
                                    key={uuid()}
                                    name={element}
                                    onClick={(e) => folderClickHandler(e, element)}
                                >{element}</Categories.Active>
                            );
                        } else {
                            return (
                                <Categories.Inactive
                                    key={uuid()}
                                    name={element}
                                    onClick={(e) => folderClickHandler(e, element)}
                                >{element}</Categories.Inactive>
                            )
                        }
                    })
                }
            </HFlex>
            {
                isLogin
                    ? <BookmarkLoginComp folderState={folder} />
                    : <BookmarkLogoutComp />
            }
        </>
    )
}

export default BookmarkList