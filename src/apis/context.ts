import { createContext } from "react";

export const RangeContext = createContext<{range: number, setRange: React.Dispatch<React.SetStateAction<number>>} | null>(null);
export const ShopListOrderByContext = createContext<{orderBy: string, setOrderBy: React.Dispatch<React.SetStateAction<string>>} | null>(null);