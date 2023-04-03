import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const RedirectNaver = () => {
    const navi = useNavigate();

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
        navi('/');
    }, []);

    return (
        <div>RedirectNaver</div>
    )
}

export default RedirectNaver