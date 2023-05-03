import { createContext } from "react";
import { categoryTypes } from "../custom/ym/types";

export const RangeContext = createContext<{range: number, setRange: React.Dispatch<React.SetStateAction<number>>} | null>(null);
export const ShopListOrderByContext = createContext<{orderBy: string, setOrderBy: React.Dispatch<React.SetStateAction<string>>} | null>(null);
//타입
export type THidden = {
  isSelectHidden?: boolean,
  setIsSelectHidden?: React.Dispatch<React.SetStateAction<boolean>> | null,
  onClickHiddenHandler?: React.MouseEventHandler<HTMLDivElement> | null,
}
export type TSetNumber = {
  commentId: number,
  setCommentId: React.Dispatch<React.SetStateAction<number>> | null,
}
export type TFeedId = {
  feedId: number,
  setFeedId: React.Dispatch<React.SetStateAction<number>> | null,
}
export type TOrderBy = {
  orderBy: string,
  setOrderBy: React.Dispatch<React.SetStateAction<string>> | null,
}

export interface IShopCategory {
  range?: number,
  setRange?: React.Dispatch<React.SetStateAction<number>> | null,
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<categoryTypes>> | null,
}

//Context
export const HiddenContext = createContext<THidden>({
  isSelectHidden: false,
  setIsSelectHidden: null,
});

export const ShopCategory = createContext<IShopCategory>({
  range: 500,
  setRange: null,
  category: "",
  setCategory: null,
});

export const CommentIdContext = createContext<TSetNumber>({
  commentId: 0,
  setCommentId: null,
});

export const OrderByContext = createContext<TOrderBy>({
  orderBy: '',
  setOrderBy: null,
});

export const FeedIdContext = createContext<TFeedId>({
  feedId: 0,
  setFeedId: null,
});