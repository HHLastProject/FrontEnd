import styled from "styled-components";


export const HFlex = styled.div<{
    width?: string | null,
    height?: string | null,
    gap?: string | null,
    etc?: string | null
}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    width : ${({ width }) => width ? width : '100%'};
    height : ${({ height }) => height ? height : '100%'};
    gap : ${({ gap }) => gap ? gap : null};
    ${({ etc }) => etc};
`;

export const HFlexSpaceBetween = styled.div<{
    width?: string | null,
    height?: string | null,
    gap?: string | null,
    etc?: string | null
}>
    `
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    width : ${({ width }) => width ? width : '100%'};
    height : ${({ height }) => height ? height : 'fit'};
    gap : ${({ gap }) => gap ? gap : null};
    ${({ etc }) => etc};
`;

export const VFlex = styled.div<{
    width?: string | null,
    height?: string | null,
    gap?: string | null,
    etc?: string | null
}>`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width : ${({ width }) => width ? width : '100%'};
    height : ${({ height }) => height ? height : '100%'};
    gap : ${({ gap }) => gap ? gap : null};
    ${({ etc }) => etc};
`;

export const VFlexCenter = styled.div<{
    width?: string | null,
    height?: string | null,
    gap?: string | null,
    etc?: string | null
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width : ${({ width }) => width ? width : '100%'};
    height : ${({ height }) => height ? height : '100%'};
    gap : ${({ gap }) => gap ? gap : null};
    ${({ etc }) => etc};
`;
