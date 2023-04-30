import styled from "styled-components";
import { Body3 } from "../../../FontStyle";
import { colorSet } from "../../styles/color";
import { IconSmallDownArrow } from "../icons/IconsStyle";
import { HiddenContext } from "../../../../apis/context";
import { useContext } from "react";

export const OrderbyFilterBtn = ({ children }: { children: React.ReactNode }) => {
  //선택창 보이기
  const { setIsSelectHidden } = useContext(HiddenContext);

  return (
    <>
      {setIsSelectHidden &&
        <OrderbyFilterBtnStyle
          onClick={() => setIsSelectHidden(prev => !prev)}
        >
          <div>
            <Body3>{children}</Body3>
            <IconSmallDownArrow />
          </div>
        </OrderbyFilterBtnStyle>
      }
    </>
  )
}

const OrderbyFilterBtnStyle = styled.button<{onClick: any}>`
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