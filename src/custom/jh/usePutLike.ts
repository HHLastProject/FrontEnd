import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queries';
import api, { api_token } from '../../shared/api';
import { queryClient } from '../..';
import { getToken } from '../../apis/getToken';

export const usePutLike = (feedId: number) => {
  const token = getToken();
  console.log('피드아이디', feedId);
  const { mutate } = useMutation({
    mutationKey: queryKeys.PUT_LIKE,
    mutationFn: async () => {
      const res = await api_token.put(`/api/feed/${feedId}/like`, {
        headers: {
          "authorization": `${token}`,
        }
      });
      console.log('성공!',res.data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.GET_FEEDS);
      console.log("하트");
    },
    onError: (error) => {
      throw error;
    }
  })
  return {changeLike : mutate};
}

export default usePutLike