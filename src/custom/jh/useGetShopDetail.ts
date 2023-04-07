import { useQuery } from '@tanstack/react-query';
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
      console.log('가져온 데이터',data);
    },
    onError: () => {
      console.log('에러');
    },
  });
  return {
    shopDetailData : data,
    shopDetailIsLoading: isLoading,
    shopDetailIsError: isError,
  };
};

export default useGetShopDetail;