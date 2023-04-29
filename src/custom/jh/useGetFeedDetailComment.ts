import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../apis/queries";
import api from "../../shared/api";
import { apiPath } from "../../shared/path";
import { getToken } from "../../apis/getToken";

export interface ICommentList {
  nickname: string,
  profilePic : string,
  feedCommentId: number,
  feedComment : string,
  createdAt : string,
  isMine : boolean,
};

const useGetFeedDetailComment = (feedId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.GET_FEED_DETAIL_COMMENT,
    queryFn: async () => {
      const {data} = await api.get(`${apiPath.feedDetailComment}/${feedId}`, {
        headers: {
          authorization: `${getToken()}`,
        },
      });
      return data.commentList;
    },
    onSuccess: (res) => {
      // queryClient.invalidateQueries({ queryKey: queryKeys.GET_SHOP_DETAIL_FEED });
    },
    onError: (error) => {
      throw error;
    },
  });
  return {
    feedDetailCommentData : data,
    feedDetailCommentIsLoading: isLoading,
    feedDetailCommentIsError: isError,
  };
};

export default useGetFeedDetailComment