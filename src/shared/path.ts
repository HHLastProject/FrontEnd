function setServerUrl(link: string) {
  return `${process.env.REACT_APP_SERVER_URL + link}`;
};

function setPublicUrl(link: string) {
  return `${process.env.PUBLIC_URL + link}`;
};

interface IPath {
  readonly [path: string]: string;
};

interface IPathObject {
  readonly [key: string]: {
    readonly [path: string]: string;
  }
};

export const path: IPath = {
  home: '/',
  list: '/list',
  login: '/login',
  mealFilter: '/mealfilter',
  toShopDetail: '/shop',
  shopDetail: '/shop/:shopId',
  feedList: '/feed',
  toFeedComment: '/feed/comment',
  feedComment: '/feed/comment/:feedId',
  feedForm: '/feedform',
  search: '/search',
  feedFormSearch: '/search/:isfeed',

  map: '/map',
  adminShoplist: '/admin/shoplist',
  adminRegister: '/admin/register',
  adminUpdate: "/admin/:id",

  adminLogin: "/admin/login",
  redirectNaver: "/redirect/naver",
  redirectKakao: "/redirect/kakao",
  bookmark: "/bookmark",
  mypage: '/mypage',
  allFeeds: "/mypage/feeds/:userId",
  toFeedDetail: "/feed/detail",
  feedDetail: "/feed/detail/:feedId"
}

export const apiPath: IPath = {
  shopList: '/api/shop/main',
  shopDetail: '/api/shop/:shopId',
  toShopDetail: '/api/shop',
  shopDetailReview: '/api/shop/:shopId/review',
  editShopDetailReview: '/api/shop/:shopId/review/:reviewId',
  search: '/api/search',
  feedList: '/api/feed',
  toggleScrap: '/api/:shopId/scrap',
  scrapList: '/api/favorite',
  mypage: '/api/mypage',
  feedDetail: '/api/mypage/:feedId',
};

export const imgPath: IPath = {
  shopMenuImg: setServerUrl(`/uploads/shopMenu/`),
  shopThumbnailImg: setServerUrl(`/uploads/shopThumbnail/`),
  feedImg: setServerUrl(`/uploads/`),
};

export const defaultImgPath: IPath = {
  shopList: setPublicUrl(`/shop-default-img.jpg`),
};

export const iconImgPath: IPathObject = {
  detailInfo: {
    mapPin: setPublicUrl(`/images/detail/map_pin_20.png`),
    clock: setPublicUrl(`/images/detail/clock_20.png`),
    phone: setPublicUrl(`/images/detail/phone_20.png`),
  },
  search: {
    loupe: setPublicUrl(`/loupe.png`),
    marker: setPublicUrl(`/images/search/mapfilled_24.png`),
  },
  map: {
    shopLocation: setPublicUrl(`/images/markers/icon_mappin_36.png`),
  },
  write: {
    pencil: setPublicUrl(`/images/feed/write_24.png`),
    plus: setPublicUrl(`/plus_white_24.png`),
  },
  arrow: {
    chevrondown16: setPublicUrl(`/icon/chevrondown_16.png`),
  },
  like: {
    likeInactive24: setPublicUrl(`/icon/like_inactive_24.png`),
    likeActive24: setPublicUrl(`/icon/like_active_24.png`),
  },
  comment: {
    comment24: setPublicUrl(`/icon/comment_24.png`),
  },
};