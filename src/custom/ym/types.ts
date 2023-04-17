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

export type ChildrenForBtnContents = {
    children: React.ReactNode
};

export interface BtnNavProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean,
    btnType: NavButtonInputLimit,
}

export interface NavStateProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean;
    name: NavButtonInputLimit;
    children?: React.ReactNode;
}

export interface InternalJSX extends React.ButtonHTMLAttributes<HTMLButtonElement> {
};

// export interface NavStateProp extends ComponentPropsWithoutRef<'button'> {
//     isActive: boolean;
//     onClick: React.MouseEventHandler<HTMLButtonElement>;
//     children?: JSX.Element;
// }

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

export interface BookmarkChildren {
    children: EachData;
}