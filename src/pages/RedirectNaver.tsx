import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginKeys } from '../apis/queries';

type Payload = {
    code: string
}

const RedirectNaver = () => {
    const navi = useNavigate();
    const url: string = process.env.REACT_APP_SERVER_URL as string;

    const { mutate } = useMutation({
        mutationKey: loginKeys.POST_NAVER_TOKEN,
        mutationFn: async (payload: Payload) => {
            const response = await axios.post(`${url}/api/login/naver`, payload);
            localStorage.removeItem("naverAuth")
            // localStorage.setItem("access_token", response.data.access_token);
            console.log(response);
            navi('/');
        }
    });

    const naverAccessToken = async () => {
        window.location.href.includes('access_token') && getNaverToken();
    }

    const getNaverToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0];
        console.log(token);
        localStorage.setItem('naverAuth', token);
    }

    useEffect(() => {
        naverAccessToken();
        const payload = {
            code: localStorage.getItem("naverAuth") as string
        }
        mutate(payload);
    }, []);

    return (
        <div>네이버 로그인 중입니다.</div>
    )
}

export default RedirectNaver