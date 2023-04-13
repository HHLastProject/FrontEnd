import React from 'react'
import { EachFeed } from '../../pages/Mypage'
import { HFlex } from '../../custom/ym/styleStore'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import MyAllFeeds from './MyAllFeeds'

type Props = {
    children: (EachFeed | null)[] | undefined,
}

const FeedPictures = ({ children }: Props) => {
    const navi = useNavigate();
    const openFeedDetail = (feedId: number) => {
        navi(`/feed/detail/${feedId}`);
    }
    return (
        <HFlex gap='2px' height='fit-content' etc='flex-wrap: wrap;'>
            {children?.map((element, index) => {
                if (index < 9) {
                    return <Shot onClick={() => openFeedDetail(element?.feedId as number)}>
                        <FeedImg src={element?.feedPic} />
                    </Shot>;
                } else {
                    return null;
                }
            })}
            {children?.length as number > 9
                ? <MyAllFeeds />  // 전체보기 onClick 달아줘야함
                : null
            }
        </HFlex>
    )
}

export default FeedPictures;

const Shot = styled.div`
    cursor: pointer;
    flex: none;
    width: 115px;
    height :115px;
`;

const FeedImg = styled.img`
    width: 100%;
    height:100%;
    object-fit: cover;
`