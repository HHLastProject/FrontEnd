import { useMutation } from "@tanstack/react-query";
import { getToken } from "../../apis/getToken";
import { queryKeys } from "../../apis/queries";
import api, { api_token } from "../../shared/api";
import { queryClient } from "../..";

export const useChangeScrap = (param: number | undefined) => {
  const token = getToken();
  const { data, mutate } = useMutation({
    mutationKey: queryKeys.GET_SHOP_DETAIL_FEED,
    mutationFn: async () => {
      const result = await api_token.put(`/api/${param}/scrap`);
      return result;
    },
    onSuccess: (res) => {
      console.log('스크랩 데이터', res);
      queryClient.invalidateQueries(queryKeys.GET_SHOP_DETAIL);
    },
    onError: () => {
      console.log('피드 에러');
    },
  });
  return {
    scrapData : data,
    putScrap : mutate,
  };
};

export default useChangeScrap