import React from 'react'
import styled from 'styled-components';
import { VFlex } from '../../../custom/ym/styleStore';
import ModalContentsCover from './ModalContentsCover';
import { BODY_1 } from '../../../custom/ym/variables';
import { queryClient } from '../../..';
import { useMutation } from '@tanstack/react-query';
import { feedKeys } from '../../../apis/queries';
import { api_token } from '../../../shared/api';
import { useNavigate } from 'react-router-dom';
import { BtnRadius } from '../element/buttons/BtnRadius';

const FeedModalContents = ({ target }: { target: number }) => {

    const navi = useNavigate();

    const { mutate } = useMutation({
        mutationKey: feedKeys.DELETE_MYFEED,
        mutationFn: async (feedId: number) => {
            const res = await api_token.delete(`/api/mypage/${feedId}`);
            console.log(res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["GET_USER_FEED"]);
        }
    })

    const deleteFeedHandler = () => {
        mutate(target);
        navi('/mypage');
    }
    return (
        <ModalContentsContainer>
            <VFlex>
                <ModalContentsCover />
                <FeedSelector>
                    <FeedSelectorLabel>수정하기</FeedSelectorLabel>
                </FeedSelector>
                <FeedSelector>
                    <BtnRadius.Default onClick={deleteFeedHandler}>
                        <FeedSelectorLabel>삭제하기</FeedSelectorLabel>
                    </BtnRadius.Default>
                </FeedSelector>
            </VFlex>
        </ModalContentsContainer>
    )
}

export const ModalContents = { FeedModalContents };

const FeedSelectorLabel = styled.span`
    font-size: ${BODY_1.fontSize};
    line-height: ${BODY_1.lineHeight};
    font-weight: ${BODY_1.fontWeight};
    color: black;
`

const ModalContentsContainer = styled.div`
    position: absolute;
    bottom: 0px;
    left: 50%-195px;
    width: 390px;
    height: fit-content;
`
const FeedSelector = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 62px;
    padding: 20px;
    padding-right: auto;
    background-color: white;
`