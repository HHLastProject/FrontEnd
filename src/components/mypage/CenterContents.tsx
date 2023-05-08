import React, { useContext, useEffect, useState } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore';
import styled from 'styled-components';
import { BODY_1 } from '../../custom/ym/variables';
import { MypageContext } from '../../pages/Mypage';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../..';
import { mypageKeys } from '../../apis/queries';

const CenterContents = () => {

    const navi = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const logoutButtonHandler = () => {
        localStorage.removeItem("access_token");
        queryClient.removeQueries(mypageKeys.GET_MYPAGE);
        navi('/');
        // window.location.reload();
    }
    useEffect(() => {
        localStorage.getItem("access_token")
            ? setIsLogin(true)
            : setIsLogin(false);
    }, [isLogin]);

    return (
        <VFlex height='fit-content'>
            <EachItem>
                <HFlex>
                    <ButtonContainer onClick={() => alert("미구현 기능입니다.")}><Text>이용약관</Text></ButtonContainer>
                </HFlex>
            </EachItem>
            {isLogin
                ? <>
                    <EachItem>
                        <HFlex>
                            <ButtonContainer onClick={logoutButtonHandler}><Text>로그아웃</Text></ButtonContainer>
                        </HFlex>
                    </EachItem>
                    <EachItem>
                        <HFlex>
                            <ButtonContainer onClick={() => alert("미구현 기능입니다.")}><Text>탈퇴하기</Text></ButtonContainer>
                        </HFlex>
                    </EachItem></>
                : null}
        </VFlex>
    )
}

export default CenterContents;

const EachItem = styled.div`
    width: 100%;
    height: 62px;
    background-color: white;
    /* padding : 20px 0px; */
`
const ButtonContainer = styled.button`
    width: fit-content;
    height: fit-content;
    padding: 0px;
    border : none;
    background-color: transparent;
`
const Text = styled.span`
    
    font-family: "Pretendard";
    padding: 0;
    font-size: ${BODY_1.fontSize};
    line-height: ${BODY_1.lineHeight};
    font-weight: ${BODY_1.fontWeight};
    color: ${BODY_1.color};
`