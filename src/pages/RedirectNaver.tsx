import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RedirectNaver = () => {
    const navi = useNavigate();
    const url: string = process.env.REACT_APP_SERVER as string;

    const usequery = useQuery({
        queryKey: ["getNaverToken"],
        queryFn: async () => {
            naverAccessToken();
            const response = await axios.get(`${url}/api/naver/login`, {
                data: {
                    code: localStorage.getItem('naverAuth')
                }
            });
            console.log(response.headers);
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

    return (
        <div>RedirectNaver</div>
    )
}

export default RedirectNaver