
interface IQueryKey {
  [key: string]: readonly [string];
}

export const queryKeys: IQueryKey = {
  GET_HOME_SHOPLIST: ["GET_HOME_SHOPLIST"],
};

export const keys: IQueryKey = {
  GET_ShopList: ['GetShopList'],
  POST_ShopList: ['PostShopList'],
  GET_ShopList_Detail : ['GetDetail']
};
