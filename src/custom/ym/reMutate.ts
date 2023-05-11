import { UseMutateFunction } from "@tanstack/react-query";
import { MapCoordPayload } from "./variables";
import { Coordinate } from "./types";

const reMutate = (
    map: naver.maps.Map | null,
    center: Coordinate,
    setPrevPos: React.Dispatch<React.SetStateAction<Coordinate>>,
    setCenter: React.Dispatch<React.SetStateAction<Coordinate>>,
    mutate: UseMutateFunction<any, unknown, MapCoordPayload, unknown>
) => {
    const newPayload: MapCoordPayload = {
        lat: map?.getCenter().y as number,
        lng: map?.getCenter().x as number,
        range: 500
    }
    setPrevPos({ ...center });
    setCenter({ lat: newPayload.lat, lng: newPayload.lng });
    localStorage.setItem("lat", String(newPayload.lat));
    localStorage.setItem("lng", String(newPayload.lng));
    mutate(newPayload);
}

export default reMutate;