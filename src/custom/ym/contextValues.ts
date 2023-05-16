import { FolderData, ReceivedBookmarks, ScrapListEachData, categoryTypes } from "./types"
import { ShopData } from "./variables"

export interface States {
    range: number,
    category: categoryTypes | "",
    list: ShopData[] | null,
    activeShop: number,
}

export const states: States = {
    range: 200,
    category: "",
    list: null,
    activeShop: 0,
}

export interface Dispatches {
    setRange: React.Dispatch<React.SetStateAction<number>> | null,
    setCategory: React.Dispatch<React.SetStateAction<"" | categoryTypes>> | null,
    setList: React.Dispatch<React.SetStateAction<(ShopData[] | null)>> | null,
    setActiveShop: React.Dispatch<React.SetStateAction<number>> | null,
}
export const dispatches: Dispatches = {
    setRange: null,
    setCategory: null,
    setList: null,
    setActiveShop: null,
}
export interface BookmarkContext {
    editMode: boolean,
    selected: number[],
    queryData: ReceivedBookmarks | undefined,
    targetFolder: FolderData | undefined,
    scrapList: ScrapListEachData[] | undefined,
    modal: boolean,
}

export interface BookmarkDispatches {
    setEditMode: (updateFunc: (prev: boolean) => boolean) => void,
    setSelected: (updateFunc: (prev: number[]) => number[]) => void,
    setQueryData: (updateFunc: (prev: ReceivedBookmarks | undefined) => ReceivedBookmarks | undefined) => void,
    setTargetFolder: (updateFunc: (prev: FolderData | undefined) => FolderData | undefined) => void,
    setScrapList: (updateFunc: (prev: ScrapListEachData[] | undefined) => ScrapListEachData[] | undefined) => void,
    setModal: (updateFunc: (prev: boolean) => boolean) => void,
}
export const bookmarkContext: BookmarkContext = {
    editMode: false,
    selected: [],
    queryData: undefined,
    targetFolder: undefined,
    scrapList: undefined,
    modal: false,
}

export const bookmarkDispatchesContext: BookmarkDispatches = {
    setEditMode: () => { },
    setSelected: () => { },
    setQueryData: () => { },
    setTargetFolder: () => { },
    setScrapList: () => { },
    setModal: () => { },
}