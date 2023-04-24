import styled from 'styled-components';
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import useNavigateHandler from '../../custom/jh/useNavigateHandler';
import { LoginCheck } from '../Authentication';
import { Title5 } from '../FontStyle';
import { Link } from 'react-router-dom';
import { path } from '../../shared/path';
import { Title4 } from '../../pages/FeedForm';
import { ReactNode } from 'react';

//close === true : 뒤로가기 버튼이 x로 바뀜
const ListHeader = ({range, close, feedForm, children}: {range?: number, close?: boolean, feedForm?: true, children?: ReactNode}) => {
  const {backClickHandler} = useNavigateHandler();
  const backIconSrc = close ? `${process.env.PUBLIC_URL}/icon/x_24.png` : `${process.env.PUBLIC_URL}/icon/back_24.png`;

  return (
    <HeaderContainer>
      <HFlex etc="padding: 0px 5px;" width='100%'>
        <div
          onClick={backClickHandler}
        >
          <ButtonContainer>
            <Image src={backIconSrc} alt="" />
          </ButtonContainer>
        </div>
        {range && 
          <>
            <VFlex etc="height:fit-content">
              <div>
                <HeaderTextSmall>내 위치에서</HeaderTextSmall>
              </div>
              <HFlex gap="5px">
                <HeaderTextMedium>{range}m</HeaderTextMedium>
                <Image2 src={`${process.env.PUBLIC_URL}/icon/chevron_down_16.png`} alt="" />
              </HFlex>
            </VFlex>
          </>
        }
        <RightContainer>
          {range &&
            <>
              <LoginCheck>
                <Title5>
                  <Link to={'/login'}>로그인 하기</Link>
                </Title5>
              </LoginCheck>

              {/* 검색하기 */}
              <Link
                to={`${path.search}`}
                state={{toShopDetail: true}}
              >
                <ButtonContainer>
                  <Image src={`${process.env.PUBLIC_URL}/icon/search_24.png`} alt="" />
                </ButtonContainer>
              </Link>
            </>
          }
          {feedForm && 
            <>
              {children}
            </>
          }
        </RightContainer>
      </HFlex>
    </HeaderContainer>
  )
}

export default ListHeader;

const HeaderTextSmall = styled.span`
  white-space: nowrap;
  font-size: 12px;
  padding : 2px 0px;
  color : gray;
`
const HeaderTextMedium = styled.span`
  font-size : 18px;
  padding : 3px 0px;
  font-weight: bold;
`

export const HeaderContainer = styled.div`
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
  width: 16px;
  height: 16px;
  object-fit: contain;
  background-color: none;
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
`;