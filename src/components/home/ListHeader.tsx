import styled from 'styled-components';
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import useNavigateHandler from '../../custom/jh/useNavigateHandler';
import { LoginCheck } from '../Authentication';
import { Body1, Title5 } from '../FontStyle';
import { Link } from 'react-router-dom';
import { path } from '../../shared/path';
import { ReactNode } from 'react';
import { colorSet } from '../ui/styles/color';
import { controlVisible } from '../../custom/jh/controlHidden';
import { SelectBoxId } from '../SelectBox';

//close == true : 뒤로가기 버튼이 x로 바뀜
//scrap == true : 스크랩 버튼
const ListHeader = ({name, range, close, feedForm, children, scrap}: {name?: string, range?: number, close?: boolean, feedForm?: true, children?: ReactNode, scrap?: boolean}) => {
  const {backClickHandler} = useNavigateHandler();
  const backIconSrc = close ? `${process.env.PUBLIC_URL}/icon/x_24.png` : `${process.env.PUBLIC_URL}/icon/back_24.png`;

  return (
    <HeaderContainer>
      <HFlex width='100%'>
        <div
          onClick={backClickHandler}
        >
          <ButtonContainer>
            <Image src={backIconSrc} alt="" />
          </ButtonContainer>
        </div>
        {name && <div style={{width: '100%'}}><Body1>{name}</Body1></div>}
        {range && 
          <>
            {/* 거리 나타내기 */}
            <VFlex etc="height:fit-content">
              <div>
                <HeaderTextSmall>내 위치에서</HeaderTextSmall>
              </div>
              <HFlex 
                gap="5px" 
                etc={`cursor: pointer`}
                onClick={() => {controlVisible(SelectBoxId.RANGE_SELECT_ID)}}
              >
                <HeaderTextMedium>{(range < 1000 ? `${range}m` : `${range/1000}km`)}</HeaderTextMedium>
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
                state={{link: null}}
              >
                <ButtonContainer>
                  <Image src={`${process.env.PUBLIC_URL}/icon/search_24.png`} alt="" />
                </ButtonContainer>
              </Link>
            </>
          }
          {(feedForm || scrap) && 
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

export const HeaderContainer = styled.div`
  height: 60px;
  width: 100%;
  padding: 0 5px;
  background-color: white;
`

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
  color: ${colorSet.primary_02};
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