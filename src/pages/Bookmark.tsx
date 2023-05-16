import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { VFlex, VFlexCenter } from '../custom/ym/styleStore';
import BookmarkList from '../components/bookmark/BookmarkList';
import { FolderData, ReceivedBookmarks, ScrapListEachData } from '../custom/ym/types';
import { BookmarkContext, BookmarkDispatches } from '../custom/ym/contextValues';
import { Modals } from '../components/ui/modal/Modals';
import Loading from '../components/loading/Loading';
import NoLoginStatus from '../components/mypage/NoLoginStatus';
import Error from './Error';
import useGetScrapData from '../hooks/useGetScrapData';
import BookmarkHeader from '../components/bookmark/BookmarkHeader';
import MoveScrap from '../components/bookmark/MoveScrap';
import { ScrapContext, ScrapDispatchesContext } from '../components/bookmark/bookmarkContext';
import useBookmarkStates from '../hooks/useBookmarkStates';

const Bookmark = () => {
    const { state, dispatches } = useBookmarkStates();
    const { modal } = { ...state };
    const { setQueryData, setScrapList, setModal } = { ...dispatches };
    // const [editMode, setEditMode] = useState<boolean>(false);
    // const [selected, setSelected] = useState<number[]>([]);
    // const [queryData, setQueryData] = useState<ReceivedBookmarks>();
    // const [targetFolder, setTargetFolder] = useState<FolderData>();
    // const [scrapList, setScrapList] = useState<ScrapListEachData[]>();
    // const [modal, setModal] = useState<boolean>(false);

    const { scrapData, isSuccess, isError, isLoading } = useGetScrapData();

    // const values: BookmarkContext = { editMode, selected, queryData, targetFolder, scrapList, modal };
    // const dispatches: BookmarkDispatches = { setEditMode, setSelected, setQueryData, setTargetFolder, setScrapList, setModal };

    /* useQuery 상태에 따른 렌더 분기 처리 */
    useEffect(() => {
        if (isSuccess) {
            setQueryData(prev => scrapData as ReceivedBookmarks);
            setScrapList(prev => scrapData?.scrapList as ScrapListEachData[]);
        }
    }, [isSuccess, scrapData]);

    if (isLoading && !localStorage.getItem("access_token")) {
        return (
            <VFlexCenter gap='20px'>
                <NoLoginStatus />
            </VFlexCenter>
        );
    }
    if (isLoading && localStorage.getItem("access_token")) return <Loading />;
    if (isError) return <Error />;

    return (
        <ScrapContext.Provider value={{ ...state }}>
            <ScrapDispatchesContext.Provider value={{ ...dispatches }}>
                {modal && <Modals.MoveScrapToOtherFolder />}
                <BookmarkContainer>
                    <VFlex>
                        <BookmarkHeader />
                        <BookmarkList />
                    </VFlex>
                    <MoveScrap />
                </BookmarkContainer>
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