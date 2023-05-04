import styled from "styled-components";
import { Body3 } from "../../../FontStyle";
import { colorSet } from "../../styles/color";
import { IconSmallDownArrow, IconXRount16 } from "../icons/IconsStyle";
import { controlVisible } from "../../../../custom/jh/controlHidden";
import { SelectBoxId } from "../../../SelectBox";
import { useContext } from "react";
import { OrderByContext } from "../../../../apis/context";
import BtnResetStyle from "../buttons/BtnReset";
import { SelectData } from "../../../../shared/select";

export const OrderbyFilterBtn = ({ children }: { children?: React.ReactNode }) => {
  const {orderBy, setOrderBy} = useContext(OrderByContext);

  return (
    <OrderbyFilterBtnWrap>
      {
        (!SelectData.TAG_SELECT.includes(orderBy))
        ?
        // 화살표 버튼일때
        <OrderbyFilterBtnStyle>
          <BtnResetStyle
            onClick={() => controlVisible(SelectBoxId.ORDER_BY_SELECT_ID)}
          >
          <FilterDivStyle style={{gap: '4px', padding: '8px 12px'}}>
            <Body3>{orderBy}</Body3>
            <IconSmallDownArrow />
          </FilterDivStyle>
          </BtnResetStyle>
        </OrderbyFilterBtnStyle>
        :
        // x버튼일때
        <>
        <OrderbyFilterBtnStyle>
          <FilterDivStyle>
            <BtnResetStyle
              onClick={() => controlVisible(SelectBoxId.ORDER_BY_SELECT_ID)}
            >
              <Body3 style={{marginLeft: '12px'}}>{orderBy}</Body3>
            </BtnResetStyle>
            <XBtnStyle onClick={() => setOrderBy && setOrderBy('태그')}>
              <BtnResetStyle>
                <IconXRount16/>
              </BtnResetStyle>
            </XBtnStyle>
          </FilterDivStyle>
        </OrderbyFilterBtnStyle>
        </>
      }
    </OrderbyFilterBtnWrap>
  )
}

const OrderbyFilterBtnWrap = styled.div`
  flex: none; 
  border-radius: 100px;
  overflow: hidden;
`;

const OrderbyFilterBtnStyle = styled.div`
  border: none;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorSet.bgMedium};
`;

const FilterDivStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const XBtnStyle = styled.div`
  display: flex;
  padding: 10px 12px;
`;