import styled from 'styled-components';
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import useNavigateHandler from '../../custom/jh/useNavigateHandler';
import { Body1, Title5 } from '../FontStyle';
import { Link } from 'react-router-dom';
import { path } from '../../shared/path';
import { ReactNode, useState } from 'react';
import { colorSet } from '../ui/styles/color';
import { controlVisible } from '../../custom/jh/controlHidden';
import { SelectBoxId } from '../SelectBox';
import BtnResetStyle from '../ui/element/buttons/BtnReset';
import { IconSize16, IconSize24 } from '../ui/element/icons/IconSize';
import { getToken } from '../../apis/getToken';

//close == true : 뒤로가기 버튼이 x로 바뀜
//scrap == true : 스크랩 버튼
//name : 헤더에 들어갈 이름
const ListHeader = ({name, range, close, list, feedForm, children, scrap}: {name?: string, range?: number, close?: boolean, list?: boolean, feedForm?: true, children?: ReactNode, scrap?: boolean}) => {
  const {backClickHandler} = useNavigateHandler();
  const backIconSrc = close ? `${process.env.PUBLIC_URL}/icon/x_24.png` : `${process.env.PUBLIC_URL}/icon/back_24.png`;
  const token = getToken();
  const [isLogin, setIsLogin] = useState(token ? true : false);

  // const onClickLogout = () => {
  //   const result = window.confirm('로그아웃 하시겠습니까?');
  //   if(result) {
  //     deleteToken();
  //     alert('로그아웃 되었습니다.');
  //     setIsLogin(false);
  //   }
  // }

  return (
    <HeaderContainer
      id='header'
    >
      <HFlex width='100%'>
        <BothSideDiv>
          {list
            ?
            <></>
            :
            <BtnResetStyle
              onClick={backClickHandler}
            >
              <IconSize24>
                <img src={backIconSrc} alt="뒤로가기" />
              </IconSize24>
            </BtnResetStyle>
          }
          {range && 
            <>
              {/* 거리 나타내기 */}
              <VFlex etc="height:fit-content">
                <div>
                  <HeaderTextSmall>내 위치에서</HeaderTextSmall>
                </div>
                <BtnResetStyle
                  onClick={() => {controlVisible(SelectBoxId.RANGE_SELECT_ID)}}>
                  <HFlex gap="5px">
                    <HeaderTextMedium>{(range < 1000 ? `${range}m` : `${range/1000}km`)}</HeaderTextMedium>
                    <IconSize16>
                      <img src={`${process.env.PUBLIC_URL}/icon/chevron_down_16.png`} alt="거리 선택하기" />
                    </IconSize16>
                  </HFlex>
                </BtnResetStyle>
              </VFlex>
            </>
          }
        </BothSideDiv>
        {name && 
          <div style={{width: '100%'}}>
            <Body1>{name}</Body1>
          </div>
        }

        <div style={{flex: '1'}}/>

        {/* 오른쪽 */}
        <RightContainer>
          {range &&
          <>
            {/* 로그인 로그아웃 */}
            {isLogin
              ?
              <></>
              // <BtnResetStyle onClick={onClickLogout}>
              //   <Title5>로그아웃</Title5>
              // </BtnResetStyle>
              :
              <Link to={'/login'}>
                <Title5>로그인하기</Title5>
              </Link>
            }

            {/* 검색하기 */}
            <Link
              to={`${path.search}`}
              state={{link: null}}
            >
              <BothSideDiv>
                <IconSize24>
                  <img src={`${process.env.PUBLIC_URL}/icon/search_24.png`} alt="검색" />
                </IconSize24>
              </BothSideDiv>
            </Link>
          </>
        }

        {/* 스크랩, 또는 피드폼일때 들어올 칠드런 위치 */}
        {(feedForm || scrap) && 
          <>
          <BothSideDiv>
            {children}
          </BothSideDiv>
          </>
        }
        </RightContainer>
      </HFlex>
    </HeaderContainer>
  )
}

export default ListHeader;

export const HeaderContainer = styled.header`
  height: 60px;
  width: 100%;
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

const BothSideDiv = styled.div`
  padding: 0px 20px;
`

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;