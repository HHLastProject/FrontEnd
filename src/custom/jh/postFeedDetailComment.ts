import { queryClient } from '../..';
import { getToken } from '../../apis/getToken';
import { queryKeys } from '../../apis/queries';
import api from '../../shared/api';
import { apiPath } from '../../shared/path';

export const postFeedDetailComment = async({feedId, feedComment}: {feedId: number, feedComment: string}) => {
  const {data} = await api.post(`${apiPath.feedDetailComment}/${feedId}`, {feedComment}, {
    headers: {
      authorization: `${getToken()}`,
    },
  })
  .then((res) => {
    console.log('성공', res);
    queryClient.invalidateQueries({queryKey: queryKeys.GET_FEED_DETAIL_COMMENT});
    return res;
  })
  .catch((error) => {throw error});
  return { 
    postedComment: data.comment,
    postedCommentMsg: data.msg,
  };
}

export default postFeedDetailComment