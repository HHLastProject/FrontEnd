import returnRadius from "./returnRadius";
import { ShopData } from "./variables";

const rangeRefresh = (
    zoomUnit: number,
    setList: React.Dispatch<React.SetStateAction<ShopData[]>>,
    setRange: React.Dispatch<React.SetStateAction<number>>
) => {
    if (zoomUnit > 15 && zoomUnit < 20) {
        setRange(returnRadius(zoomUnit));
    } else {
        setList([]);
        setRange(0);
    }
};

export default rangeRefresh;