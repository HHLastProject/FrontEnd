import { Coordinate, MapDispatches, MapStates } from "./types";
import { ShopData } from "./variables";


/*
현재의 Zoom에 대응되는 반경의 데이터로 List세팅
*/

export const refreshListByRange = (
    data: ShopData[],
    range: number,
    setList: React.Dispatch<React.SetStateAction<ShopData[]>>
) => {
    const result = data?.filter((element) => element.distance <= range);
    setList(result);
    return result;
}


/*
현재 위치를 이전 위치로서 저장 후, 이전 위치로 센터 이동
*/

export const aimClickHandler = (
    prevPos: Coordinate,
    setPrevPos: React.Dispatch<React.SetStateAction<Coordinate>>,
    states: MapStates,
    map: naver.maps.Map | null,
    dispatches: MapDispatches,
) => {
    const tempPrev = { ...prevPos };
    const tempCenter = { ...states.center };
    map?.panTo(prevPos);
    setPrevPos(tempCenter);
    dispatches.setCenter(tempPrev);
    refreshListByRange(states.list, states.range, dispatches.setList);
}