import { useMutation } from "@tanstack/react-query";
import { keys, mapQueryKeys, scrapKeys } from "../apis/queries";
import { api_token } from "../shared/api";
import { queryClient } from "..";

const useScrapToggle = () => {
    const { mutate, isSuccess, isLoading, isError } = useMutation({
        mutationKey: keys.PUT_TOGGLE_BOOKMARK,
        mutationFn: async (payload: number) => {
            console.log("payload:", payload);
            console.log('경로:', `/api/${payload}/scrap`);
            const res = await api_token.put(`/api/${payload}/scrap`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(mapQueryKeys.POST_SHOPS_IN_RANGE);
            queryClient.invalidateQueries(scrapKeys.GET_SCRAP);
            console.log("즐겨찾기 변경 성공");
        },
        onError: (error) => {
            throw error;
        }
    });

    return { mutate, isSuccess, isLoading, isError }
}

export default useScrapToggle;