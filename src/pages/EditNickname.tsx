import React, { useState } from 'react'
import styled from 'styled-components';
import { Headers } from '../components/ui/element/headers/Headers';
import { useNavigate } from 'react-router-dom';
import { VFlex, VFlexCenter } from '../custom/ym/styleStore';
import { useMutation } from '@tanstack/react-query';
import { mypageKeys } from '../apis/queries';
import { api_token } from '../shared/api';
import { apiPath } from '../shared/path';
import { queryClient } from '..';
import { Inputs } from '../components/ui/element/input/Inputs';

const EditNickname = () => {

    const navi = useNavigate();
    const [newNickname, setNewNickname] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(true);

    const { mutate } = useMutation({
        mutationKey: mypageKeys.PATCH_NICKNAME,
        mutationFn: async (payload: object) => {
            const res = await api_token.patch(apiPath.editNickname, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(mypageKeys.GET_MYPAGE);
        }
    })

    const backClickHandler = () => {
        navi(-1);
    }
    const FinishClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.setItem("nickname", newNickname);
        const payload = { nickname: newNickname }
        mutate(payload);
        navi(-1);
    }
    return (
        <EditContainer>
            <VFlexCenter gap='60px' etc='padding:0px'>
                <Headers.BackAndFinish
                    BackOnClick={backClickHandler}
                    RightOnClick={FinishClickHandler}
                    state={disable}
                >완료</Headers.BackAndFinish>
                <Inputs.TextRename value={newNickname} dispatch={setNewNickname} disableDispatch={setDisable} />
            </VFlexCenter>
        </EditContainer>
    )
}

export default EditNickname;

const EditContainer = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 100%;
    background-color: white;
`