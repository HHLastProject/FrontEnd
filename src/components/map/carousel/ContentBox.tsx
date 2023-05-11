import styled from 'styled-components';
import { openDetail } from '../../../custom/ym/carrouselFuncs';
import { ShopData } from '../../../custom/ym/variables';
import { useNavigate } from 'react-router-dom';
import { VFlex } from '../../../custom/ym/styleStore';
import PageNotice from './PageNotice';
import CarouselBoxContents from './CarouselBoxContents';

const ContentBox = ({ item, arr, index }: { item: ShopData, arr: ShopData[], index: number }) => {
    const navi = useNavigate();

    return (
        <Box onClick={(e) => openDetail(e, item.shopId, navi)}>
            <VFlex>
                <PageNotice arr={arr} index={index} />
                <CarouselBoxContents item={item} />
            </VFlex>
        </Box>
    )
}

export default ContentBox;

const Box = styled.div`
    width: 300px;
    height: 142px;
    padding: 16px;
    border: none;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15), 0px 2px 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background-color: white;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    &:hover{
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5), 0px 2px 6px 2px rgba(0, 0, 0, 0.5);
    }
`;

