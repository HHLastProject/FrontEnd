import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const RedirectKakao = () => {

    const navi = useNavigate();

    const url: string = process.env.REACT_APP_SERVER as string;

    const usequery = useQuery({
        queryKey: ["getKaKaoToken"],
        queryFn: async () => {
            kakaoAccessToken();
            const response = await axios.get(`${url}/api/kakao/login`, {
                data: {
                    code: localStorage.getItem('kakaoAuth')
                }
            });
            console.log(response.headers);
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

    return (
        <div>RedirectKakao</div>
    )
}

export default RedirectKakao