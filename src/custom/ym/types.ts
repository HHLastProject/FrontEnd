import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { StringLiteralType } from "typescript";

export type Font = {
    fontSize: string,
    lineHeight: string,
    fontWeight: string,
    color: string,
};

export interface ChildrenForSpan extends ComponentPropsWithoutRef<'span'> {
    children: React.ReactNode
};

export interface ChildrenForJSX extends ComponentPropsWithoutRef<'button'> {
    children: React.ReactNode
};

export type Coordinate = {
    lng: number,
    lat: number,
};

export type NavButtonInputLimit = "home" | "list" | "feed" | "bookmark" | "mypage";
export const NavButtonList: NavButtonInputLimit[] = ["home", "list", "feed", "bookmark", "mypage"];

export type categoryTypes = "카페" | "보드카페" | "사주카페" | "애견카페" | "전통찻집";

export interface ChildrenForBtnContents extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
};

export interface BtnNavProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean,
    btnType: NavButtonInputLimit,
}
export interface NavStateProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    name?: NavButtonInputLimit | categoryTypes;
    id?: categoryTypes;
    children?: React.ReactNode;
}
export interface CategoryStateProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    id: categoryTypes;
    children?: React.ReactNode;
}

export interface InternalJSX extends React.ButtonHTMLAttributes<HTMLButtonElement> {
};

export interface DivProp extends ComponentPropsWithoutRef<'button'> {
    isActive: boolean,
    name: string,
}

export interface EachData {
    shopId: number,
    category: string,
    shopName: string,
    thumbnail: string,
    region: string,
    distance: number,
    rate: number,
    reviews: number,
    lat: number,
    lng: number
}

export interface ScrapDataSet {
    shopId: number,
    shopName: string,
    feedCount: number,
    address: string,
    thumbnail: string,
    isScrap: boolean,
    category: string,
}

export interface BookmarkChildren extends ComponentPropsWithoutRef<'div'> {
    data: ScrapDataSet;
}

export interface CategoryProp {
    categoryState: categoryTypes | null;
}

export type FeedApiPathType = "shop" | "mypage";

export interface ReceivedFeed {
    feadId: number,
    feedPic: string,
}

export interface FeedDetails {
    comment: string,
    createdAt: string,
    feedPic: string,
    isScrap: boolean,
    nickname: string,
    profilePic: string,
    shopAddress: string,
    shopName: string,
    shopThumbnail: string,
    tags: string[],
}

export type TossedFeedData = {
    comment: string,
    createdAt: string,
    feedPic: string,
    isScrap: boolean,
    nickname: string,
    profilePic: string,
    shopAddress: string,
    shopName: string,
    shopThumbnail: string,
    tags: string[],
}


export interface ListTossedData {
    address: string,
    category: string,
    distance: number,
    feedCount: number,
    isScrap: boolean,
    lat: number,
    lng: number,
    maxPrice: number,
    menuName: string,
    minPrice: number,
    shopId: number,
    shopName: string,
    thumbnail: string,
}

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
    fileName: string,
    width: number,
    height: number,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

export interface PropsForSpaceHeader extends ComponentPropsWithoutRef<'span'> {
    BackOnClick: React.MouseEventHandler<HTMLButtonElement>,
    RightOnClick: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode
}