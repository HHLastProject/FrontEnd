import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Headers } from '../components/ui/element/headers/Headers';
import { VFlex } from '../custom/ym/styleStore';
import BookmarkList from '../components/bookmark/BookmarkList';
import { useQuery } from '@tanstack/react-query';
import { scrapKeys } from '../apis/queries';
import { api_token } from '../shared/api';
import { apiPath } from '../shared/path';
import { FolderData, PayloadFolderList, PayloadShopList, ReceivedBookmarks, ScrapListEachData } from '../custom/ym/types';
import useScrapData from '../hooks/useScrapData';
import { BookmarkContext, BookmarkDispatches, bookmarkContext, bookmarkDispatchesContext } from '../custom/ym/contextValues';
import { Buttons } from '../components/ui/element/buttons/Buttons';
import { Modals } from '../components/ui/modal/Modals';
import useEditScrapData from '../hooks/useEditScrapData';


export const ScrapContext = createContext(bookmarkContext);
export const ScrapDispatchesContext = createContext(bookmarkDispatchesContext);

const Bookmark = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [queryData, setQueryData] = useState<ReceivedBookmarks>();
    const [targetFolder, setTargetFolder] = useState<FolderData>();
    const [scrapList, setScrapList] = useState<ScrapListEachData[]>();
    const [modal, setModal] = useState<boolean>(false);

    const { scrapData, refetchScrapQuery, isSuccess, isError, isLoading } = useScrapData();
    const { mutate } = useEditScrapData();

    const values: BookmarkContext = {
        editMode,
        selected,
        queryData,
        targetFolder,
        scrapList
    };
    const dispatches: BookmarkDispatches = {
        setEditMode,
        setSelected,
        setQueryData,
        setTargetFolder,
        setScrapList
    };

    const editBackClickHandler = () => {
        setEditMode(false);
    }

    const editFinishClickHandler = () => {
        const newFolderList: PayloadFolderList[] = queryData?.folderList.map((folder) => {

            const temp = scrapList?.map((element) => {
                if (element.folderName === folder.folderName) {
                    return { shopId: element.shopId } as PayloadShopList;
                }
                return null;
            });

            const result: PayloadFolderList = {
                folderName: folder.folderName,
                shopList: (temp as PayloadShopList[]).filter((element) => element !== null),
            };

            return result;
        }) as PayloadFolderList[];

        const payload = {
            folderList: newFolderList,
        }

        console.log('완료 누를시 완성되는 데이터 셋', newFolderList);

        mutate(payload);

        setEditMode(false);
    }

    const editModeClickHandler = () => {
        setEditMode(true);
    }

    const moveFolderClickhandler = () => {
        setModal(true);
    }

    // if (isSuccess) {
    //     setQueryData(scrapData);
    //     setScrapList(scrapData?.scrapList);
    // }


    useEffect(() => {
        // refetchScrapQuery();
        // if (isLoading) {
        // console.log('로딩중');
        // }
        if (isSuccess) {
            // console.log("통신성공")
            setQueryData(scrapData);
            setScrapList(scrapData?.scrapList);
            console.log(scrapData);
            console.log(scrapList);
        }
    }, []);

    if (isLoading) {
        return <div>로딩중</div>;
    };

    return (
        <ScrapContext.Provider value={values}>
            <ScrapDispatchesContext.Provider value={dispatches}>
                {modal
                    ? <Modals.MoveScrapToOtherFolder
                        dispatch={setModal} />
                    : null}
                {queryData
                    ? <BookmarkContainer>
                        <VFlex>
                            {editMode
                                ? <Headers.EditBookmarkHeader
                                    BackOnClick={editBackClickHandler}
                                    RightOnClick={editFinishClickHandler}
                                >완료</Headers.EditBookmarkHeader>
                                : <Headers.BookmarkHeader
                                    editClickHandler={editModeClickHandler}
                                >Favorite</Headers.BookmarkHeader>
                            }
                            <BookmarkList />
                        </VFlex>
                        {editMode
                            ? <ExcuteButtonDiv>
                                {
                                    selected.length > 0
                                        ? <Buttons.Large.Default onClick={moveFolderClickhandler}>폴더이동</Buttons.Large.Default>
                                        : <Buttons.Large.Inactive>폴더이동</Buttons.Large.Inactive>
                                }
                            </ExcuteButtonDiv>
                            : null}
                    </BookmarkContainer>
                    : null}
            </ScrapDispatchesContext.Provider>
        </ScrapContext.Provider>
    )
}

export default Bookmark;

const BookmarkContainer = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 100%;
`

const ExcuteButtonDiv = styled.div`
    position: absolute;
    bottom : 0;
    left : 50%-width/2;
    z-index: 500;
    background-color: white;
    width: 390px;
    height: 88px;
    box-sizing: border-box;
    padding : 12px 16px;
    text-align: center;
`