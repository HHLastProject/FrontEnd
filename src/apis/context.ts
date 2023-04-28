import { createContext } from "react";
import { categoryTypes } from "../custom/ym/types";

export const RangeContext = createContext<{range: number, setRange: React.Dispatch<React.SetStateAction<number>>} | null>(null);
export const ShopListOrderByContext = createContext<{orderBy: string, setOrderBy: React.Dispatch<React.SetStateAction<string>>} | null>(null);

export type THidden = {
  isSelectHidden?: boolean,
  setIsSelectHidden?: React.Dispatch<React.SetStateAction<boolean>> | null,
  onClickHiddenHandler?: React.MouseEventHandler<HTMLDivElement> | null,
}

export interface IShopCategory {
  range?: number,
  setRange?: React.Dispatch<React.SetStateAction<number>> | null,
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<categoryTypes>> | null,
  orderBy: string,
  setOrderBy: React.Dispatch<React.SetStateAction<string>> | null,
}

export const HiddenContext = createContext<THidden>({
  isSelectHidden: false,
  setIsSelectHidden: null,
});

export const ShopCategory = createContext<IShopCategory>({
  range: 500,
  setRange: null,
  category: "",
  setCategory: null,
  orderBy: '거리순',
  setOrderBy: null,
});