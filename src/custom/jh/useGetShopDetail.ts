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

export const useGetShopDetailReview = (param: number | undefined) => {
  const { data, mutate, isLoading, isError } = useMutation({
    mutationKey: queryKeys.GET_SHOP_DETAIL_REVIEW,
    mutationFn: async () => {
      const {data} = await api.get(`${apiPath.toShopDetail}/${param}/review`);
      console.log('리뷰 데이터', data);
      return data;
    },
    onSuccess: () => {
      // console.log('리뷰 데이터', data);

    },
    onError: () => {
      console.log('리뷰 에러');
    },
  });
  return {
    shopDetailReviewList : data,
    getShopDetailReviewList : mutate,
    shopDetailReviewIsLoading: isLoading,
    shopDetailReviewIsError: isError,
  };
}

export const useAddShopDetailReview = (param: number | undefined) => {
  const { data, mutate, isLoading, isError } = useMutation({
    mutationKey: queryKeys.ADD_SHOP_DETAIL_REVIEW,
    mutationFn: async () => {
      const {data} = await api.post(`${apiPath.toShopDetail}/${param}/review`);
    },
  })
}