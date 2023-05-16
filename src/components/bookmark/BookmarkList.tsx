import React, { useContext, useEffect, useState } from 'react'
import { Categories } from '../ui/element/tags/Categories'
import uuid from 'react-uuid'
import { FolderData } from '../../custom/ym/types'
import BookmarkLoginComp from './BookmarkLoginComp'
import BookmarkLogoutComp from './BookmarkLogoutComp'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'
import { ScrapContext } from './bookmarkContext'

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
        <SlideCase>
            <Swiper
                spaceBetween={4}
                slidesPerView={'auto'}
                style={{ boxSizing: 'border-box' }}
            >
                {
                    folderList?.map((element) => {
                        if (folder === element) {
                            return (
                                <SwiperSlide key={uuid()} style={{ width: 'fit-content' }}>
                                    <Categories.Active
                                        name={element.folderName}
                                        onClick={() => folderClickHandler(element)}
                                        draggable={false}
                                    >{element.folderName}</Categories.Active>
                                </SwiperSlide>
                            );
                        } else {
                            return (
                                <SwiperSlide key={uuid()} style={{ width: 'fit-content' }}>
                                    <Categories.Inactive
                                        name={element.folderName}
                                        onClick={() => folderClickHandler(element)}
                                        draggable={false}
                                    >{element.folderName}</Categories.Inactive>
                                </SwiperSlide>
                            )
                        }
                    })
                }
            </Swiper>
            {
                isLogin
                    ? <BookmarkLoginComp folderState={folder as FolderData} />
                    : <BookmarkLogoutComp />
            }
        </SlideCase>
    )
}

export default BookmarkList;

export const SlideCase = styled.div`
    width: 100%;
    height: fit-content;
    padding: 0px 20px;
    box-sizing: border-box;
    overflow-x: hidden;
`