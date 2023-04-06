
interface IQueryKey {
  [key:string] : readonly [string];
}

export const queryKeys : IQueryKey = {
  GET_HOME_SHOPLIST: ["GET_HOME_SHOPLIST"],
};

export const keys = {
    GET_ShopList: ['GetShopList'] as const,
    POST_ShopList: ['PostShopList'] as const,
}
