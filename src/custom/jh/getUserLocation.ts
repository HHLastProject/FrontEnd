export function getUserLocation (setX : React.Dispatch<React.SetStateAction<number>>, setY : React.Dispatch<React.SetStateAction<number>>) : string | undefined {
  navigator.geolocation.getCurrentPosition((position) => {
    //성공했을 때 위도 경도 알아냄
    let x = position.coords.longitude;  //경도
    let y = position.coords.latitude;   //위도
    setX(x);
    setY(y);
  }, (err) => {
    //에러 발생했을 때
    const errorMsg = '위치를 찾는 중 에러가 발생했습니다.';
    return errorMsg;
  })
  return undefined;
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