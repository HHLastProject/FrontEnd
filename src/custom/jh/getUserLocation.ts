import { Coordinate } from "../ym/types";

export interface TUserLocation {
  isResolve: boolean, 
  userLng: number, 
  userLat: number,
}

export const getUserLocation = async(
  setLng: React.Dispatch<React.SetStateAction<number>>,
  setLat: React.Dispatch<React.SetStateAction<number>>) => {
  await navigator.geolocation.getCurrentPosition((position) => {
    //성공했을 때 위도 경도 알아냄
    const userLng = position.coords.longitude;  //경도
    const userLat = position.coords.latitude;   //위도
    setLng(userLng);
    setLat(userLat);
  }, (err) => {
  });
};

export function getRealtimeLocation(
  setState: React.Dispatch<React.SetStateAction<Coordinate>>
) {
  navigator.geolocation.getCurrentPosition((position) => {
    const newCoord: Coordinate = {
      lng: position.coords.longitude,
      lat: position.coords.latitude,
    }
    setState(newCoord);
  }, (err) => {
  });
  return null;
};