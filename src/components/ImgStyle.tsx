import styled from "styled-components";

type size = {
  width?: number;
  height?: number;
}

interface IImg extends size {
  width?: number;
  height?: number;
  imgUrl: string;
}

export const SpanImg = ({width, height, imgUrl}: IImg) => {
  return (
    <SpanImgStyle>
      <img width={width} height={height} src={imgUrl} alt="" />
    </SpanImgStyle>
  )
};

const SpanImgStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;