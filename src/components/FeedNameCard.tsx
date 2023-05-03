import styled from 'styled-components';
import { BODY_5, TITLE_5 } from '../custom/ym/variables';
import moment from 'moment';
import { VFlex } from '../custom/ym/styleStore';
import { TossedFeedData } from '../custom/ym/types';
import { queryClient } from '..';

const FeedNameCard = ({ nickname, createdAt }: { nickname?: string, createdAt?: string }) => {
    let data = undefined;
    let date = '';

    if ((nickname === undefined) && (createdAt === undefined)) {
        data = queryClient.getQueriesData(["GET_USER_FEED"])[0][1] as TossedFeedData;
        date = moment(data?.createdAt).format("YYYY.MM.DD");
    }

    return (
        <>
            {(nickname && createdAt)
                ?
                <VFlex gap='2px'>
                    <Name>{nickname}</Name>
                    <CreatedDate>{createdAt}</CreatedDate>
                </VFlex>
                :
                <VFlex gap='2px' etc="flex:1">
                    <Name>{data?.nickname}</Name>
                    <CreatedDate>{date}</CreatedDate>
                </VFlex>
            }
        </>
    )
}

export default FeedNameCard;

const Name = styled.span`
    font-size: ${TITLE_5.fontSize};
    line-height: ${TITLE_5.lineHeight};
    font-weight: ${TITLE_5.fontWeight};
    color : ${TITLE_5.color};
`;
const CreatedDate = styled.span`
    font-size: ${BODY_5.fontSize};
    line-height: ${BODY_5.lineHeight};
    font-weight: ${BODY_5.fontWeight};
    color : ${BODY_5.color};
`;