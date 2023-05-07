import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import { api_token } from '../../shared/api';
import { queryClient } from '../..';

export const usePutLike = ({feedId, setLikeResult}: {feedId: number, setLikeResult: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const KEY = queryKeys.PUT_LIKE.concat(['feedId']);
  const { data, mutate } = useMutation({
    mutationKey: KEY,
    mutationFn: async () => {
      const res = await api_token.put(`/api/feed/${feedId}/like`);
      return res.data;
    },
    onSuccess: (res) => {
      setLikeResult(res.isLike);
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