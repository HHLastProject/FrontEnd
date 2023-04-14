import React, { createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { VFlex } from '../custom/ym/styleStore';
import UserProfile from '../components/mypage/UserProfile';
import MyFeeds from '../components/mypage/MyFeeds';
import CustomerCenter from '../components/mypage/CustomerCenter';
import { mypageData } from '../custom/ym/dummydata';
import { Buttons } from '../components/ui/element/buttons/Buttons';

export type StateContextType = {
    props: Feed | null,
    propsFunc: React.Dispatch<React.SetStateAction<Feed | null>>
}
export interface EachFeed {
    feedId: number,
    feedPic: string,
    comment: string,
    tags: string[] | null,
    shopId: number,
    shopName: string,
    shopAddress: string,
    shopThumbnail: string,
    isScrap: boolean,
}
export interface Feed {
    nickname: string,
    profilePic: string,
    feeds: (EachFeed | null)[],
    feedCount: number,
}

export const context = createContext<StateContextType | null>(null);

const Mypage = () => {

    const [feedData, setFeedData] = useState<Feed | null>(null);

    useEffect(() => {
        setFeedData(mypageData);
    }, []);

    return (
        <context.Provider value={{ props: feedData, propsFunc: setFeedData }}>
            <MypageContainer>
                <VFlex gap='40px' height='fit-content'>
                    <UserProfile />
                    <MyFeeds />
                    <CustomerCenter />
                </VFlex>
            </MypageContainer>
        </context.Provider>
    )
}

export default Mypage;

const MypageContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px 20px;
    background-color: white;
    box-sizing: border-box;
`