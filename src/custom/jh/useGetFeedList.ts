import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../apis/queries";
import api from "../../shared/api";
import { apiPath } from "../../shared/path";

export const useGetFeedList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.GET_FEEDS,
    queryFn: async () => {
      const {data} = await api.get(`${apiPath.feedList}`);
      console.log('data', data);
      return data;
    },
    onSuccess: (o) => {
      console.log(o, '성공');
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
  return {
    feedList : data,
    feedListIsLoading: isLoading,
    feedListIsError: isError,
  };
};

export default useGetFeedList