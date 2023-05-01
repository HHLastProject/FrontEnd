import styled from 'styled-components';
import { VFlexCenter } from '../../custom/ym/styleStore';
import { BODY_4 } from '../../custom/ym/variables';
import { colorSet } from '../ui/styles/color';
import { Buttons } from '../ui/element/buttons/Buttons';
import { useNavigate } from 'react-router-dom';

const NoMyFeeds = () => {

    const navi = useNavigate();

    const writeClickHandler = () => {
        navi('/shop/0/feedform');
    }

    return (
        <Container>
            <VFlexCenter gap="16px">
                <ImageFrame>
                    <Image src={`${process.env.PUBLIC_URL}/images/mypage/no_feed.png`} alt="피드가 없습니다." />
                </ImageFrame>
                <TextDiv>
                    작성된 피드가 없어요<br />
                    새로운 순간을 공유해 보세요.
                </TextDiv>
                <Buttons.Medium.Default onClick={writeClickHandler}>피드 작성하기</Buttons.Medium.Default>
            </VFlexCenter>
        </Container>
    )
}

export default NoMyFeeds;

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
const Container = styled.div`
    position: relative;
    width: 100%;
    height: fit-content;
    top: 48px;
    padding-bottom: 60px;
`