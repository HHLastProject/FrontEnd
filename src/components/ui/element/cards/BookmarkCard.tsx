import React, { useContext, useEffect, useState } from 'react'
import { HFlex, VFlex } from '../../../../custom/ym/styleStore'
import styled from 'styled-components';
import { BODY_3, TITLE_3, checkImg, scrapImg } from '../../../../custom/ym/variables';
import { colorSet } from '../../styles/color';
import { BookmarkChildren, ScrapDataSet } from '../../../../custom/ym/types';
import { useNavigate } from 'react-router-dom';
import { imgPath } from '../../../../shared/path';
import { Buttons } from '../buttons/Buttons';
import { ScrapContext, ScrapDispatchesContext } from '../../../../pages/Bookmark';
import { BtnRadius } from '../buttons/BtnRadius';
import useScrapToggle from '../../../../hooks/useScrapToggle';
import { queryClient } from '../../../..';
import { mapQueryKeys } from '../../../../apis/queries';

const BookmarkCard = ({ data, idx }: BookmarkChildren) => {

    const navi = useNavigate();
    const [check, setCheck] = useState<boolean>(false);

    const contextValues = useContext(ScrapContext);
    const contextDispatches = useContext(ScrapDispatchesContext);
    const { mutate } = useScrapToggle();

    const mode = contextValues.editMode;
    const selected = contextValues.selected;
    const setMode = contextDispatches.setEditMode as React.Dispatch<React.SetStateAction<boolean>>;
    const setSelected = contextDispatches.setSelected as React.Dispatch<React.SetStateAction<number[]>>;
    const setScrapList = contextDispatches.setScrapList as React.Dispatch<React.SetStateAction<ScrapDataSet[]>>;

    const divClickHandler = () => {
        navi(`/shop/${data.shopId}`)
    }

    const convertAddress = (text: string) => {
        const stringData = text.replace("경기도 ", "").replace("특별", "").split(" ");
        return stringData[0].replace("시", "") + " " + stringData[1];
    }

    const refreshSelectedHandler = () => {
        selected.find((element) => element === data.shopId)
            ? setSelected(prev => [...prev].filter((element) => element !== data.shopId))
            : setSelected(prev => [...prev, data.shopId]);
    }

    const isIncluded = (value: number) => {
        return selected.find((element) => element === value) ? true : false;
    }

    const toggleScrap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        /* 스크랩을 풀면 아예 없어지는 경우의 코드 */
        mutate(data.shopId);
        setScrapList(prev => {
            return prev.filter((element) => element !== data);
        });
    }

    return (
        <HFlex gap='8px' height={'fit-content'} onClick={mode ? () => { } : divClickHandler}>
            <ThumbnailFrame onClick={refreshSelectedHandler}
            >
                <Thumbnail src={imgPath.shopThumbnailImg + data.thumbnail} alt={data.shopName} />
                {
                    mode
                        ? <CheckBox>
                            <Buttons.Others.IconButton
                                width={24}
                                height={24}
                                fileName={isIncluded(data.shopId) ? checkImg.checked : checkImg.notChecked}
                            /></CheckBox>
                        : <ScrapBox>
                            <Buttons.Others.IconButton
                                width={28}
                                height={28}
                                fileName={data.isScrap ? scrapImg.checked : scrapImg.notChecked}
                                onClick={toggleScrap}
                            /></ScrapBox>
                }
            </ThumbnailFrame>
            <VFlex height='100px' etc='align-items:base-line;'>
                <ShopName>{data.shopName}</ShopName>
                <ShopSummary>{`${convertAddress(data.address)} | ${data.category}`}</ShopSummary>
                <ShopSummary>피드 {data.feedCount}</ShopSummary>
            </VFlex>
        </HFlex>
    )
}

export default React.memo(BookmarkCard);

const ScrapBox = styled.div`
    position: absolute;
    bottom : 4px;
    right: 4px;
    width: fit-content;
    height: fit-content;
`

const CheckBox = styled.div`
    position: absolute;
    top : 4px;
    left: 4px;
    width: fit-content;
    height: fit-content;
`

const ThumbnailFrame = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    flex : none;
`

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ShopName = styled.span`
    font-size: ${TITLE_3.fontSize};
    font-weight: ${TITLE_3.fontWeight};
    line-height: ${TITLE_3.lineHeight};
    color : ${colorSet.textStrong};
`

const ShopSummary = styled.span`
    font-size: ${BODY_3.fontSize};
    font-weight: ${BODY_3.fontWeight};
    line-height: ${BODY_3.lineHeight};
    color:${colorSet.textMedium};
`