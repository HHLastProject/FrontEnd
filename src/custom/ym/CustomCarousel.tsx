import React from 'react'
import styled from 'styled-components';

interface CarouselContainerProps {
    children: React.ReactNode
}

const CustomCarousel = ({ children }: CarouselContainerProps) => {
    return (
        <CarouselContainer>{children}</CarouselContainer>
    )
}

const ContentsBoxContainer = () => {
    return (
        <></>
    )
}

export default CustomCarousel;


const CarouselContainer = styled.div`
    width: 100%;
    height: fit-content;
    background-color: transparent;
    overflow: hidden;
`

const BoxContainer = styled.div`
    width: fit-content;
`