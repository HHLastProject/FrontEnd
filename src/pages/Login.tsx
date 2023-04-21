import styled from 'styled-components';
import KakaoLogin from '../components/login/KakaoLogin';
import NaverLogin from '../components/login/NaverLogin';
import { PublicContainer, VFlexCenter } from '../custom/ym/styleStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navi = useNavigate();

    const adminLoginHandler = () => {
        navi('/admin/login');
    }
    return (
        <PublicContainer>
            <VFlexCenter height="100vh" gap='132px'>
                <div style={{ width: '100%', height: 'fit-content' }}>
                    <VFlexCenter gap='12px'>
                        <LogoText>순간을 기록하는 여정</LogoText>
                        <LogoImage src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
                    </VFlexCenter>
                </div>
                <div>
                    <KakaoLogin />
                    <NaverLogin />
                    <AdminButton onClick={adminLoginHandler}>관리자로 로그인하기</AdminButton>
                </div>
            </VFlexCenter>
        </PublicContainer>
    )
}

export default Login;

const LogoImage = styled.img`
    width: fit-content;
    height: fit-content;
`

const LogoFrame = styled.div`
    width: fit-content;
    height: fit-content;
`

const LogoText = styled.span`
    font-family: "Pretendard";
    font-size : 16px;
    line-height: 19px;
    color : black;
    font-weight : 400;
`

const AdminButton = styled.button`
    cursor : pointer;
    font-size : 16px;
    color : #717176;
    background-color : transparent;
    border : none;
    height : 58px;
    width : 268px;
`