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
    queryClient.invalidateQueries({queryKey: queryKeys.GET_FEED_DETAIL_COMMENT});
    return res.data;
  })
  .catch((error) => {throw error});
  return { 
    postedComment: data,
    postedCommentMsg: data.msg,
  };
}

export default postFeedDetailComment