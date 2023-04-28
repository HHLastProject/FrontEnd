import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { queryClient } from '../..';
import { getToken } from '../../apis/getToken';

export const usePutLike = ({feedId, page}: {feedId: number, page: string}) => {
  const token = getToken();
  const KEY = queryKeys.PUT_LIKE.concat(['feedId']);
  const { mutate } = useMutation({
    mutationKey: KEY,
    mutationFn: async () => {
      const res = await api_token.put(`/api/feed/${feedId}/like`);
      console.log('성공!',res.data);
      return res.data;
    },
    onSuccess: () => {
      if(page === 'feedList') {
        queryClient.invalidateQueries(queryKeys.GET_FEEDS);
      } else if (page === 'shopDetailFeed') {
        queryClient.invalidateQueries(queryKeys.GET_SHOP_DETAIL_FEED);
      }
    },
    onError: (error) => {
      throw error;
    }
  })
  return {changeLike : mutate};
}

export default usePutLike