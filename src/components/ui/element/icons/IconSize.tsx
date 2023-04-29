import styled from "styled-components";

const centered = () => {
  return (`
    display: flex;
    justify-content: center;
    align-items: center;
  `);
}

export const IconSize12 = styled.span`
  ${centered()}
  img {
    width: 12px;
    height: 12px;
  }
`;

export const IconSize16 = styled.span`
  ${centered()}
  img {
    width: 16px;
    height: 16px;
  }
`;

export const IconSize20 = styled.span`
  ${centered()}
  img {
    width: 20px;
    height: 20px;
  }
`;

export const IconSize24 = styled.span`
  ${centered()}
  img {
    width: 24px;
    height: 24px;
  }
`;

export const IconSize28 = styled.span`
  ${centered()}
  img {
    width: 28px;
    height: 28px;
  }
`;

export const IconSize40 = styled.span`
  ${centered()}
  img {
    width: 40px;
    height: 40px;
  }
`;