import { useMutation } from "@tanstack/react-query";
import { scrapKeys } from "../apis/queries";
import { api_token } from "../shared/api";
import { queryClient } from "..";
import { apiPath } from "../shared/path";

const useCreateFolder = () => {
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationKey: scrapKeys.POST_FOLDER,
        mutationFn: async (payload: object) => {
            const res = await api_token.post(apiPath.createScrapFolder, payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(scrapKeys.GET_SCRAP);
        }
    });

    return {
        createFolder: mutate,
        createIsLoading: isLoading,
        createIsError: isError,
        createIsIsSuccess: isSuccess
    };
}

export default useCreateFolder