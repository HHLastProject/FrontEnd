import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navi = useNavigate();

    const loginClickHandler = () => {
        navi('/login');
    }
    const mapClickHandler = () => {
        navi('/map');
    }

    return (
        <div>
            <button onClick={loginClickHandler}>Login 화면</button>
            <button onClick={mapClickHandler}>맵 화면</button>
        </div>
    )
}

export default Home;

