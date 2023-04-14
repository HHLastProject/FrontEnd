import { EachData } from "../../pages/Map";


type Font = {
    fontSize: string,
    lineHeight: string,
    fontWeight: string,
    color: string,
}
export const NAVER_KEY: string = "8A68yt_6sjtArfei4u69";
export const NAVER_CALLBACK_URL: string = "http://localhost:3000/redirect/naver";

export const KAKAO_CALLBACK_URL: string = "http://localhost:3000/redirect/kakao";
export const KAKAO_CLIENT_SECRET: string = "X8gvhqId5AS6wHDNM34MZ4kwS0DWMJa7";
export const KAKAO_CLIENT_ID: string = "552308e28dcc9e6296fed9c2a196525e";
export const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_CALLBACK_URL}&response_type=code&prompt=login`;


export const NAVER_MAPS_CLIENT: string = 'ldgh7n9aiz';

export const FILTER_LIST: string[] = ["카페", "보드카페", "사주카페", "애견카페", "전통찻집"];
export const STRONG = '191919';
export const STRONG_MEDIUM = '2E3338';
export const MEDIUM = '717176';
export const LIGHT = 'A1A1AC';

export const PRIMARY_01 = '767676';
export const PRIMARY_02 = 'ADADAD';

export const BG_MEDIUM = 'F1F1F5';
export const BG_LIGHT = 'F8F8FA';

export const LINE_STRONG = '909096';
export const LINE_MEDIUM = 'DBDBDB';
export const LINE_LIGHT = 'EDEDED';

export const TITLE_2: Font = {
    fontSize: '20px',
    lineHeight: '30px',
    fontWeight: '600',
    color: `#${STRONG}`
}
export const TITLE_3: Font = {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '600',
    color: `#${STRONG}`
}
export const TITLE_4: Font = {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: '600',
    color: `#${MEDIUM}`,
}
export const TITLE_5: Font = {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '600',
    color: `#${STRONG}`,
}

export const BODY_1: Font = {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: '400',
    color: 'black',
}

export const BODY_3: Font = {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '400',
    color: `#${STRONG_MEDIUM}`,
}

export const BODY_4: Font = {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: '400',
    color: 'black',
}

export const BODY_5: Font = {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: `#${MEDIUM}`,
}

export const B14: Font = {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: '600',
    color: `#${STRONG_MEDIUM}`,
}


export const SAMPLE_DATA: EachData[] = [
    {
        shopId: 1,
        category: "카페",
        shopName: "1번 일반카페",
        thumbnail: `${process.env.PUBLIC_URL}/coffee.jpg`,
        region: "서울 강남구",
        distance: 202,
        rate: 4.8,
        reviews: 1,
        lat: 37.5104457,
        lng: 127.0469272,
    },
    {
        shopId: 2,
        category: "사주카페",
        shopName: "2번 사주카페",
        thumbnail: `${process.env.PUBLIC_URL}/coffee.jpg`,
        region: "서울 강남구",
        distance: 302,
        rate: 4.8,
        reviews: 1,
        lat: 37.5104457,
        lng: 127.0466590,
    },
    {
        shopId: 3,
        category: "사주카페",
        shopName: "3번 사주카페",
        thumbnail: `${process.env.PUBLIC_URL}/coffee.jpg`,
        region: "서울 강남구",
        distance: 102,
        rate: 4.8,
        reviews: 1,
        lat: 37.5109321,
        lng: 127.0471200,
    }
];