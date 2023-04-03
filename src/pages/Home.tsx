import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navi = useNavigate();

    const loginClickHandler = () => {
        navi('/login');
    }

    const naverAccessToken = () => {
        window.location.href.includes('access_token') && getNaverToken();
    }

    const getNaverToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0];
        console.log(token);
        localStorage.setItem('access_token', token);
    }

    useEffect(() => {
        naverAccessToken();
    }, []);

    return (
        <div>
            <button onClick={loginClickHandler}>Login 화면</button>
        </div>
    )
}

export default Home;

