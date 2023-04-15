interface IPath {
  readonly [ path : string ] : string;
};

export const path : IPath = {
  home: '/',
  login: '/login',
  mealFilter: '/mealfilter',
  toShopDetail: '/shop',
  shopDetail: '/shop/:shopId',
  shopDetailReviewForm: '/shop/:shopId/reviewForm',
  search: '/search',
  mypage: '/mypage',
  map: '/map',
}

export const apiPath : IPath = {
  home: '/api/shop/main',
  shopDetail: '/api/shop/:shopId',
  toShopDetail: '/api/shop',
  shopDetailReview: '/api/shop/:shopId/review',
  editShopDetailReview: '/api/shop/:shopId/review/:reviewId',
  imgUrl: `${process.env.REACT_APP_SERVER_URL}/uploads/`,
};

export const defaultImgPath : IPath = {
  shopList: `${process.env.PUBLIC_URL}/shop-default-img.jpg`,
};