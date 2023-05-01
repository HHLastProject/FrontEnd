import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import api from '../../shared/api';
import { apiPath } from '../../shared/path';
import { getToken } from '../../apis/getToken';
import { ListTossedData } from '../ym/types';

type locationType = {
  lng: number,
  lat: number,
  range: number,
};

export const useGetHomeShopList = ({ lng, lat, range }: locationType) => {
  const queryClient = useQueryClient();
  const token = getToken();
  const { data, mutate, isLoading, isSuccess, isError } = useMutation({
    mutationKey: queryKeys.GET_HOME_SHOPLIST,
    mutationFn: async () => {
      const { data } = await api.post(`${apiPath.shopList}`, {
        lng,
        lat,
        range,
      }, 
      {
        headers: {
          authorization: `${token}`,
        },
      });
      return data.shops;
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: queryKeys.GET_HOME_SHOPLIST });
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