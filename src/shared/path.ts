interface IPath {
  readonly [path: string]: string;
};

interface IPathObject {
  readonly [key: string]: {
    readonly [path: string]: string;
  }
}

export const path: IPath = {
  home: '/',
  login: '/login',
  mealFilter: '/mealfilter',
  toShopDetail: '/shop',
  shopDetail: '/shop/:shopId',
  feedForm: '/shop/:shopId/feedform',
  search: '/search',
  feedFormSearch: '/search/:isfeed',
  mypage: '/mypage',
  map: '/map',
  adminShoplist: '/admin/shoplist',
}

export const apiPath: IPath = {
  shopList: '/api/shop/main',
  shopDetail: '/api/shop/:shopId',
  toShopDetail: '/api/shop',
  shopDetailReview: '/api/shop/:shopId/review',
  editShopDetailReview: '/api/shop/:shopId/review/:reviewId',
  search: '/api/search',
};

export const imgPath: IPath = {
  shopMenuImg: `${process.env.REACT_APP_SERVER_URL}/uploads/shopMenu/`,
  shopThumbnailImg: `${process.env.REACT_APP_SERVER_URL}/uploads/shopThumbnail/`,
  feedImg: `${process.env.REACT_APP_SERVER_URL}/uploads/feedPic/`,
};

export const defaultImgPath: IPath = {
  shopList: `${process.env.PUBLIC_URL}/shop-default-img.jpg`,
};

export const iconImgPath: IPathObject = {
  detailInfo: {
    mapPin: `${process.env.PUBLIC_URL}/images/detail/map_pin_20.png`,
    clock: `${process.env.PUBLIC_URL}/images/detail/clock_20.png`,
    phone: `${process.env.PUBLIC_URL}/images/detail/phone_20.png`,
  },
  search: {
    loupe: `${process.env.PUBLIC_URL}/loupe.png`,
    marker: `${process.env.PUBLIC_URL}/images/search/mapfilled_24.png`,
  },
  map: {
    shopLocation: `${process.env.PUBLIC_URL}/images/markers/icon_mappin_36.png`,
  },
  write: {
    pencil: `${process.env.PUBLIC_URL}/images/feed/write_24.png`,
  }
};