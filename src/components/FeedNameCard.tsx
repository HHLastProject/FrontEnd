import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { BODY_5, TITLE_5 } from '../custom/ym/variables';
import { mypageData } from '../custom/ym/dummydata';
import moment from 'moment';
import { VFlex } from '../custom/ym/styleStore';
import { QueryCache, QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { mypageKeys } from '../apis/queries';
import { FeedDetails, TossedFeedData } from '../custom/ym/types';
import { api_token } from '../shared/api';
import tryFeedDetailByAxios from '../hooks/tryFeedDetailByAxios';
import useFeedDataCall from '../hooks/useFeedDataCall';
import { queryClient } from '..';

const FeedNameCard = () => {

    const data = queryClient.getQueriesData(["GET_USER_FEED"])[0][1] as TossedFeedData;
    const date = moment(data?.createdAt).format("YYYY.MM.DD");

    return (
        <VFlex gap='2px'>
            <Name>{data?.nickname}</Name>
            <CreatedDate>{date}</CreatedDate>
        </VFlex>
    )
}

export default FeedNameCard;

const Name = styled.span`
    font-size: ${TITLE_5.fontSize};
    line-height: ${TITLE_5.lineHeight};
    font-weight: ${TITLE_5.fontWeight};
    color : ${TITLE_5.color};
`
const CreatedDate = styled.span`
    font-size: ${BODY_5.fontSize};
    line-height: ${BODY_5.lineHeight};
    font-weight: ${BODY_5.fontWeight};
    color : ${BODY_5.color};
`