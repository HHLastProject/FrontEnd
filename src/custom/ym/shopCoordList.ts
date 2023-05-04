import { Coordinate } from "./types";
import { ShopData } from "./variables";

const shopCoordList = (arr: ShopData[]) => {
    const result: Coordinate[] = arr?.map((item) => {
        return {
            lng: item.lng,
            lat: item.lat
        }
    })
    return result;
}

export default shopCoordList;