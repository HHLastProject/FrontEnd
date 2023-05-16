import { useState } from "react"
import { FolderData, ReceivedBookmarks, ScrapListEachData } from "../custom/ym/types"

export interface InitialState {
    editMode: boolean,
    selected: number[],
    queryData: ReceivedBookmarks | undefined,
    targetFolder: FolderData | undefined,
    scrapList: ScrapListEachData[] | undefined,
    modal: boolean
}

const useBookmarkStates = () => {
    const [state, setState] = useState<InitialState>({
        editMode: false,
        selected: [],
        queryData: undefined,
        targetFolder: undefined,
        scrapList: [],
        modal: false,
    });

    const setEditMode = (updateFunc: (prev: boolean) => boolean) => {
        setState(prevState => ({
            ...prevState,
            editMode: updateFunc(prevState.editMode)
        }));
    }
    const setSelected = (updateFunc: (prev: number[]) => number[]) => {
        setState(prevState => ({
            ...prevState,
            selected: updateFunc(prevState.selected)
        }));
    }
    const setQueryData = (updateFunc: (prev: ReceivedBookmarks | undefined) => ReceivedBookmarks | undefined) => {
        setState(prevState => ({
            ...prevState,
            queryData: updateFunc(prevState.queryData)
        }));
    }
    const setTargetFolder = (updateFunc: (prev: FolderData | undefined) => FolderData | undefined) => {
        setState(prevState => ({
            ...prevState,
            targetFolder: updateFunc(prevState.targetFolder)
        }));
    }
    const setScrapList = (updateFunc: (prev: ScrapListEachData[] | undefined) => ScrapListEachData[] | undefined) => {
        setState(prevState => ({
            ...prevState,
            scrapList: updateFunc(prevState.scrapList)
        }));
    }
    const setModal = (updateFunc: (prev: boolean) => boolean) => {
        setState(prevState => ({
            ...prevState,
            modal: updateFunc(prevState.modal)
        }));
    }

    return {
        state,
        dispatches: {
            setEditMode,
            setSelected,
            setQueryData,
            setTargetFolder,
            setScrapList,
            setModal
        }
    };
}

export default useBookmarkStates;