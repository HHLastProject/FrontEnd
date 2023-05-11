import { categoryTypes } from "./types";
import { ShopData } from "./variables";

const changeListbyCategory = (
    setList: React.Dispatch<React.SetStateAction<ShopData[]>>,
    data: ShopData[],
    category: categoryTypes,
    range: number
) => {
    setList(prev => {
        if (category === "") {
            return data?.filter((element: ShopData) => element.distance <= range);
        } else {
            return data?.filter((element: ShopData) => element.category === category)
                .filter((element: ShopData) => element.distance <= range);
        }
    })
}

export default changeListbyCategory;