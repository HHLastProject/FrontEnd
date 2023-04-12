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
            <VFlexCenter width='100%' height='100vh' gap='20px'>
                <div style={{ width: '268px', height: '268px' }}>
                    <VFlexCenter etc='border: 1px solid black'>
                        <Logo>로고</Logo>
                    </VFlexCenter>
                </div>
                <KakaoLogin />
                <NaverLogin />
                <AdminButton onClick={adminLoginHandler}>관리자로 로그인하기</AdminButton>
            </VFlexCenter>
        </PublicContainer>
    )
}

export default Login;


const Logo = styled.span`
    font-size : 24px;
    background-color : black;
    color : white;
    font-weight : bold;
    padding : 15px 20px;
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