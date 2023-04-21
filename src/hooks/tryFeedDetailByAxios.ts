import { FeedDetails } from "../custom/ym/types";
import { api_token } from "../shared/api";

const tryFeedDetailByAxios = (id: number, dispatch: React.Dispatch<React.SetStateAction<FeedDetails>>) => {
    const response = async () => {
        const res = await api_token.get(`/api/mypage/${id}`);
        console.log('res:', res);
        return res.data.mypage;
    }

    response()
        .then(value => dispatch({
            comment: value?.comment,
            createdAt: value?.createdAt,
            feedPic: value?.feedPic,
            isScrap: value?.isScrap,
            nickname: value?.nickname,
            profilePic: value?.profilePic,
            shopAddress: value?.shopAddress,
            shopName: value?.shopName,
            shopThumbnail: value?.shopThumbnail,
            tags: value?.tags,
        }));
}

export default tryFeedDetailByAxios