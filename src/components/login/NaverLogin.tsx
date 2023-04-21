import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { NAVER_KEY, NAVER_CALLBACK_URL } from '../../custom/ym/variables'
import axios from 'axios';
import styled from 'styled-components';

interface User {
    email: string,
    nickname: string,
}

const NaverLogin = () => {
    const { naver } = window as any;
    // const naverRef = useRef<RefObject<HTMLDivElement>>();

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
    // const handleNaverLogin = () => {
    //     naverRef.current.children[0].click();
    // }

    useEffect(() => {
        initNaverLogin();
    }, []);

    return (
        <div>
            <div id='naverIdLogin' />
            {/* <NaverIdLogin ref={naverRef}/> */}
            {/* <NaverLoginBtn onClick={handleNaverLogin}> */}
            {/* <NaverIcon/> */}
            {/* <NaverLoginTitle>네이버로 로그인</NaverLoginTitle> */}
            {/* </NaverLoginBtn> */}
            {/* <img src={`${process.env.PUBLIC_URL}/loginbuttons/naver_login_btn.png`} alt="" /> */}
            {/* </div> */}
        </div>
    )
}

export default NaverLogin;

const NaverIdLogin = styled.div`
	display: none;
`

const NaverLoginBtn = styled.button`
	display: flex;
	align-items: center;
	width: 360px;
	height: 56px;
	background-color: #03c75a;
	border-radius: 6px;
`
const NaverIcon = styled.div`
	width: 268px;
	height: 43px;
	background: ${`url('${process.env.PUBLIC_URL}/loginbuttons/naver_login_btn.png') no-repeat center`};
`

const NaverLoginTitle = styled.span`
	margin-left: 90px;
	color: ${({ theme }) => theme.White};
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;
`