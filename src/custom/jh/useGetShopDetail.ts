import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { apiPath } from '../../shared/path';

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
  const { data, mutate, isLoading, isError } = useMutation({
    mutationKey: queryKeys.GET_SHOP_DETAIL,
    mutationFn: async () => {
      const {data} = await api_token.get(`${apiPath.toShopDetail}/${param}`);
      return data.shop;
    },
    onSuccess: (res) => {
      const {isScrap} = res;
      setState(isScrap);
    },
    onError: (error) => {
      throw error;
    },
  });
  return {
    shopDetailData : data,
    getShopDetailData : mutate,
    shopDetailIsLoading: isLoading,
    shopDetailIsError: isError,
  };
};

export const useGetShopDetailFeed = (param: number | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.GET_SHOP_DETAIL_FEED,
    queryFn: async () => {
      const {data} = await api_token.get(`${apiPath.toShopDetail}/${param}/feed2`);
      return data;
    },
    onSuccess: (res) => {
      return res;
    },
    onError: (error) => {
    },
  });
  return {
    shopDetailFeedList : data,
    shopDetailFeedIsLoading: isLoading,
    shopDetailFeedIsError: isError,
  };
};