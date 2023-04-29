import { useQuery } from "@tanstack/react-query";
import { mypageKeys } from "../apis/queries";
import { apiPath } from "../shared/path";
import { api_token } from "../shared/api";
import { Feed } from "../pages/Mypage";

const useMypage = () => {

    // const typeFixedDispatch = stateDispatch as React.SetStateAction<Feed>;

    const { refetch, isError, isSuccess, data } = useQuery({
        queryKey: mypageKeys.GET_MYPAGE,
        queryFn: async () => {
            const res = await api_token.get(apiPath.mypage);
            const result = res.data.mypages as Feed[];
            return result[0] as Feed;
        },
        refetchOnMount: true,
        refetchOnReconnect: true,
        onSuccess(data) {
        },
        onError(err) {
            throw err;
        }
    });

    return { refetch, isError, isSuccess, data };
}

export default useMypage;