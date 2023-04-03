export function getUserLocation(setLat : any, setLng : any) {
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