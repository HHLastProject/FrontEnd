
interface IQueryKey {
  [key: string]: readonly [string];
}

export const queryKeys: IQueryKey = {
  GET_HOME_SHOPLIST: ["GET_HOME_SHOPLIST"],
};

export const keys: IQueryKey = {
  GET_ShopList: ['GetShopList'],
  POST_ShopList: ['PostShopList'],
}

export const loginKeys: IQueryKey = {
  POST_NAVER_TOKEN: ["postNaverToken"],
  POST_KAKAO_TOKEN: ["postKakaoToken"],
  POST_ADMIN_LOGIN: ["postAdminLogin"]
}