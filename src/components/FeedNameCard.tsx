import React from 'react'
import styled from 'styled-components';
import { BODY_5, TITLE_5 } from '../custom/ym/variables';
import { mypageData } from '../custom/ym/dummydata';
import moment from 'moment';
import { VFlex } from '../custom/ym/styleStore';

const FeedNameCard = ({nickname, createdAt}: {nickname: string, createdAt: string}) => {
    return (
        <VFlex gap='2px'>
            <Name>{nickname}</Name>
            <CreatedDate>{createdAt}</CreatedDate>
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