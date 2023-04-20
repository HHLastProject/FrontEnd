import styled from 'styled-components';
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import useNavigateHandler from '../../custom/jh/useNavigateHandler';
import { LoginCheck } from '../Authentication';
import { Title5 } from '../FontStyle';
import { Link } from 'react-router-dom';

const ListHeader = ({range}: {range: number}) => {
  const {loginClickHandler, mapClickHandler, searchClickHandler} = useNavigateHandler();

  return (
    <HeaderContainer>
      <HFlex etc="padding: 0px 5px;" width='100%'>
        <ButtonContainer>
          <Image src={`${process.env.PUBLIC_URL}/icon/back_24.png`} alt="" />
        </ButtonContainer>
        <VFlex etc="flex:1; height:fit-content">
          <div>
            <HeaderTextSmall>내 위치에서</HeaderTextSmall>
          </div>
          <HFlex gap="10px">
            <HeaderTextMedium>{range} m</HeaderTextMedium>
            <Image2 src={`${process.env.PUBLIC_URL}/down.png`} alt="" />
          </HFlex>
        </VFlex>
        <RightContainer>
          {/* <LoginCheck> */}
            <Title5>
              <Link to={'/login'}>로그인 하기</Link>
            </Title5>
          {/* </LoginCheck> */}
          <div
            onClick={searchClickHandler}
          >
            <ButtonContainer>
              <Image src={`${process.env.PUBLIC_URL}/icon/search_24.png`} alt="" />
            </ButtonContainer>
          </div>
        </RightContainer>
      </HFlex>
    </HeaderContainer>
  )
}

export default ListHeader;

const HeaderTextSmall = styled.span`
  font-size: 12px;
  padding : 2px 0px;
  color : gray;
`
const HeaderTextMedium = styled.span`
  font-size : 18px;
  padding : 3px 0px;
  font-weight: bold;
`

const HeaderContainer = styled.div`
  height:60px;
  width: 100%;
  background-color: white;
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
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;