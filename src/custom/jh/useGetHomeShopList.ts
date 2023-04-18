import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import api from '../../shared/api';
import { apiPath } from '../../shared/path';

type locationType = {
  lng : number,
  lat : number,
  range : number,
};

export const useGetHomeShopList = ({lng, lat, range} : locationType) => {
  const queryClient = useQueryClient();
  const { data, mutate, isLoading, isSuccess, isError } = useMutation({
    mutationKey: queryKeys.GET_HOME_SHOPLIST,
    mutationFn: async () => {
      const {data} = await api.post(`${apiPath.shopList}`, { data: {
        lng,
        lat,
        range,
      }});
      return data.shop;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: queryKeys.GET_HOME_SHOPLIST});
    },
    onError: (error) => {
      console.log('메인 불러오기 error', error);
      return error;
    }
  });

  return ({
    shopList: data,
    getshopList: mutate,
    getshopListIsLoading: isLoading,
    getshopListIsSuccess: isSuccess,
    getshopListIsError: isError,
    // getshopListErrorMsg: ,
  });
};