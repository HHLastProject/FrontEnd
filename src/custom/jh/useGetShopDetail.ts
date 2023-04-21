import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import api from '../../shared/api';
import { apiPath } from '../../shared/path';

export const useGetShopDetail = (param: number | undefined) => {
  const queryClinet = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.GET_SHOP_DETAIL,
    queryFn: async () => {
      const {data} = await api.get(`${apiPath.toShopDetail}/${param}`);
      return data.shop;
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: queryKeys.GET_SHOP_DETAIL });
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
  const queryClinet = useQueryClient();
  const { data, mutate, isLoading, isError } = useMutation({
    mutationKey: queryKeys.GET_SHOP_DETAIL_FEED,
    mutationFn: async () => {
      const {data} = await api.get(`${apiPath.toShopDetail}/${param}/feed`);
      console.log('피드 데이터', data);
      return data;
    },
    onSuccess: () => {
      console.log('피드 데이터', data);
      queryClinet.invalidateQueries({ queryKey: queryKeys.GET_SHOP_DETAIL_FEED });
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
};