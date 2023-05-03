import { getToken } from "../../apis/getToken";
import api from "../../shared/api";

export const sendFeedData = async (shopId: number, formData: FormData) => {
  console.log('state에 안넣고 보낼때 formData:', formData.get('feedPic'));
  const token = getToken();
  await api.post(`/api/shop/${shopId}/feed`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `${token}`,
    },
  })
  .then((resolve) => {
    alert("등록이 완료되었습니다!");
  })
  .catch((error) => {
  });
};