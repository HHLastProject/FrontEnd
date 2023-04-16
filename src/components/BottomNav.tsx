import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Buttons } from './ui/element/buttons/Buttons';
import { NavButtonList } from '../custom/ym/types';
import uuid from 'react-uuid';

const BottomNav = () => {
    const [active, setActive] = useState<string>("home");
    const navi = useNavigate();
    const mapClickHandler = (e: React.MouseEvent<HTMLButtonElement>, page: string) => {
        setActive((prev) => page);
        navi(`/${(page === "home" ? "" : page)}`);
    }
    const stateChecker = (checker: string) => {
        // console.log('액티브', active);
        // console.log('체커', checker);
        return checker === active ? true : false;
    }

    return (
        <NavContainer>
            {NavButtonList.map((element) => {
                return <Buttons.Others.NavButton
                    key={uuid()}
                    name={element}
                    onClick={(e) => mapClickHandler(e, element)}
                    isActive={stateChecker(element)}
                />;
            })}
        </NavContainer>
    )
}

export default BottomNav

const NavContainer = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    /* gap: 8px; */
    box-sizing: border-box;
    height: 56px;
    width: 100%;
    padding: 0px 8px;
    background-color: white;
    gap : 8px;
    z-index: 50;
`