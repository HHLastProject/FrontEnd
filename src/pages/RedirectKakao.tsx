import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginKeys } from '../apis/queries';

type Payload = {
    code: string
}

const RedirectKakao = () => {

    const navi = useNavigate();

    const url: string = process.env.REACT_APP_SERVER as string;

    const { mutate } = useMutation({
        mutationKey: loginKeys.POST_KAKAO_TOKEN,
        mutationFn: async (payload: Payload) => {
            kakaoAccessToken();

            const response = await axios.post(`${process.env.SERVER_URL}/api/login/kakao`, payload);
            // localStorage.removeItem("kakaoAuth");
            // localStorage.setItem("access_token", response.data.access_token);
            console.log(response);
            navi('/');
        }
    });

    const kakaoAccessToken = () => {
        window.location.href.includes('code') && getKakaoToken();
    }

    const getKakaoToken = () => {
        const authCode = window.location.href.split('=')[1];
        localStorage.setItem('kakaoAuth', authCode);
    }

    useEffect(() => {
        kakaoAccessToken();
        const payload = {
            code: localStorage.getItem('kakaoAuth') as string,
        };
        mutate(payload);
    }, []);

    return (
        <div>카카오 로그인 중입니다.</div>
    )
}

export default RedirectKakao