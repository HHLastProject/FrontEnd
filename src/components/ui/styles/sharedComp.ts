import styled from "styled-components";

export const Centered = styled.div<{align?: boolean, justify?: boolean}>`
  display: flex;
  justify-content: ${({justify}) => justify && 'center'};
  align-items: ${({align}) => align && 'center'};
`;