import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { BODY_5, TITLE_5 } from '../custom/ym/variables';
import { mypageData } from '../custom/ym/dummydata';
import moment from 'moment';
import { HFlex, VFlex } from '../custom/ym/styleStore';
import { QueryCache, QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { mypageKeys } from '../apis/queries';
import { FeedDetails, TossedFeedData } from '../custom/ym/types';
import { api_token } from '../shared/api';
import tryFeedDetailByAxios from '../hooks/tryFeedDetailByAxios';
import useFeedDataCall from '../hooks/useFeedDataCall';
import { queryClient } from '..';
import { Buttons } from './ui/element/buttons/Buttons';
import { useNavigate } from 'react-router-dom';

// 주희님껀지 내껀지 구분하는 프롭스 타입
// type AA = {
// a? : true,
// }
const FeedNameCard = () => {

    // 주희님 API 열리게 되면 이렇게 진행하면 됨.
    // const data = a
    // ? 주희님코드 
    // : queryClient.getQueriesData(["GET_USER_FEED"])[0][1] as TossedFeedData;

    const data = queryClient.getQueriesData(["GET_USER_FEED"])[0][1] as TossedFeedData;
    const date = moment(data?.createdAt).format("YYYY.MM.DD");

    return (
        <VFlex gap='2px' etc="flex:1">
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