import { NavigateFunction } from "react-router-dom";
import { ShopData } from "./variables";
import { UseMutateFunction } from "@tanstack/react-query";
import { path } from "../../shared/path";
import { categoryTypes } from "./types";

export const openDetail = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    shopId: number,
    navi: NavigateFunction,
) => {
    e.stopPropagation();
    navi(`/shop/${shopId}`);
}

export const toggleScrap = (
    // e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ShopData,
    mutate: UseMutateFunction<any, unknown, number, unknown>,
    navi: NavigateFunction,
) => {
    e.stopPropagation();
    if (localStorage.getItem("access_token")) {
        mutate(item.shopId);
        item.isScrap = !item.isScrap;
    } else {
        window.confirm("로그인이 필요한 기능입니다.\n로그인을 하시겠습니까?") && navi(path.login);
    }
};

export const filteredList = (
    list: ShopData[],
    category: categoryTypes
) => {
    return list?.filter((element) => {
        if (category === "") return element;
        if (element.category === category) {
            return element;
        } else {
            return null;
        }
    });
};

export const convertAddress = (text: string) => {
    const stringData = text.replace("경기도 ", "").replace("특별", "").split(" ");
    return stringData[0].replace("시", "") + " " + stringData[1];
};