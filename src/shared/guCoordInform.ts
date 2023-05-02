export interface GuData {
    [guName: string]: number,
}

export interface GuCoord {
    guName: string,
    lat: number,
    lng: number
}

export interface GuInformation extends GuCoord {
    shopCount: number,
}

export const guList: GuCoord[] = [
    { guName: "관악구", lat: 37.4783684, lng: 126.9515619 },
    { guName: "송파구", lat: 37.5145837, lng: 127.1059177 },
    { guName: "강남구", lat: 37.5173319, lng: 127.0473774 },
    { guName: "중구", lat: 37.5638078, lng: 126.9975552 },
    { guName: "종로구", lat: 37.5735042, lng: 126.97899 },
    { guName: "강동구", lat: 37.5301933, lng: 127.1237925 },
    { guName: "동작구", lat: 37.512482, lng: 126.9393151 },
    { guName: "성북구", lat: 37.5893588, lng: 127.0167029 },
    { guName: "마포구", lat: 37.5662142, lng: 126.9019551 },
    { guName: "성동구", lat: 37.5634272, lng: 127.0369301 },
    { guName: "구로구", lat: 37.4954331, lng: 126.8875053 },
    { guName: "노원구", lat: 37.6543618, lng: 127.0564305 },
    { guName: "광진구", lat: 37.5385583, lng: 127.0823852 },
    { guName: "서초구", lat: 37.4835888, lng: 127.0327345 },
    { guName: "용산구", lat: 37.5324274, lng: 126.9905778 },
    { guName: "도봉구", lat: 37.6686914, lng: 127.0472105 },
    { guName: "은평구", lat: 37.6028174, lng: 126.928941 },
    { guName: "서대문구", lat: 37.5791619, lng: 126.9368157 },
    { guName: "강서구", lat: 37.5509646, lng: 126.8495338 },
    { guName: "영등포구", lat: 37.5263636, lng: 126.8962739 },
    { guName: "동대문구", lat: 37.574523, lng: 127.039657 },
    { guName: "강북구", lat: 37.6397513, lng: 127.0255381 },
    { guName: "금천구", lat: 37.4568411, lng: 126.8954568 },
    { guName: "양천구", lat: 37.5169885, lng: 126.8665014 },
    { guName: "중랑구", lat: 37.6065432, lng: 127.0928203 },
    { guName: "장안구", lat: 37.3039218, lng: 127.0102734 },
    { guName: "영통구", lat: 37.2596036, lng: 127.0466248 },
    { guName: "권선구", lat: 37.2576307, lng: 126.9718725 },
    { guName: "팔달구", lat: 37.2826741, lng: 127.0201351 }
]