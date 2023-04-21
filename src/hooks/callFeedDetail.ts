import { useQuery } from "@tanstack/react-query"
import { api_token } from "../shared/api";
import { FeedDetails } from "../custom/ym/types";
import { mypageKeys } from "../apis/queries";

const useFeedDetails = (payload: number) => {
    const { refetch, data, isError, isSuccess } = useQuery({
        queryKey: mypageKeys.GET_FEED_DETAIL_IN_MYPAGE,
        queryFn: async () => {
            try {
                const res = await api_token.get(`/api/mypage/${payload}`);
                return res.data;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    });

    return { refetch, data, isError, isSuccess };
}

export default useFeedDetails;