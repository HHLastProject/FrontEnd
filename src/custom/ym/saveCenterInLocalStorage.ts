import { Coordinate } from "./types";

const saveCenterInLocalStorage = (value: Coordinate) => {
    localStorage.setItem("lng", String(value.lng));
    localStorage.setItem("lat", String(value.lat));
};

export default saveCenterInLocalStorage;