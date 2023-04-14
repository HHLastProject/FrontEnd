import React from 'react'
import styled from 'styled-components'
type Prop = {
    children: string
}
const ImageBox = ({ children }: Prop) => {
    return (
        <Image src={children} alt="" />
    )
}

export default ImageBox;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`