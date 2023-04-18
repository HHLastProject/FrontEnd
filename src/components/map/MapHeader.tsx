import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import { useNavigate } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../pages/Home';
import { BODY_5, TITLE_3 } from '../../custom/ym/variables';
import { colorSet } from '../ui/styles/color';

const MapHeader = () => {

    const { range } = useContext(StateContext);
    const { setRange } = useContext(DispatchContext);

    // const temp: React.Dispatch<React.SetStateAction<number>> =
    //     setRange as React.Dispatch<React.SetStateAction<number>>;

    const navi = useNavigate();
    const searchClickHandler = () => {
        navi('/search');
    }
    return (
        <HeaderContainer>
            <HFlex etc="padding: 0px 5px;" width='100%'>
                <VFlex height="fit-content" etc='padding:20px 10px;'>
                    <AroundSpan>내 주변</AroundSpan>
                    <HFlex height='fit-content' gap='2px'>
                        <RangeSpan>{range}m</RangeSpan>
                        <HeaderTextMedium>의 카페</HeaderTextMedium>
                    </HFlex>
                </VFlex>
                <ButtonContainer onClick={searchClickHandler}>
                    <Image src={`${process.env.PUBLIC_URL}/icon/search_24.png`} alt="" />
                </ButtonContainer>
            </HFlex>
        </HeaderContainer>
    )
}

export default MapHeader;
const AroundSpan = styled.span`
    font-size: ${BODY_5.fontSize};
    line-height: ${BODY_5.lineHeight};
    font-weight: ${BODY_5.fontWeight};
    color: ${colorSet.textStrong};
    margin: 0px;
    padding: 0px;
`
const RangeSpan = styled.span`
    font-size: ${TITLE_3.fontSize};
    line-height: ${TITLE_3.lineHeight};
    font-weight: ${TITLE_3.fontWeight};
    color: ${colorSet.primary_01};
    margin: 0px;
    padding: 0px;
`

const HeaderTextMedium = styled.span`
    font-size : ${TITLE_3.fontWeight};
    line-height: ${TITLE_3.lineHeight};
    font-weight: ${TITLE_3.fontWeight};
    color : ${colorSet.textStrong};
    margin: 0px;
    padding: 0px;
`

const HeaderContainer = styled.div`
    height:60px;
    width: 100%;
    background-color: white;
    font-family: "Pretendard";
`

const ButtonContainer = styled.button`
    width: fit-content;
    border: none;
    margin: 0px 8px;
    background-color: white;
`

const Image = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
    background-color: none;
`

const Image2 = styled.img`
    width: 18px;
    height: 18px;
    object-fit: contain;
    background-color: none;
`

const TextDiv = styled.div`
    flex : 1;
`