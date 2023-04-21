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

export const usePostAdminRegister = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newShopRegister: MutationVariables) => {
      const response = await apis.post(`/api/admin/register`, newShopRegister, {
        headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbkVtYWlsIjoicXdlckBuYXZlci5jb20iLCJpYXQiOjE2ODA3ODMxNDQsImV4cCI6MTY4MTY0NzE0NH0.BeigA3zgwDM-E4tAn3hKesYxeD9enog8w9RPtXsHOh8",
          // authorization: getCookie('token'), 
          "Content-Type": "multipart/form-data",
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
