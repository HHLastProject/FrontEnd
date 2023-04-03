import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const RedirectKakao = () => {

    const navi = useNavigate();

    const kakaoAccessToken = () => {
        window.location.href.includes('code') && getKakaoToken();
    }

    const getKakaoToken = () => {
        const authCode = window.location.href.split('=')[1];
        localStorage.setItem('kakao_auth_code', authCode);
    }

    useEffect(() => {
        kakaoAccessToken();
        navi('/');
    }, []);

    return (
        <div>RedirectKakao</div>
    )
}

export default RedirectKakao