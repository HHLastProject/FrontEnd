import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

type Payload = {
    code: string
}

const RedirectKakao = () => {

    const navi = useNavigate();

    const url: string = process.env.REACT_APP_SERVER as string;

    const { mutate } = useMutation({
        mutationKey: ["getKakaoToken"],
        mutationFn: async (payload: Payload) => {
            kakaoAccessToken();

            const response = await axios.post(`${url}/api/kakao/login2`, payload);
            localStorage.removeItem("kakaoAuth");
            localStorage.setItem("access_token", response.data.access_token);

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
        <div>RedirectKakao</div>
    )
}

export default RedirectKakao