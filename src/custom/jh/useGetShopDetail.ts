import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import api, { api_token } from '../../shared/api';
import { apiPath } from '../../shared/path';
import { getToken } from '../../apis/getToken';
import { queryClient } from '../..';

export interface IFeedList {
  nickname: string;
  profilePic : string | undefined | null;
  createdAt : string | Date;
  feedPic : string;
  comment : string | null;
  tags : [] | string[];
  shopId : number;
  shopName : string;
  shopAddress : string;
  shopThumbnail : string;
  isScrap : boolean;
};

export const useGetShopDetail = (param: number | undefined, setState:React.Dispatch<React.SetStateAction<boolean>>) => {
  const {getShopDetailFeedList} = useGetShopDetailFeed(param);
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.GET_SHOP_DETAIL,
    queryFn: async () => {
      const {data} = await api_token.get(`${apiPath.toShopDetail}/${param}`);
      return data.shop;
    },
    onSuccess: (res) => {
      const {isScrap} = res;
      setState(isScrap);
      getShopDetailFeedList();
      // queryClient.invalidateQueries(queryKeys.GET_SHOP_DETAIL_FEED);
    },
    onError: (error) => {
      throw error;
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
    mutationKey: queryKeys.GET_SHOP_DETAIL_FEED,
    mutationFn: async () => {
      const {data} = await api_token.get(`${apiPath.toShopDetail}/${param}/feed2`);
      return data;
    },
    onSuccess: (res) => {
      console.log('성공 피드 데이터', res);
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