import apis from '../../apis/apis'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "../../apis/Cookies";
import { keys } from '../../apis/queries';

export const useDeleteShop = () => {
    const queryClient = useQueryClient();
    const deleteComment = useMutation({
      mutationFn: async (shopId) => {
        // const data = await apis.delete(`/admin/${shopId}`, {
        const data = await apis.delete(`/api/admin/delete/${shopId}`, {
          headers: {
            authorization: getCookie('token') 
          },
        });
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(keys.GET_ShopList);
      },
    });
    return deleteComment;
  };