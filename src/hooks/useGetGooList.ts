import { useQuery } from "@tanstack/react-query"
import { api_token } from "../shared/api"
import { mapQueryKeys } from "../apis/queries";

const useGetGuList = () => {
    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: mapQueryKeys.GET_GU_LIST,
        queryFn: async () => {
            const res = await api_token.get('/api/search/summary');
            return res.data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    })
    return { guList: data, guIsSuccess: isSuccess };
}

export default useGetGuList