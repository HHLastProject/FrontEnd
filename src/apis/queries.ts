interface IQueryKey {
  [key: string]: readonly [string];
}

export const queryKeys: IQueryKey = {
  GET_HOME_SHOPLIST: ["GET_HOME_SHOPLIST"],
  GET_SHOP_DETAIL: ["GET_SHOP_DETAIL"],
  GET_SHOP_DETAIL_REVIEW: ["GET_SHOP_DETAIL_REVIEW"],
  ADD_SHOP_DETAIL_REVIEW: ["ADD_SHOP_DETAIL_REVIEW"],
};

export const keys: IQueryKey = {
  GET_ShopList: ['GetShopList'],
  POST_ShopList: ['PostShopList'],
}
