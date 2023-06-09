interface IQueryKey {
  [key: string]: readonly [string];
};

export const queryKeys: IQueryKey = {
  GET_HOME_SHOPLIST: ["GET_HOME_SHOPLIST"],
  GET_SHOP_DETAIL: ["GET_SHOP_DETAIL"],
  GET_SHOP_DETAIL_FEED: ["GET_SHOP_DETAIL_FEED"],
  ADD_SHOP_DETAIL_FEED: ["ADD_SHOP_DETAIL_FEED"],
  GET_FEEDS: ["GET_FEEDS"],
  GET_FEED_DETAIL_COMMENT: ["GET_FEED_DETAIL_COMMENT"],
  GET_USER_FEED: ["GET_USER_FEED"],
  PUT_SCRAP: ["PUT_SCRAP"],
  PUT_LIKE: ["PUT_LIKE"],
};

export const keys: IQueryKey = {
  GET_ShopList: ['GET_SHOPLIST'],
  POST_ShopList: ['POST_SHOPLIST'],
  GET_ShopList_Detail: ['GET_SHOPLIST_DETAIL'],
  PUT_TOGGLE_BOOKMARK: ["PUT_TOGGLE_BOOKMARK"],
};

export const loginKeys: IQueryKey = {
  POST_NAVER_TOKEN: ["POST_NAVER_TOKEN"],
  POST_KAKAO_TOKEN: ["POST_KAKAO_TOKEN"],
  POST_ADMIN_LOGIN: ["POST_ADMIN_LOGIN"]
}

export const mapQueryKeys: IQueryKey = {
  POST_SHOPS_IN_RANGE: ["POST_SHOPS_IN_RANGE"],
  GET_GU_LIST: ["GET_GU_LIST"],
}

export const scrapKeys: IQueryKey = {
  GET_SCRAP: ["GET_SCRAP"],
  POST_FOLDER: ["POST_FOLDER"],
  DELETE_FOLDER: ["DELETE_FOLDER"],
  POST_SCRAP_DB: ["POST_SCRAP_DB"]
}

export const mypageKeys: IQueryKey = {
  GET_MYPAGE: ["GET_MYPAGE"],
  GET_FEED_DETAIL_IN_MYPAGE: ["GET_FEED_DETAIL_IN_MYPAGE"],
  PATCH_NICKNAME: ["PETCH_NICKNAME"],
}

export const feedKeys: IQueryKey = {
  DELETE_MYFEED: ["DELETE_MYFEED"],
}
