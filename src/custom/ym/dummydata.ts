import { Feed } from "../../pages/Mypage";

export const mypageData: Feed = {
    nickname: "라니",
    profilePic: "https://ojsfile.ohmynews.com/STD_IMG_FILE/2022/0518/IE002993026_STD.JPG",
    feeds: [
        {
            feadId: 1,
            feedPic: `${process.env.PUBLIC_URL}/sampleimg/1.png`,
        },
        {
            feadId: 2,
            feedPic: `${process.env.PUBLIC_URL}/sampleimg/2.png`,
        },
        {
            feadId: 3,
            feedPic: `${process.env.PUBLIC_URL}/sampleimg/3.png`,
        },
    ],
    feedCount: 12
}