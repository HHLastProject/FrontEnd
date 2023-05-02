import { useMutation } from "@tanstack/react-query";
import { scrapKeys } from "../apis/queries";
import { api_token } from "../shared/api";
import { apiPath } from "../shared/path";
import { queryClient } from "..";

const useDeleteFolder = () => {
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationKey: scrapKeys.DELETE_FOLDER,
        mutationFn: async (folderNumber: number) => {
            const res = await api_token.delete(apiPath.deleteScrapFolder + `/${folderNumber}`);
            console.log(res);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(scrapKeys.GET_SCRAP);
        }
    });

    return {
        deleteFolder: mutate,
        deleteIsError: isError,
        deleteIsSuccess: isSuccess,
        deleteIsLoading: isLoading
    }
}

export default useDeleteFolder