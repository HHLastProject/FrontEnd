import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { queryClient } from '../..';

export const usePutLike = ({feedId}: {feedId: number}) => {
  const KEY = queryKeys.PUT_LIKE.concat(['feedId']);
  const { data, mutate } = useMutation({
    mutationKey: KEY,
    mutationFn: async () => {
      const res = await api_token.put(`/api/feed/${feedId}/like`);
      console.log('성공!',res.data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.GET_FEEDS);
      queryClient.invalidateQueries(queryKeys.GET_SHOP_DETAIL_FEED);
    },
    onError: (error) => {
      throw error;
    }
  })
  return {
    isLike : data,
    changeLike : mutate,
  };
}

export default usePutLike