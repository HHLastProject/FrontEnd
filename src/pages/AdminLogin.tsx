import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { loginKeys } from '../apis/queries';
import { HFlex, VFlex, VFlexCenter } from '../custom/ym/styleStore';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const url: string = process.env.REACT_APP_SERVER_URL as string;
    const [id, setId] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const navi = useNavigate();

    const { mutate } = useMutation({
        mutationKey: loginKeys.POST_ADMIN_LOGIN,
        mutationFn: async (payload: object) => {
            const response = await axios.post(`${url}/api/admin/login`, payload);
            const token = response.headers.authorization.split(' ')[1];
            localStorage.setItem('admin_token', token);
            navi('/');
        }
    });

    const loginButtonHandler = () => {
        const payload = {
            adminEmail: id,
            adminPassword: pw,
        };
        mutate(payload);
    }

    return (
        <div style={{ backgroundColor: 'white', height: '100vh' }}>
            <VFlexCenter gap="20px">
                <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
                <input placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
                <HFlex width='fit-content' height='fit-content' gap='5px'>
                    <button onClick={loginButtonHandler}>로그인</button>
                    <button onClick={() => navi(-1)}>뒤로가기</button>
                </HFlex>
            </VFlexCenter>
        </div>
    )
}

export default AdminLogin;