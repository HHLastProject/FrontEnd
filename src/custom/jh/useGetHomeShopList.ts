import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import api from '../../shared/api';
import { apiPath } from '../../shared/path';

type locationType = {
  x : number,
  y : number,
  range : number,
};

export const useGetHomeShopList = ({x, y, range} : locationType) => {
  const queryClient = useQueryClient();
  const { data, mutate, isLoading, isSuccess, isError } = useMutation({
    mutationKey: queryKeys.GET_HOME_SHOPLIST,
    mutationFn: async () => {
      const {data} = await api.get(`${apiPath.home}`, { params: {
        x,
        y,
        range,
      }});
      return data.shop;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: queryKeys.GET_HOME_SHOPLIST});
    },
    onError: (error) => {
      console.log('메인 불러오기 error', error);
      console.log('에러');
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