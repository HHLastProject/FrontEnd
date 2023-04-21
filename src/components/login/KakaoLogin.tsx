import { KAKAO_AUTH_URL } from '../../custom/ym/variables'
import styled from 'styled-components';


const KakaoLogin = () => {

    return (
        <div>
            <a href={KAKAO_AUTH_URL}>
                <Button alt="카카오 로그인" src={`${process.env.PUBLIC_URL}/loginbuttons/kakao_login_btn.png`} />
            </a>
        </div>
    )
}

export default KakaoLogin;


const Button = styled.img`
    width: 268px;
    object-fit : fill;
`