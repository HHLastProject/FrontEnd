import { useMutation } from "@tanstack/react-query";
import { getToken } from "../../apis/getToken";
import { api_token } from "../../shared/api";
import { queryKeys } from "../../apis/queries";
import { queryClient } from "../..";

//스크랩 변경
export const changeScrap = async (shopId: number) => {
  const token = getToken();
  if(token) {
    const result = await api_token.put(`/api/${shopId}/scrap`)
      .then((res) => {
        console.log('스크랩결과', res.data.isScrap);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    return result;
  } else {
    alert('로그인이 필요한 기능입니다.');
  }
};

//스크랩 변경 mutate
export const useChangeScrap = (param: number | undefined) => {
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