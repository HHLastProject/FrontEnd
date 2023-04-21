import { useQuery } from "@tanstack/react-query"
import { api_token } from "../shared/api"
import { FeedDetails, TossedFeedData } from "../custom/ym/types";

const useFeedDataCall = (feedId: number) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["GET_USER_FEED"],
        queryFn: async () => {
            const { data } = await api_token.get(`${process.env.REACT_APP_SERVER_URL}/api/mypage/${feedId}`);
            return data.mypage;
        },
    });

    return { data, isLoading, isError };
}
export default useFeedDataCall;