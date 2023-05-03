import { GuCoord, GuData, GuInformation, guList } from "../shared/guCoordInform"

const makeArrayForCluster = (data: GuData[]) => {

    const result = data.map((element) => {
        const guCoordData: GuCoord = guList.filter((item) => item.guName === Object.keys(element)[0])[0];
        const newObj: GuInformation = {
            guName: Object.keys(element)[0],
            shopCount: Object.values(element)[0],
            lat: guCoordData.lat,
            lng: guCoordData.lng,
        }
        return newObj;
    });

    return result;
}

export default makeArrayForCluster