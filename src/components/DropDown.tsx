import React from 'react'
import styled from 'styled-components';

export const DropDown = () => {
  const dropdown = () => {}
  const showMenu = (value: string) => {}

  return (
    <>
      <div>
        <span>restaurant</span>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          <span className="dropbtn_icon">more_horiz</span>
          <span className="dropbtn_content">Select a menu...</span>
          <OnClickSpan className="dropbtn_click" onClick={dropdown}>arrow_drop_down</OnClickSpan>
        </button>
        <div className="dropdown-content">
          <div className="drop_menu" onClick={() => {showMenu("거리순")}}>거리순</div>
          <div className="drop_menu" onClick={() => {showMenu("인기순")}}>인기순</div>
        </div>
      </div>
    </>
  )
};

type TOnClick = {
  onClick : React.MouseEventHandler<HTMLDivElement> | undefined;
};

const OnClickSpan = styled.span<TOnClick>`
  
`;