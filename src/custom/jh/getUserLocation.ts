export function getUserLocation (setX : React.Dispatch<React.SetStateAction<number>>, setY : React.Dispatch<React.SetStateAction<number>>) : string | undefined {
  navigator.geolocation.getCurrentPosition((position) => {
    //성공했을 때 위도 경도 알아냄
    let x = position.coords.latitude;
    let y = position.coords.longitude;
    setX(x);
    setY(y);
  }, (err) => {
    //에러 발생했을 때
    const errorMsg = '위치를 찾는 중 에러가 발생했습니다.';
    return errorMsg;
  })
  return undefined;
};