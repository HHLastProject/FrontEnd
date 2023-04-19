import { PropsWithChildren } from "react";
import styled from "styled-components";
import { fontType } from "./ui/styles/typo";
import { colorSet } from "./ui/styles/color";

export const TabMenuUl = ({children}: PropsWithChildren) => {
  return(
    <>
      <ul id='tab-menu-ul'>
        {children}
      </ul>
    </>
  );
};

export const TabMenuLi = ({children, id, isChecked}: {children: React.ReactNode, id: number, isChecked?: boolean}) => {
  return(
    <>
      <li id="">
        <input 
          type="radio" 
          id={`tab-menu-li${id}`} 
          name='tab-menu-li'
          defaultChecked={isChecked && true}
          hidden
        />
        <div className='tab-menu-div'>
          <label htmlFor={`tab-menu-li${id}`}>
            {children}
          </label>
        </div>
      </li>
    </>
  );
}

export const HomeTabMenuStyle = styled.header`
  padding: 11px 0 15px 0;
  overflow: hidden;
  ul {
    display: flex;
    flex-direction: row;
    text-align: center;
    li {
      margin-right: 16px;
    }
    div {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  }
  input[type="radio"] + .tab-menu-div {
    color: ${colorSet.textLight};
    ${fontType.title_2}
    .list-count {
      background-color: ${colorSet.bgLight};
      color: ${colorSet.textLight};
    }
  }
  input[type="radio"]:checked + .tab-menu-div {
    color: ${colorSet.textStrong};
    ${fontType.title_2}
    .list-count {
      background: ${colorSet.bgMedium};
      color: ${colorSet.textMedium};
    }
  }
`;