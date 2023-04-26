import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { VFlex } from '../custom/ym/styleStore';
import UserProfile from '../components/mypage/UserProfile';
import MyFeeds from '../components/mypage/MyFeeds';
import CustomerCenter from '../components/mypage/CustomerCenter';
import { mypageData } from '../custom/ym/dummydata';
import { useMutation, useQuery } from '@tanstack/react-query';
import { mypageKeys } from '../apis/queries';
import { api_token } from '../shared/api';
import { apiPath } from '../shared/path';
import NoLoginStatus from '../components/mypage/NoLoginStatus';
import { ReceivedFeed } from '../custom/ym/types';

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

    const { refetch, data } = useQuery({
        queryKey: mypageKeys.GET_MYPAGE,
        queryFn: async () => {
            const res = await api_token.get(apiPath.mypage);
            return res.data.mypages[0];
        },
        onSuccess(data) {
            console.log(data);
            setFeedData(data);
        },
        onError(err) {
            throw err;
        }
    })

    useEffect(() => {
        localStorage.getItem("access_token")
            ? setIsLogin(true)
            : setIsLogin(false);
        refetch();
        localStorage.setItem("nickname", data?.nickname);
    }, [isLogin]);


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