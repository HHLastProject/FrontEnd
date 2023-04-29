import { queryClient } from "../..";
import { queryKeys } from "../../apis/queries";
import { api_token } from "../../shared/api";

const deleteFeedComment = async({feedId, commentId}: {feedId: number, commentId: number}) => {
  await api_token.delete(`/api/feed/comment/${feedId}/${commentId}`)
  .then((res) => {
    console.log('삭제성공', res);
    queryClient.invalidateQueries({ queryKey: queryKeys.GET_FEED_DETAIL_COMMENT});
    return res;
  })
  .catch((error) => {
    throw error;
  })
}

export default deleteFeedComment