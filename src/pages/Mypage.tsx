import React, { createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { VFlex } from '../custom/ym/styleStore';
import UserProfile from '../components/mypage/UserProfile';
import MyFeeds from '../components/mypage/MyFeeds';
import CustomerCenter from '../components/mypage/CustomerCenter';

export type StateContextType = {
    props: Feed | null,
    propsFunc: React.Dispatch<React.SetStateAction<Feed | null>>
}
export interface EachFeed {
    feedId: number,
    feedPic: string,
}
interface Feed {
    nickname: string,
    profilePic: string,
    feeds: (EachFeed | null)[],
    feedCount: number,
}

export const context = createContext<StateContextType | null>(null);

const Mypage = () => {

    const sampleData: Feed = {
        nickname: "라니",
        profilePic: "https://img.freepik.com/free-photo/beautiful-female-face-perfect-and-clean-skin-of-face-on-white_155003-32164.jpg",
        feeds: [
            {
                feedId: 1,
                feedPic: "https://img.kbs.co.kr/kbs/620/news.kbs.co.kr/data/fckeditor/new/image/2023/01/13/299931673597441715.png"
            },
            {
                feedId: 2,
                feedPic: "https://www.akomnews.com/wp1/wp-content/uploads/2019/01/%EC%BB%A4%ED%94%BC%EB%B9%84%EB%A7%8C.jpg"
            },
            {
                feedId: 3,
                feedPic: "http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/10/25/20191025000072_0.jpg"
            },
            {
                feedId: 4,
                feedPic: "http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/10/25/20191025000073_0.jpg"
            },
            {
                feedId: 5,
                feedPic: "https://img.kbs.co.kr/kbs/620/news.kbs.co.kr/data/fckeditor/new/image/2023/01/13/299931673597441715.png"
            },
            {
                feedId: 6,
                feedPic: "https://www.akomnews.com/wp1/wp-content/uploads/2019/01/%EC%BB%A4%ED%94%BC%EB%B9%84%EB%A7%8C.jpg"
            },
            {
                feedId: 7,
                feedPic: "http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/10/25/20191025000072_0.jpg"
            },
            {
                feedId: 8,
                feedPic: "http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/10/25/20191025000073_0.jpg"
            },
            {
                feedId: 9,
                feedPic: "https://img.kbs.co.kr/kbs/620/news.kbs.co.kr/data/fckeditor/new/image/2023/01/13/299931673597441715.png"
            },
            {
                feedId: 10,
                feedPic: "https://www.akomnews.com/wp1/wp-content/uploads/2019/01/%EC%BB%A4%ED%94%BC%EB%B9%84%EB%A7%8C.jpg"
            },
            {
                feedId: 11,
                feedPic: "http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/10/25/20191025000072_0.jpg"
            },
            {
                feedId: 12,
                feedPic: "http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/10/25/20191025000073_0.jpg"
            }
        ],
        feedCount: 12
    }

    const [feedData, setFeedData] = useState<Feed | null>(null);

    useEffect(() => {
        setFeedData(sampleData);
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