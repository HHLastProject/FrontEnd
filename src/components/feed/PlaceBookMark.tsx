import React, { useState } from 'react'
import styled from 'styled-components';
import { VFlexCenter } from '../../custom/ym/styleStore';
import { mypageData } from '../../custom/ym/dummydata';
import { EachFeed } from '../../pages/Mypage';
import { Buttons } from '../ui/element/buttons/Buttons';
import { useMutation } from '@tanstack/react-query';
import { keys, queryKeys } from '../../apis/queries';
import { ShopData } from '../../custom/ym/variables';
import { api_token } from '../../shared/api';
import { queryClient } from '../..';
import { useGetShopDetailFeed } from '../../custom/jh/useGetShopDetail';

const PlaceBookMark = ({ isScrap, shop }: { isScrap?: boolean, shop?: number }) => {
    // const { shopThumbnail } = mypageData.feeds[2] as EachFeed;

    // const {mutate} = useMutation(keys.PUT_TOGGLE_BOOKMARK);
    const { mutate } = useMutation({
        mutationKey: keys.PUT_TOGGLE_BOOKMARK,
        mutationFn: async (shop: number) => {
            console.log("payload:", shop);
            console.log('경로:', `/api/${shop}/scrap`);
            const res = await api_token.put(`/api/${shop}/scrap`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["GET_USER_FEED"]);
            queryClient.invalidateQueries(queryKeys.GET_FEEDS);
            console.log("즐겨찾기 변경 성공");
        },
        onError: (error) => {
            throw error;
        }
    })

    const toggleScrap = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        mutate(shop as number);
    }

    return (
        <Box>
            <VFlexCenter>
                <ButtonForScrap onClick={toggleScrap}>
                    <IconBox>
                        {isScrap
                            ? <Image src={`${process.env.PUBLIC_URL}/icon/bookmark checked.png`} alt="" />
                            : <Image src={`${process.env.PUBLIC_URL}/icon/book mark line_28.png`} alt="" />
                        }
                    </IconBox>
                </ButtonForScrap>
            </VFlexCenter>
        </Box>
    )
}

export default PlaceBookMark;

const ButtonForScrap = styled.button`
    width: fit-content;
    height: fit-content;
    border : none;
    background-color: transparent;
    padding: 0px;
    margin: 0px;
`

const Box = styled.div`
    width: 60px;
    height: 60px;
    border: none;
    background-color: transparent;
`
const IconBox = styled.div`
    width: 28px;
    height: 28px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`