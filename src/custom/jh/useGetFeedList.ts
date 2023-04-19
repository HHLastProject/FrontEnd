import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../apis/queries";
import api from "../../shared/api";
import { apiPath } from "../../shared/path";

export const useGetFeedList = (param: number | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.GET_FEEDS,
    queryFn: async () => {
      const {data} = await api.get(`${apiPath.feedList}`);
      console.log(data);
      return data;
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
  return {
    shopDetailData : data,
    shopDetailIsLoading: isLoading,
    shopDetailIsError: isError,
  };
};

export default useGetFeedList