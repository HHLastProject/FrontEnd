import { useQuery } from "@tanstack/react-query"
import { api_token } from "../shared/api"

const useGetGooList = () => {
    const { data } = useQuery({
        queryKey: ['GET_GOO_LIST'],
        queryFn: async () => {
            const res = await api_token.get('/api/search/summary');
            return res.data;
        }
    })
    return { gooList: data };
}

export default useGetGooList