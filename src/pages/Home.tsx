import React, { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react'
import MapModule from '../components/map/MapModule';
import { Container as MapDiv, Overlay, Marker, NaverMap, useNavermaps, useMap } from 'react-naver-maps';
import { getRealtimeLocation } from '../custom/jh/getUserLocation';
import data from "../datasample/data.json"
import { HFlex, HFlexSpaceBetween, PublicContainer, VFlex, VFlexCenter } from '../custom/ym/styleStore';
import styled from 'styled-components';
import MapHeader from '../components/map/MapHeader';
import CarouselBox from '../components/map/carousel/CarouselBox';
import { FILTER_LIST, LINE_MEDIUM, STRONG_MEDIUM, SAMPLE_DATA } from '../custom/ym/variables';
import uuid from 'react-uuid';
import { MEDIUM } from '../custom/ym/variables';

type Coordinate = {
    lng: number,
    lat: number,
};
type JsonData = {
    shopName: string,
    category: string,
    jibunAddress: string,
    roadAddress: string,
    lat: number,
    lng: number
}
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


const Home = () => {

    const navermaps = useNavermaps();
    // const map = useMap();
    const [range, setRange] = useState(500);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<string>('');
    const [list, setList] = useState<(EachData | null)[]>([]);
    // const map = useRef(null);

    const [temp, setTemp] = useState({ lat: 37.5108407, lng: 127.0468975 });


    // 실시간 유저 위치
    const [userCoord, setUserCoord] = useState<Coordinate>({
        lng: 0,
        lat: 0,
    });

    // 샵 위치
    const [shopCoord, setShopCoord] = useState<Coordinate[]>([]);

    const icon = {
        url: `${process.env.PUBLIC_URL}/markers/shop3.png`,
        anchor: new navermaps.Point(0, 0),
    }

    const moveCenter = () => {
        navermaps.Service.geocode({
            query: search,
        }, (status, response) => {
            if (status !== navermaps.Service.Status.OK) {
                return alert("Something wrong!");
            }
            console.log(response);
            setTemp((prev) => {
                return {
                    lat: parseFloat(response.v2.addresses[0].y),
                    lng: parseFloat(response.v2.addresses[0].x),
                }
            });
        })
    }

    const filterClickHandler = (buttonName: string) => {
        if (category === buttonName) {
            setCategory("");
        } else {
            setCategory(prev => buttonName);
        }

        console.log(category);
        // console.log(buttonName);
    }

    useEffect(() => {
        // getRealtimeLocation(setUserCoord);
        // console.log(userCoord);
        if (category) {
            setList(prev => {
                const searchResult = SAMPLE_DATA.map((item) => item.category === category ? item : null);
                return searchResult;
            })
        } else {
            setList(SAMPLE_DATA);
        }

    }, [category]);

    return (
        <VFlex etc='position: relative;'>
            <VFlexCenter etc="min-width:500px;min-width:390px;height:100%;flex:1;">
                <MapHeader />
                <MapModule category={category} />
            </VFlexCenter>
            <CategoryButtons>
                {FILTER_LIST.map((element) => <FilterBtn
                    selected={category}
                    name={element}
                    key={uuid()}
                    onClick={(e) => filterClickHandler(element)}
                >{element}</FilterBtn>)}
            </CategoryButtons>
            <AimBtn>
                <Image src={`${process.env.PUBLIC_URL}/icon/current location_24.png`} alt="" />
            </AimBtn>
            <CarouselModule>
                <CarouselBox>{list}</CarouselBox>
            </CarouselModule>
        </VFlex>
    );
}

export default Home;

const CategoryButtons = styled.div`
    position: absolute;
    display: flex;
    gap : 4px;
    z-index: 50;
    top: 80px;
    left : 20px;
`

const FilterBtn = styled.button<{
    selected: string,
    name: string,
}>`
    height: 36px;
    padding : 7px 12px;
    border : 1px solid ${({ selected, name }) =>
        selected === name ? `#${MEDIUM}` : `#${LINE_MEDIUM}`};
    border-radius: 18px;
    color : ${({ selected, name }) =>
        selected === name ? 'white' : `#${STRONG_MEDIUM}`};
    font-family : "Pretendard";
    font-weight : 400;
    line-height : 22px;
    font-size : 14px;
    background-color : ${({ selected, name }) => selected === name ? `#${MEDIUM}` : 'white'};
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`;

const AimBtn = styled.button`
    position: absolute;
    bottom: 236px;
    z-index: 1;
    width: 40px;
    height : 40px;
    right: 35px;
    padding: 6px;
    border : none;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    background-color: white;
`;

const CarouselModule = styled.div`
    position: absolute;
    bottom: 0;
    width: 332px;
    height: 214px;
    /* padding : 20px; */
    padding-right: 0px;
    background-color: transparent;
`;
