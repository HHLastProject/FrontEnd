import { GuCoord, GuData, GuInformation, guList } from "../shared/guCoordInform"

const makeArrayForCluster = (data: GuData[]) => {

    const result = data?.map((element) => {
        // console.log(element);
        const guCoordData: GuCoord = guList.filter((item) => item.guName === Object.keys(element)[0])[0];
        const newObj: GuInformation = {
            guName: Object.keys(element)[0],
            shopCount: Object.values(element)[0],
            lat: guCoordData.lat,
            lng: guCoordData.lng,
        }
        // console.log(Object.keys(element));
        // console.log(Object.values(element));
        return newObj;
        // const guCoordData: GuCoord = guList.filter((item) => itemelement.guName)[0];
        // console.log('guCoordData', guCoordData);
        // console.log('element 쪼갠거',{...element});
        // console.log('guCoordData.lat', guCoordData.lat)
        // return { ...element, lat: guCoordData.lat, lng: guCoordData.lng } as GuInformation;
        // return guCoordData;
    });

    return result;
}

export default makeArrayForCluster