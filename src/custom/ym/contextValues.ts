import { Coordinate, FolderData, ReceivedBookmarks, ScrapListEachData, categoryTypes } from "./types"
import { ShopData } from "./variables"

export interface States {
    range: number,
    category: categoryTypes | "",
    // list: (ShopData | null)[],
    userCoord: Coordinate,
    shopCoord: (Coordinate | null)[],
    // center: Coordinate,
    // isMoving: boolean,
    // isChanged: boolean,
    activeShop: number,
}

export const states: States = {
    range: 200,
    category: "",
    // list: [],
    userCoord: { lat: 37.5108407, lng: 127.0468975 },
    shopCoord: [],
    // center: { lat: 37.5108407, lng: 127.0468975 },
    // isMoving: false,
    // isChanged: false,
    activeShop: 0,
}

export interface Dispatches {
    setRange: React.Dispatch<React.SetStateAction<number>> | null,
    setCategory: React.Dispatch<React.SetStateAction<"" | categoryTypes>> | null,
    // setList: React.Dispatch<React.SetStateAction<(ShopData | null)[]>> | null,
    setUserCoord: React.Dispatch<React.SetStateAction<Coordinate>> | null,
    setShopCoord: React.Dispatch<React.SetStateAction<Coordinate[]>> | null,
    // setCenter: React.Dispatch<React.SetStateAction<Coordinate>> | null,
    // setIsMoving: React.Dispatch<React.SetStateAction<boolean>> | null,
    // setIsChanged: React.Dispatch<React.SetStateAction<boolean>> | null,
    setActiveShop: React.Dispatch<React.SetStateAction<number>> | null
}
export const dispatches: Dispatches = {
    setRange: null,
    setCategory: null,
    // setList: null,
    setUserCoord: null,
    setShopCoord: null,
    // setCenter: null,
    // setIsMoving: null,
    // setIsChanged: null,
    setActiveShop: null,
}
export interface BookmarkContext {
    editMode: boolean,
    selected: number[],
    queryData: ReceivedBookmarks | undefined,
    targetFolder: FolderData | undefined,
    scrapList: ScrapListEachData[] | undefined,
}

export interface BookmarkDispatches {
    setEditMode: React.Dispatch<React.SetStateAction<boolean>> | null,
    setSelected: React.Dispatch<React.SetStateAction<number[]>> | null,
    setQueryData: React.Dispatch<React.SetStateAction<ReceivedBookmarks | undefined>> | undefined,
    setTargetFolder: React.Dispatch<React.SetStateAction<FolderData | undefined>> | undefined,
    setScrapList: React.Dispatch<React.SetStateAction<ScrapListEachData[] | undefined>> | undefined
}
export const bookmarkContext: BookmarkContext = {
    editMode: false,
    selected: [],
    queryData: undefined,
    targetFolder: undefined,
    scrapList: undefined
}

export const bookmarkDispatchesContext: BookmarkDispatches = {
    setEditMode: null,
    setSelected: null,
    setQueryData: undefined,
    setTargetFolder: undefined,
    setScrapList: undefined,
}