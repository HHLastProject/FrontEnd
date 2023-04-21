import React, { useState } from 'react'
import { useEffect } from 'react'
import { NAVER_KEY, NAVER_CALLBACK_URL } from '../../custom/ym/variables'
import axios from 'axios';

interface User {
    email: string,
    nickname: string,
}

const NaverLogin = () => {
    const { naver } = window as any;

    const CLIENT_ID: string = NAVER_KEY;
    const CALLBACK_URL: string = NAVER_CALLBACK_URL;
    // console.log(CLIENT_ID);
    // console.log(CALLBACK_URL);
    const [userInform, setUserInform] = useState<User>({
        email: '',
        nickname: '',
    });

    const initNaverLogin = (): void => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: CLIENT_ID,
            callbackUrl: CALLBACK_URL,
            // 팝업창으로 로그인을 진행할 것인지?           
            isPopup: false,
            // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
            loginButton: { color: 'green', type: 3, height: 58 },
            callbackHandle: true,
        })
        naverLogin.init();
        naverLogin.logout();
    }

    useEffect(() => {
        initNaverLogin();
    }, []);

    return (
        <div>
            <div id='naverIdLogin' />
            {/* <img src={`${process.env.PUBLIC_URL}/loginbuttons/naver_login_btn.png`} alt="" /> */}
            {/* </div> */}
        </div>
    )
}

export default NaverLogin