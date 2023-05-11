import { colorSet } from "../../components/ui/styles/color";

export const clusterText = (guName: string, num: number) => {
    const clusterHTML = `<div style="cursor:pointer;width:fit-content;min-width:40px;height:fit-content;line-height:22px;font-size:12px;color:${colorSet.primary_02};text-align:center;font-weight:bold;background-color:white;border:2px solid ${colorSet.primary_02};border-radius:5px;"><div style="font-weight:bold;color:${colorSet.primary_01}">${guName}</div>${num}</div>`
    return clusterHTML;
}

export const createClusterMarkerIcon = (guName: string, count: number) => {
    const result = {
        content: clusterText(guName, count),
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20)
    }
    return result;
}