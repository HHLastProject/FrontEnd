import React, { useEffect, useState } from 'react'
import { HFlex } from '../../custom/ym/styleStore'
import { FILTER_LIST } from '../../custom/ym/variables'
import { Categories } from '../ui/element/tags/Categories'
import uuid from 'react-uuid'
import { categoryTypes } from '../../custom/ym/types'
import BookmarkLoginComp from './BookmarkLoginComp'
import BookmarkLogoutComp from './BookmarkLogoutComp'
import { bookmarkData } from '../../custom/ym/dummydata'

const BookmarkList = () => {
    // const [category, setCategory] = useState<categoryTypes | null>(null);
    const [folder, setFolder] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    // const folderClickHandler = (
    //     e: React.MouseEvent<HTMLButtonElement>,
    //     element: categoryTypes
    // ) => {
    //     if (isLogin) {
    //         element === category
    //             ? setCategory(null)
    //             : setCategory(element)
    //     } else;
    // }
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
        localStorage.getItem("access_token") && setIsLogin(prev => !prev);
        setFolder(bookmarkData.folderList[0]);

        let result = "";
        bookmarkData.folderList.forEach((element) => result += `${element} `);

        localStorage.setItem("FolderList", result);
    }, [])

    return (
        <>
            <HFlex gap='2px' height='fit-content' etc="padding:8px 20px;">
                {bookmarkData.folderList.map((element) => {
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
                })}
            </HFlex>
            {
                isLogin
                    ? <BookmarkLoginComp categoryState={folder} />
                    : <BookmarkLogoutComp />
            }
        </>
    )
}

export default BookmarkList