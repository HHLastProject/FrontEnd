import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { VFlex } from '../custom/ym/styleStore';
import UserProfile from '../components/mypage/UserProfile';
import MyFeeds from '../components/mypage/MyFeeds';
import CustomerCenter from '../components/mypage/CustomerCenter';
import NoLoginStatus from '../components/mypage/NoLoginStatus';
import { ReceivedFeed } from '../custom/ym/types';
import useMypage from '../hooks/useMypage';
import Loading from '../components/loading/Loading';

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

export const MypageContext = createContext<StateContextType | null>(null);

const Mypage = () => {

    const [feedData, setFeedData] = useState<Feed | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [querySwitch, setQuerySwitch] = useState<boolean>(false);

    const { data, isSuccess, isError, isLoading, refetch } = useMypage(querySwitch);

    useEffect(() => {
        console.log("기본");
        if (localStorage.getItem("access_token")) {
            setQuerySwitch(true);
            refetch();
            setIsLogin(true);
        } else {
            setQuerySwitch(false);
            setIsLogin(false);
        }
        localStorage.setItem("nickname", feedData?.nickname as string);
    }, []);

    useEffect(() => {
        console.log("isSuccess");
        if (isSuccess) {
            setFeedData(data as Feed);
            setIsLogin(true);
            localStorage.setItem("nickname", data?.nickname as string);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        console.log("isError");
        isError && setIsLogin(false);
        console.log(`isError:${isError}, isSuccess:${isSuccess}`);
    }, [isError]);

    if (isLoading && data) return <Loading />;

    return (
        <MypageContext.Provider value={{ props: feedData, propsFunc: setFeedData, isLogin: isLogin }}>
            <MypageContainer>
                <VFlex gap='40px' height='fit-content'>
                    {isLogin
                        ? <>
                            <UserProfile querySwitch={querySwitch} />
                            <MyFeeds />
                        </>
                        : <NoLoginStatus />}
                    <CustomerCenter />
                </VFlex>
            </MypageContainer>
        </MypageContext.Provider>
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