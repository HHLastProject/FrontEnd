import React from 'react'
import { VFlexCenter } from '../../custom/ym/styleStore'
import { BODY_4 } from '../../custom/ym/variables';
import { colorSet } from '../ui/styles/color';
import styled from 'styled-components';
import { iconImgPath } from '../../shared/path';

const NoExistFolders = () => {
    return (
        <VFlexCenter gap='16px' etc="margin-top:160px">
            <ImageFrame>
                <Image src={iconImgPath.bookmark.noFolder} alt="no folders" />
            </ImageFrame>
            <TextDiv>
                폴더목록이 비어있어요.<br />
                폴더를 추가해 보세요.
            </TextDiv>
        </VFlexCenter>
    )
}

export default NoExistFolders;

const TextDiv = styled.div`
    font-size: ${BODY_4.fontSize};
    line-height: ${BODY_4.lineHeight};
    font-weight: ${BODY_4.fontWeight};
    color : ${colorSet.textMedium};
    text-align: center;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ImageFrame = styled.div`
    width: 100px;
    height: 100px;
`