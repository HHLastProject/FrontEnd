import { useEffect, useState } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import FeedProfile from '../FeedProfile';
import FeedPicture from './FeedPicture';
import FeedComment from './FeedComment';
import styled from 'styled-components';
import { BODY_3, PRIMARY_01, TITLE_5 } from '../../custom/ym/variables';
import TagList from './TagList';
import PlaceCard, { FeedCardData } from './PlaceCard';
import { imgPath, path } from '../../shared/path';
import useFeedDataCall from '../../hooks/useFeedDataCall';
import FeedLikeComment from './FeedLikeComment';
import { Buttons } from '../ui/element/buttons/Buttons';
import { colorSet } from '../ui/styles/color';
import { useNavigate } from 'react-router-dom';

type Prop = {
    // feedType: FeedApiPathType,
    children: number
}
const FeedContents = ({ children }: Prop) => {
    const [expand, setExpand] = useState<boolean>(false);
    const { data, refetch, isLoading, isError, isSuccess } = useFeedDataCall(children);
    const navi = useNavigate();

    const pic = imgPath.feedImg + data?.feedPic;
    const comment: string = data?.comment;
    const tags = data?.tags;

    const placeCardData: FeedCardData = {
        shopThumbnail: data?.shopThumbnail,
        shopName: data?.shopName,
        shopAddress: data?.shopAddress,
        isScrap: data?.isScrap,
        shopId: data?.shopId,
    }

    const expandButtonHandler = () => {
        setExpand(prev => !prev);
    }
    useEffect(() => {
        refetch();
    }, []);
    useEffect(() => {
    }, [isSuccess]);

    if (isLoading) return <div>로딩중</div>;
    if (isError) return <div>에러</div>

    return (
        <VFlex gap='12px' etc='padding:20px;'>
            <FeedProfile profilePic={data?.profilePic} params={children} isMine={true} />
            <FeedPicture>{pic as string}</FeedPicture>
            <HFlex width='fit-content' height='fit-content' gap='16px'>
                <HFlex gap='2px'>
                    <Buttons.Others.IconButton
                        width={24}
                        height={24}
                        fileName='like_inactive_24.png'
                    />
                    <Text>{data?.likeCount}</Text>
                </HFlex>
                <HFlex gap='2px'>
                    <Buttons.Others.IconButton
                        width={24}
                        height={24}
                        onClick={() => navi(`${path.toFeedComment}/${children}`)}
                        fileName='comment_24.png'
                    />
                    <Text>{data?.commentCount}</Text>
                </HFlex>
            </HFlex>
            <FeedComment isExpanded={expand}>{comment as string}</FeedComment>
            {comment?.length > 86
                ? <ExpandButton onClick={expandButtonHandler}>
                    <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
                </ExpandButton>
                : null
            }
            <TagList>{tags as string[]}</TagList>
            <PlaceCard dataset={placeCardData} />
        </VFlex>
    )
}

export default FeedContents;
const Text = styled.span`
    font-size: ${BODY_3.fontSize};
    line-height: ${BODY_3.lineHeight};
    font-weight: ${BODY_3.fontWeight};
    color: ${colorSet.textStrong}
`

const ExpandButton = styled.button`
    width: fit-content;
    padding: 0px;
    margin: 0px;
    border: none;
    background-color: transparent;
`
const ExpandText = styled.span`
    font-family: "Pretendard";
    font-size: ${TITLE_5.fontSize};
    font-weight: ${TITLE_5.fontWeight};
    line-height: ${TITLE_5.lineHeight};
    color: ${`#${PRIMARY_01}`};
`