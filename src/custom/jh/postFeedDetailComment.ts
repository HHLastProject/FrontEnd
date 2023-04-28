import { getToken } from '../../apis/getToken';
import api from '../../shared/api';
import { apiPath } from '../../shared/path';

export const postFeedDetailComment = async({feedId, feedComment}: {feedId: number, feedComment: string}) => {
  await api.post(`${apiPath.feedDetailComment}/${feedId}`, {feedComment}, {
    headers: {
      authorization: `${getToken()}`,
    },
  })
  .then((res) => {
    console.log('성공', res);
  })
  .catch((error) => {throw error});
}

export default postFeedDetailComment