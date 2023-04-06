export function getUserLocation(setLat: React.Dispatch<React.SetStateAction<number>>, setLng: React.Dispatch<React.SetStateAction<number>>) {
  navigator.geolocation.getCurrentPosition((position) => {
    //성공했을 때 위도 경도 알아냄
    let userLat = position.coords.latitude;
    let userLng = position.coords.longitude;
    setLat(userLat);
    setLng(userLng);
  }, (err) => {
    //에러 발생했을 때
    alert('에러가 발생했습니다.');
  })
};

type Coordinate = {
  lng: number,
  lat: number,
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
  })
};