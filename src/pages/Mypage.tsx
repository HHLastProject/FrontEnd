import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { VFlex } from '../custom/ym/styleStore';
import UserProfile from '../components/mypage/UserProfile';
import MyFeeds from '../components/mypage/MyFeeds';
import CustomerCenter from '../components/mypage/CustomerCenter';
import NoLoginStatus from '../components/mypage/NoLoginStatus';
import { ReceivedFeed } from '../custom/ym/types';
import useMypage from '../hooks/useMypage';

export type StateContextType = {
    props: Feed | null,
    propsFunc: React.Dispatch<React.SetStateAction<Feed | null>>,
    isLogin: boolean,
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
    feeds: (ReceivedFeed | null)[],
    feedCount: number,
}

export const context = createContext<StateContextType | null>(null);

const Mypage = () => {

    const [feedData, setFeedData] = useState<Feed | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const { data, isSuccess, isError, isLoading, refetch } = useMypage();

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            refetch();
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
        localStorage.setItem("nickname", feedData?.nickname as string);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setFeedData(data as Feed);
            setIsLogin(true);
            localStorage.setItem("nickname", data?.nickname as string);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        isError && setIsLogin(false);
    }, [isError]);

    if (isLoading) return <div>로딩중</div>;




    return (
        <context.Provider value={{ props: feedData, propsFunc: setFeedData, isLogin: isLogin }}>
            <MypageContainer>
                <VFlex gap='40px' height='fit-content'>
                    {isLogin
                        ? <>
                            <UserProfile />
                            <MyFeeds />
                        </>
                        : <NoLoginStatus />}
                    <CustomerCenter />
                </VFlex>
            </MypageContainer>
        </context.Provider>
    )
}

export default Mypage;

const MypageContainer = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 100%;
    padding: 40px 20px;
    background-color: white;
    box-sizing: border-box;
`