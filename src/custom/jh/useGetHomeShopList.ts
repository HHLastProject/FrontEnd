import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { apiPath } from '../../shared/path';
import { getToken } from '../../apis/getToken';

type locationType = {
  lng: number,
  lat: number,
  range: number,
};

export const useGetHomeShopList = ({ lng, lat, range }: locationType) => {
  const token = getToken();
  const { data, mutate, isLoading, isSuccess, isError } = useMutation({
    mutationKey: queryKeys.GET_HOME_SHOPLIST,
    mutationFn: async () => {
      const { data } = await api_token.post(`${apiPath.shopList}`, {
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
    },
    onError: (error) => {
      throw error;
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