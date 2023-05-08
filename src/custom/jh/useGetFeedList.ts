import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../apis/queries";
import { api_token } from "../../shared/api";
import { apiPath } from "../../shared/path";

export const useGetFeedList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.GET_FEEDS,
    queryFn: async () => {
      const {data} = await api_token.get(`${apiPath.feedList}`);
      // const {data} = await api_token.get(`${apiPath.feedList}`, {
      //   params: {pageNumber: pageNumber},
      // });
      return data;
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
  return {
    feedList: data,
    feedListIsLoading: isLoading,
    feedListIsError: isError,
  };
};

export default useGetFeedList