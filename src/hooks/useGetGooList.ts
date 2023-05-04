import { useQuery } from "@tanstack/react-query"
import { api_token } from "../shared/api"

const useGetGooList = () => {
    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ['GET_GOO_LIST'],
        queryFn: async () => {
            const res = await api_token.get('/api/search/summary');
            return res.data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    })
    return { guList: data, gooIsSuccess: isSuccess };
}

export default useGetGooList