import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginKeys } from '../apis/queries';
import { KAKAO_CALLBACK_URL_LOCAL, KAKAO_CALLBACK_URL_S3 } from '../custom/ym/variables';
import Loading from '../components/loading/Loading';

type Payload = {
    code: string
}

const RedirectKakao = () => {

    const navi = useNavigate();

    const { mutate } = useMutation({
        mutationKey: loginKeys.POST_KAKAO_TOKEN,
        mutationFn: async (payload: Payload) => {
            kakaoAccessToken();

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login/kakao`, payload);
            localStorage.removeItem("kakaoAuth");
            localStorage.setItem("access_token", response.headers.authorization);
            // console.log(response.headers.authorization);
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
            /* S3 배포용 */
            redirectURL: KAKAO_CALLBACK_URL_S3,
            /* 로컬 스토리지용 */
            // redirectURL: KAKAO_CALLBACK_URL_LOCAL,
        };
        mutate(payload);
    }, []);

    return (
        <>
            <Loading />
            카카오 로그인 중입니다.
        </>
    )
}

export default RedirectKakao