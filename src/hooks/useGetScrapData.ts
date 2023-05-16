import { useQuery } from "@tanstack/react-query"
import { scrapKeys } from "../apis/queries"
import { api_token } from "../shared/api";
import { apiPath } from "../shared/path";
import { ReceivedBookmarks } from "../custom/ym/types";

const useGetScrapData = () => {
    const { data, refetch, isSuccess, isError, isLoading } = useQuery({
        queryKey: scrapKeys.GET_SCRAP,
        queryFn: async () => {
            const res = await api_token.get(apiPath.scrapList);
            return res.data as ReceivedBookmarks;
        },
        refetchOnMount: true,
        onSuccess(data) {
        },
        onError(err) {
            throw err;
        },
    });

    return {
        scrapData: data,
        refetchScrapQuery: refetch,
        isSuccess,
        isError,
        isLoading
    }
}

export default useGetScrapData