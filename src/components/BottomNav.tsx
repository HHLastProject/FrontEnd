import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const BottomNav = () => {
    const navi = useNavigate();
    // cosnt [selected, setSelected] = useState<string>();
    const mapClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

        console.log(e.currentTarget.name);
        navi('/' + e.currentTarget.name);
    }

    return (
        <NavContainer>
            <NavButton name='' onClick={mapClickHandler}>홈</NavButton>
            <NavButton name='map' onClick={mapClickHandler}>지도</NavButton>
            <NavButton name='mypage' onClick={mapClickHandler}>마이페이지</NavButton>
        </NavContainer>
    )
}

export default BottomNav

const NavButton = styled.button`
    flex: 1;
    height:100%;
    width: 100%;
`

const NavContainer = styled.nav`
    display: flex;
    justify-content: center;
    height: 56px;
    width: 100%;
    background-color: white;
    gap : 8px;
    z-index: 50;
`