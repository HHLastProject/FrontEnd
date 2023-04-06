import apis from '../../apis/apis'
import { keys } from '../../apis/queries';
import { getCookie } from '../../apis/Cookies';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type MutationVariables = {
  shopName: string;
  category: string;
  address: string;
  operatingTime: string;
  phoneNumber: string;
  thumbnail: string;
  menu: {
    menuName: string;
    price: number;
    menuDescription: string;
  }[];
};

const useAdminRegister = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newShopRegister: MutationVariables) => {
      const response = await apis.post(`/admin/register`, newShopRegister, {
        headers: {
          Authorization: getCookie('token'),
        },
      });
      return response;
    },
    onSuccess: (data, variables, context) => {
      alert(data.data.message);
      queryClient.invalidateQueries(keys.POST_ShopList);
    },
    onError: (error: any, variables, context) => {
      alert(error.response.data.message);
    },
  });

  return mutation;
};
export default useAdminRegister;
