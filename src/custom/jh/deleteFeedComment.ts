import { api_token } from "../../shared/api";

const deleteFeedComment = async({feedId, commentId}: {feedId: number, commentId: number}) => {
  await api_token.delete(`/api/feed/comment/${feedId}/${commentId}`)
  .then((res) => {
    console.log('삭제성공', res);
    return res;
  })
  .catch((error) => {
    throw error;
  })
}

export default deleteFeedComment