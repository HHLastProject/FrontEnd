import { PayloadFolderList, PayloadShopList, ReceivedBookmarks, ScrapListEachData } from "./types";

export const getEditedBookmark = (
    queryData: ReceivedBookmarks | undefined,
    scrapList: ScrapListEachData[] | undefined
) => {
    const newFolderList: PayloadFolderList[]
        = queryData?.folderList.map((folder) => {

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

    return {
        folderList: newFolderList,
    }
}

