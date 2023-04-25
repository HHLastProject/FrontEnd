import React from 'react'
import styled from 'styled-components';
import { Headers } from '../components/ui/element/headers/Headers';
import { useNavigate } from 'react-router-dom';
import { VFlex, VFlexCenter } from '../custom/ym/styleStore';

const EditNickname = () => {

    const navi = useNavigate();

    const backClickHandler = () => {
        navi(-1);
    }
    const FinishClickHandler = () => {
        alert("닉네임수정 mutate 들어가야함");
    }
    return (
        <EditContainer>
            <VFlexCenter gap='60px'>
                <Headers.BackAndFinish
                    BackOnClick={backClickHandler}
                    RightOnClick={FinishClickHandler}
                >완료</Headers.BackAndFinish>
                <div>dd</div>
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