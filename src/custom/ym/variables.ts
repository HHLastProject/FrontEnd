import React from "react";
import { EachData } from "../../pages/Home";
import { Coordinate, categoryTypes, rangeTypes } from "./types";


type Font = {
    fontSize: string,
    lineHeight: string,
    fontWeight: string,
    color: string,
}
export const NAVER_KEY: string = "8A68yt_6sjtArfei4u69";
export const NAVER_CALLBACK_URL_LOCAL: string = "http://localhost:3000/redirect/naver";
export const NAVER_CALLBACK_URL: string = "http://yongminbucket.s3-website.ap-northeast-2.amazonaws.com/redirect/naver";

export const KAKAO_CALLBACK_URL_S3: string = "http://yongminbucket.s3-website.ap-northeast-2.amazonaws.com/redirect/kakao";
export const KAKAO_CALLBACK_URL_LOCAL: string = "http://localhost:3000/redirect/kakao"
export const KAKAO_CLIENT_SECRET: string = "X8gvhqId5AS6wHDNM34MZ4kwS0DWMJa7";
export const KAKAO_CLIENT_ID: string = "552308e28dcc9e6296fed9c2a196525e";
// export const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_CALLBACK_URL_S3}&response_type=code&prompt=login`;
export const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_CALLBACK_URL_LOCAL}&response_type=code&prompt=login`;


export const NAVER_MAPS_CLIENT: string = 'ldgh7n9aiz';

export const RANGE_FILTER_LIST: rangeTypes[] = [100, 200, 300, 500, 1000];
export const FILTER_LIST: categoryTypes[] = ["카페", "보드카페", "사주카페", "애견카페", "전통찻집"];
export const STRONG = '191919';
export const STRONG_MEDIUM = '2E3338';
export const MEDIUM = '717176';
export const LIGHT = 'A1A1AC';

export const PRIMARY_01 = '010101';
export const PRIMARY_02 = 'B81B1B';

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

export const HEADING_1: Font = {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: '700',
    color: `black`
}

export const navIcons = {
    home: {
        true: `${process.env.PUBLIC_URL}/icon/nav_icons/home_active.png`,
        false: `${process.env.PUBLIC_URL}/icon/nav_icons/home_inactive.png`
    },
    list: {
        true: `${process.env.PUBLIC_URL}/icon/nav_icons/list_active.png`,
        false: `${process.env.PUBLIC_URL}/icon/nav_icons/list_inactive.png`
    },
    feed: {
        true: `${process.env.PUBLIC_URL}/icon/nav_icons/feed_active.png`,
        false: `${process.env.PUBLIC_URL}/icon/nav_icons/feed_inactive.png`
    },
    bookmark: {
        true: `${process.env.PUBLIC_URL}/icon/nav_icons/bookmark_active.png`,
        false: `${process.env.PUBLIC_URL}/icon/nav_icons/bookmark_inactive.png`
    },
    mypage: {
        true: `${process.env.PUBLIC_URL}/icon/nav_icons/mypage_active.png`,
        false: `${process.env.PUBLIC_URL}/icon/nav_icons/mypage_inactive.png`
    },
}

export interface ShopData {
    shopId: number,
    shopName: string,
    thumbnail: string,
    address: string,
    category: categoryTypes,
    lat: number,
    lng: number,
    maxPrice: string,
    minPrice: string,
    menuName: string,
    distance: number,
    feedCount: number,
    isScrap: boolean,
}

export interface MapCoordPayload {
    lng: number,
    lat: number,
    range: number
}

export type ZoomValues = 15 | 16 | 17 | 18 | 19;
export type NavermapPointType = {
    x: number,
    y: number,
}

export const checkImg = {
    checked: 'selected_scrap.png',
    notChecked: 'not_selected_scrap.png',
}

export const scrapImg = {
    checked: 'bookmark checked.png',
    notChecked: 'book mark white_28.png'
}


export const clusterHTML = '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background-color:gray;border-radius:50%;">dd</div>'