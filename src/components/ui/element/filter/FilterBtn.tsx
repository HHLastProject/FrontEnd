import styled from "styled-components";
import { Body3 } from "../../../FontStyle";
import { colorSet } from "../../styles/color";
import { IconSmallDownArrow, IconXRount16 } from "../icons/IconsStyle";
import { controlVisible } from "../../../../custom/jh/controlHidden";
import { SelectBoxId } from "../../../SelectBox";
import { useContext } from "react";
import { OrderByContext } from "../../../../apis/context";
import BtnResetStyle from "../buttons/BtnReset";

export const OrderbyFilterBtn = ({ children }: { children?: React.ReactNode }) => {
  const {orderBy, setOrderBy} = useContext(OrderByContext);

  return (
    <>
      {
        (orderBy === '태그')
        ?
        <OrderbyFilterBtnStyle
          onClick={() => controlVisible(SelectBoxId.ORDER_BY_SELECT_ID)}
        >
          <div>
            <Body3>{orderBy}</Body3>
            <IconSmallDownArrow />
          </div>
        </OrderbyFilterBtnStyle>
        :
        <>
        <OrderbyFilterBtnStyle>
          <div>
            <BtnResetStyle
              onClick={() => controlVisible(SelectBoxId.ORDER_BY_SELECT_ID)}
            >
              <Body3>{orderBy}</Body3>
            </BtnResetStyle>
            <BtnResetStyle
              // onClick={() => setOrderBy && setOrderBy('태그')}
            >
              <IconXRount16/>
            </BtnResetStyle>
          </div>
        </OrderbyFilterBtnStyle>

        <BtnResetStyle>
          <XBtnStyle onClick={() => setOrderBy && setOrderBy('태그')}/>
        </BtnResetStyle>
        </>
      }
    </>
  )
}

const OrderbyFilterBtnStyle = styled.button<{onClick?: React.MouseEventHandler<HTMLButtonElement>}>`
  background-color: ${colorSet.bgMedium};
  border: none;
  padding: 8px 12px;
  border-radius: 100px;
  flex: none;
  div {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 4px;
  }
`;

const XBtnStyle = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  left: 96px;
  top: 54px;
  background-color: transparent;
`;