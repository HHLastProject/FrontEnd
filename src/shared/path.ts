interface IPath {
  [ path : string ] : string;
};

export const path : IPath = {
  home: '/',
  login: '/login',
  mealFilter: '/mealfilter',
  toShopDetail: '/shop',
  shopDetail: '/shop/:shopId',
  mypage: '/mypage',
}

export const apiPath : IPath = {
  home: '/api/shop/main',
  shopDetail: '/api/shop/:shopId',
  shopDetailReview: '/api/shop/:shopId/review',
  shopDetailReviewEdit: '/api/shop/:shopId/review/:reviewId',
};

export const defaultImgPath : IPath = {
  shopList: `${process.env.PUBLIC_URL}/shop-default-img.jpg`,
};