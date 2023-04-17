import { ComponentPropsWithoutRef, ElementType } from "react";
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

export interface BookmarkChildren extends ComponentPropsWithoutRef<'div'> {
    data: EachData;
}

export interface CategoryProp {
    categoryState: categoryTypes | null;
}