import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import api from '../../shared/api';
import { apiPath } from '../../shared/path';

export const useGetShopDetail = (param: number | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.GET_SHOP_DETAIL,
    queryFn: async () => {
      const {data} = await api.get(`${apiPath.toShopDetail}/${param}`);
      return data.shop;
    },
    onSuccess: () => {
      
    },
    onError: () => {
      console.log('상세정보 에러');
    },
  });
  return {
    shopDetailData : data,
    shopDetailIsLoading: isLoading,
    shopDetailIsError: isError,
  };
};

export const useGetShopDetailFeed = (param: number | undefined) => {
  const { data, mutate, isLoading, isError } = useMutation({
    mutationKey: queryKeys.GET_SHOP_DETAIL_REVIEW,
    mutationFn: async () => {
      const {data} = await api.get(`${apiPath.toShopDetail}/${param}/feed`);
      console.log('피드 데이터', data);
      return data;
    },
    onSuccess: () => {
      console.log('피드 데이터', data);

    },
    onError: () => {
      console.log('피드 에러');
    },
  });
  return {
    shopDetailFeedList : data,
    getShopDetailFeedList : mutate,
    shopDetailFeedIsLoading: isLoading,
    shopDetailFeedIsError: isError,
  };
}

// export const useAddShopDetailReview = (param: number | undefined) => {
//   const { data, mutate, isLoading, isError } = useMutation({
//     mutationKey: queryKeys.ADD_SHOP_DETAIL_REVIEW,
//     mutationFn: async () => {
//       const {data} = await api.post(`${apiPath.toShopDetail}/${param}/review`);
//       return data;
//     },
//     onSuccess: () => {
//       console.log('리뷰 작성한 데이터', data);
//     },
//     onError: () => {
//       console.log('리뷰 작성 에러');
//     },
//   });
//   return {
//     shopDetailReviewList : data,
//     getShopDetailReviewList : mutate,
//     shopDetailReviewIsLoading: isLoading,
//     shopDetailReviewIsError: isError,
//   };
// }