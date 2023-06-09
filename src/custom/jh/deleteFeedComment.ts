import { queryClient } from "../..";
import { queryKeys } from "../../apis/queries";
import { api_token } from "../../shared/api";

const deleteFeedComment = async({feedId, commentId}: {feedId: number, commentId: number}) => {
  await api_token.delete(`/api/feed/comment/${feedId}/${commentId}`)
  .then((res) => {
    queryClient.invalidateQueries(queryKeys.GET_FEED_DETAIL_COMMENT);
    return res.data.msg;
  })
  .catch((error) => {
    throw error;
  })
}

export default deleteFeedComment