import React, { useContext, useEffect, useState } from 'react'
import { HFlex } from '../../custom/ym/styleStore'
import { Categories } from '../ui/element/tags/Categories'
import uuid from 'react-uuid'
import { FolderData } from '../../custom/ym/types'
import BookmarkLoginComp from './BookmarkLoginComp'
import BookmarkLogoutComp from './BookmarkLogoutComp'
import { ScrapContext } from '../../pages/Bookmark'
import SlideBox from '../ui/container/slide/SlideBox'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'

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
                {/* <HFlex gap='4px' height='fit-content' etc="padding:8px 20px;"> */}
                {
                    folderList?.map((element) => {
                        if (folder === element) {
                            return (
                                <SwiperSlide style={{ paddingLeft: '0px' }}>
                                    <Categories.Active
                                        key={uuid()}
                                        name={element.folderName}
                                        onClick={() => folderClickHandler(element)}
                                        draggable={false}
                                    >{element.folderName}</Categories.Active>
                                </SwiperSlide>
                            );
                        } else {
                            return (
                                <SwiperSlide>
                                    <Categories.Inactive
                                        key={uuid()}
                                        name={element.folderName}
                                        onClick={() => folderClickHandler(element)}
                                        draggable={false}
                                    >{element.folderName}</Categories.Inactive>
                                </SwiperSlide>
                            )
                        }
                    })
                }
                {/* </HFlex> */}
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

const SlideCase = styled.div`
    width: 100%;
    height: fit-content;
    padding: 0px 20px;
    box-sizing: border-box;
    overflow-x: hidden;
`