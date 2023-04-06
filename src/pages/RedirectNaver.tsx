import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Payload = {
    code: string
}

const RedirectNaver = () => {
    const navi = useNavigate();
    const url: string = process.env.REACT_APP_SERVER as string;

    const { mutate } = useMutation({
        mutationKey: ["postNaverToken"],
        mutationFn: async (payload: Payload) => {
            const response = await axios.post(`${url}/api/naver/login`, payload);
            localStorage.removeItem("naverAuth")
            localStorage.setItem("access_token", response.data.access_token);
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
        const payload: Payload = {
            code: localStorage.getItem("naverAuth") as string
        }
        mutate(payload);
    }, []);

    return (
        <div>RedirectNaver</div>
    )
}

export default RedirectNaver