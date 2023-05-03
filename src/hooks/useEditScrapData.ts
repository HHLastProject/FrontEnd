import { useMutation } from "@tanstack/react-query"
import { scrapKeys } from "../apis/queries"
import { api_token } from "../shared/api"
import { PayloadForModifyScrapData } from "../custom/ym/types"
import { apiPath } from "../shared/path"

const useEditScrapData = () => {
    const { mutate, isSuccess, isError, isLoading } = useMutation({
        mutationKey: scrapKeys.POST_SCRAP_DB,
        mutationFn: async (payload: PayloadForModifyScrapData) => {
            const res = await api_token.post(apiPath.postScrapData, payload);
            return res;
        }
    });

    return { mutate, isSuccess, isError, isLoading };
}
export default useEditScrapData