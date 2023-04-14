export type Font = {
    fontSize: string,
    lineHeight: string,
    fontWeight: string,
    color: string,
};

export type ChildrenForJSX = {
    children: JSX.Element
};

export type Coordinate = {
    lng: number,
    lat: number,
};

export interface EachData {
    shopId: number,
    category: string,
    shopName: string,
    thumbnail: string,
    region: string,
    distance: number,
    rate: number,
    reviews: number,
    lat: number,
    lng: number
}