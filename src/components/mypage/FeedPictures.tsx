import React from 'react'
import { EachFeed, Feed } from '../../pages/Mypage'
import { HFlex } from '../../custom/ym/styleStore'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import MyAllFeeds from './AllFeedsButton'
import { ReceivedFeed } from '../../custom/ym/types'
import { imgPath } from '../../shared/path'

type Props = {
    isAll: boolean,
    children: (ReceivedFeed | null)[] | undefined,
}

const FeedPictures = ({ isAll, children }: Props) => {
    const navi = useNavigate();
    const openFeedDetail = (feedId: number) => {
        navi(`/feed/detail/${feedId}`);
    }
    const arr = children as ReceivedFeed[];

    console.log('feedPictures에서 칠드런:', children);

    if (isAll) {
        return (
            <HFlex gap='2px' height='fit-content' etc='flex-wrap: wrap;'>
                {arr.map((element) => {
                    return <Shot onClick={() => openFeedDetail(element.feadId as number)}>
                        <FeedImg src={element?.feedPic} />
                    </Shot>;
                })}
            </HFlex>
        );
    }

    return (
        <HFlex gap='2px' height='fit-content' etc='flex-wrap: wrap;'>
            {children?.map((element, index) => {
                if (index < 9) {
                    return <Shot onClick={() => openFeedDetail(element?.feadId as number)}>
                        <FeedImg src={`${imgPath.feedImg}${element?.feedPic}`} />
                    </Shot>;
                } else {
                    return null;
                }
            })}
            {children?.length as number > 9
                ? <MyAllFeeds temp={children?.length as number} />  // 임시로 피드의 수를 넘김(통신 연결전까지만 이 방식으로 사용)
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