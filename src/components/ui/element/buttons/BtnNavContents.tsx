import React from 'react'
import { BtnNavProps } from '../../../../custom/ym/types'
import styled from 'styled-components';
import { navIcons } from '../../../../custom/ym/variables';

const BtnNavContents = ({ isActive, btnType }: BtnNavProps) => {
    return (
        <Container>
            <Image src={navIcons[btnType][`${isActive}`]} alt={btnType} />
        </Container>
    )
}

export default BtnNavContents;

const Container = styled.div`
    width: 54px;
    height: 56px;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`