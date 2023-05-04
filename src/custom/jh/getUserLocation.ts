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
    console.log('유저 위치 가져오기 실패');
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
    alert('위치정보를 가져오지 못했습니다.');
  });
  return null;
};