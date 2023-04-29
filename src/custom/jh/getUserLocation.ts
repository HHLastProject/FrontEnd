import { Coordinate } from "../ym/types";

export const getUserLocation = async(
  setLng: React.Dispatch<React.SetStateAction<number>>,
  setLat: React.Dispatch<React.SetStateAction<number>>) => {
  await navigator.geolocation.getCurrentPosition((position) => {
    //성공했을 때 위도 경도 알아냄
    let lng = position.coords.longitude;  //경도
    let lat = position.coords.latitude;   //위도
    setLng(lng);
    setLat(lat);
  }, (err) => {
    //에러 발생했을 때
    const errorMsg = '위치를 찾는 중 에러가 발생했습니다.';
    return errorMsg;
  })
  return undefined;
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