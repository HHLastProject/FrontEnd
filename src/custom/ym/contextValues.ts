import { Coordinate, categoryTypes } from "./types"
import { ShopData } from "./variables"

export interface States {
    range: number,
    category: categoryTypes | "",
    list: (ShopData | null)[],
    userCoord: Coordinate,
    shopCoord: (Coordinate | null)[],
    center: Coordinate,
    isMoving: boolean,
    isChanged: boolean,
}

export const states: States = {
    range: 200,
    category: "",
    list: [],
    userCoord: { lat: 37.5108407, lng: 127.0468975 },
    shopCoord: [],
    center: { lat: 37.5108407, lng: 127.0468975 },
    isMoving: false,
    isChanged: false,
}

export interface Dispatches {
    setRange: React.Dispatch<React.SetStateAction<number>> | null,
    setCategory: React.Dispatch<React.SetStateAction<"" | categoryTypes>> | null,
    setList: React.Dispatch<React.SetStateAction<(ShopData | null)[]>> | null,
    setUserCoord: React.Dispatch<React.SetStateAction<Coordinate>> | null,
    setShopCoord: React.Dispatch<React.SetStateAction<Coordinate[]>> | null,
    setCenter: React.Dispatch<React.SetStateAction<Coordinate>> | null,
    setIsMoving: React.Dispatch<React.SetStateAction<boolean>> | null,
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>> | null,
}
export const dispatches: Dispatches = {
    setRange: null,
    setCategory: null,
    setList: null,
    setUserCoord: null,
    setShopCoord: null,
    setCenter: null,
    setIsMoving: null,
    setIsChanged: null,
}