import React, { useContext, useEffect, useState } from 'react'
import { HFlex } from '../../custom/ym/styleStore'
import { Categories } from '../ui/element/tags/Categories'
import uuid from 'react-uuid'
import { FolderData } from '../../custom/ym/types'
import BookmarkLoginComp from './BookmarkLoginComp'
import BookmarkLogoutComp from './BookmarkLogoutComp'
import { ScrapContext } from '../../pages/Bookmark'

const BookmarkList = () => {

    const [folder, setFolder] = useState<FolderData | null>();
    const [folderList, setFolderList] = useState<FolderData[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const { queryData } = useContext(ScrapContext);

    const folderClickHandler = (element: FolderData) => {
        isLogin && element.folderName === folder?.folderName
            ? setFolder(null)
            : setFolder(element)
    }

    useEffect(() => {
        localStorage.getItem("access_token") && setIsLogin(true);
        setFolderList(queryData?.folderList as FolderData[]);
        setFolder(queryData?.folderList[0]);
    }, [queryData]);


    return (
        <>
            <HFlex gap='4px' height='fit-content' etc="padding:8px 20px;">
                {
                    folderList?.map((element) => {
                        if (folder === element) {
                            return (
                                <Categories.Active
                                    key={uuid()}
                                    name={element.folderName}
                                    onClick={() => folderClickHandler(element)}
                                >{element.folderName}</Categories.Active>
                            );
                        } else {
                            return (
                                <Categories.Inactive
                                    key={uuid()}
                                    name={element.folderName}
                                    onClick={() => folderClickHandler(element)}
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