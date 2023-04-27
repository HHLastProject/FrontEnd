import styled from "styled-components";
import { fontType } from "./ui/styles/typo";
import { colorSet } from "./ui/styles/color";

//Heading
export const Heading1 = styled.div<{color?: string}>`
  ${fontType.heading_1}
  color: ${({color}) => color};
`;
export const Heading2 = styled.div<{color?: string}>`
  ${fontType.heading_2}
  color: ${({color}) => color};
`;

//Title
export const Title1 = styled.label<{color?: string}>`
  ${fontType.title_1}
  color: ${({color}) => color};
`;
export const Title2 = styled.label<{color?: string}>`
  ${fontType.title_2}
  color: ${({color}) => color};
`;
export const Title3 = styled.label<{color?: string}>`
  ${fontType.title_3}
  color: ${({color}) => color};
`;
export const Title4 = styled.label<{color?: string}>`
  ${fontType.title_4}
  color: ${({color}) => color};
`;
export const Title5 = styled.label<{color?: string}>`
  ${fontType.title_5}
  color: ${({color}) => color ? color : colorSet.textStrong};
`;

//Body
export const Body1 = styled.label<{color?: string}>`
  ${fontType.body_1}
  color: ${({color}) => color};
`;
export const Body2 = styled.label<{color?: string}>`
  ${fontType.body_2}
  color: ${({color}) => color};
`;
export const Body3 = styled.label<{color?: string}>`
  ${fontType.body_3}
  color: ${({color}) => color ? color : colorSet.textStrongMedium};
`;
export const Body4 = styled.label<{color?: string}>`
  ${fontType.body_4}
  color: ${({color}) => color ? color : colorSet.textStrongMedium};
`;
export const Body5 = styled.label<{color?: string}>`
  ${fontType.body_5}
  color: ${({color}) => color ? color : colorSet.textStrongMedium};
`;