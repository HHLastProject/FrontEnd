import React, { useState } from 'react'
import { useEffect } from 'react'
import { NAVER_KEY, CALLBACK_URL } from '../../custom/ym/variables'

interface User {
    email: string,
    nickname: string,
}

const NaverLogin = () => {
    const { naver } = window as any;

    const NAVER_CLIENT_ID: string = NAVER_KEY;
    const NAVER_CALLBACK_URL: string = CALLBACK_URL;
    console.log(NAVER_CLIENT_ID);
    console.log(NAVER_CALLBACK_URL);
    const [userInform, setUserInform] = useState<User>({
        email: '',
        nickname: '',
    });

    const initNaverLogin = (): void => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            // 팝업창으로 로그인을 진행할 것인지?           
            isPopup: false,
            // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
            loginButton: { color: 'green', type: 3, height: 58 },
            callbackHandle: true,
        })
        naverLogin.init();
    }

    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken();
    }

    const getToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0];
        console.log(token);
        localStorage.setItem('access_token', token);
    }

    useEffect(() => {
        initNaverLogin();
        userAccessToken();
    }, []);

    return (
        <div>
            <div id='naverIdLogin' />
        </div>
    )
}

export default NaverLogin