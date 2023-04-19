interface IQueryKey {
  [key: string]: readonly [string];
};

export const queryKeys: IQueryKey = {
  GET_HOME_SHOPLIST: ["GET_HOME_SHOPLIST"],
  GET_SHOP_DETAIL: ["GET_SHOP_DETAIL"],
  GET_SHOP_DETAIL_FEED: ["GET_SHOP_DETAIL_FEED"],
  ADD_SHOP_DETAIL_FEED: ["ADD_SHOP_DETAIL_FEED"],
  GET_FEEDS: ["GET_FEEDS"],
};

export const keys: IQueryKey = {
  GET_ShopList: ['GetShopList'],
  POST_ShopList: ['PostShopList'],
  GET_ShopList_Detail: ['GetDetail']
};

export const loginKeys: IQueryKey = {
  POST_NAVER_TOKEN: ["postNaverToken"],
  POST_KAKAO_TOKEN: ["postKakaoToken"],
  POST_ADMIN_LOGIN: ["postAdminLogin"]
}

export const mapQueryKeys: IQueryKey = {
  POST_SHOPS_IN_RANGE: ["POST_SHOPS_IN_RANGE"],
}