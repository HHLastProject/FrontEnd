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
  }).then((resolve) => {
      console.log("피드 등록 성공");
      alert("등록이 완료되었습니다!");
      console.log('성공', formData.get('feedPic'));
    })
    .catch((error) => {
      console.log(error);
    });
};