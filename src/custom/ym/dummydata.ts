import { Feed } from "../../pages/Mypage";
import { ScrapListEachData } from "./types";

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


const data1: ScrapListEachData = {
    shopId: 2322,
    address: "서울특별시 무슨구 무슨로",
    shopName: "더미카페 01",
    thumbnail: "cafe.png",
    feedCount: 3,
    isScrap: true,
    category: "카페",
    folderName: "폴더01"
}
const data2: ScrapListEachData = {
    shopId: 2443,
    address: "서울특별시 무슨구 무슨로",
    shopName: "더미카페 02",
    thumbnail: "cafe.png",
    feedCount: 3,
    isScrap: true,
    category: "애견카페",
    folderName: "폴더02"
}
const data3: ScrapListEachData = {
    shopId: 2543,
    address: "서울특별시 무슨구 무슨로",
    shopName: "더미카페 03",
    thumbnail: "cafe.png",
    feedCount: 3,
    isScrap: true,
    category: "카페",
    folderName: "폴더04"
}
const data4: ScrapListEachData = {
    shopId: 2113,
    address: "서울특별시 무슨구 무슨로",
    shopName: "더미카페 04",
    thumbnail: "cafe.png",
    feedCount: 3,
    isScrap: true,
    category: "사주카페",
    folderName: "폴더01"
}


export const bookmarkData = {
    scrapList: [
        data1, data2, data3, data4
    ],
    folderList: ["폴더01", "폴더05", "폴더02", "폴더03", "폴더04"],

}