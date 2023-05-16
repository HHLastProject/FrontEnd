import { createContext } from "react";
import { BookmarkContext, BookmarkDispatches } from "../../custom/ym/contextValues";

const bookmarkContext: BookmarkContext = {
    editMode: false,
    selected: [],
    queryData: undefined,
    targetFolder: undefined,
    scrapList: undefined,
    modal: false,
}

const bookmarkDispatchesContext: BookmarkDispatches = {
    setEditMode: () => { },
    setSelected: () => { },
    setQueryData: () => { },
    setTargetFolder: () => { },
    setScrapList: () => { },
    setModal: () => { },
}

export const ScrapContext = createContext(bookmarkContext);
export const ScrapDispatchesContext = createContext(bookmarkDispatchesContext);