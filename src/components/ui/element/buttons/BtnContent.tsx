import styled from "styled-components";
import { fontType } from '../../styles/typo';
import { colorSet } from '../../styles/color';
import { ChildrenForBtnContents } from "../../../../custom/ym/types";


const White = ({ children, hover, ref, ...props }: ChildrenForBtnContents) => {
    return (
        <Content type="white" hover={hover} ref={ref} {...props}>{children}</Content>
    );
};

const Gray = ({ children, hover, ref, ...props }: ChildrenForBtnContents) => {
    return (
        <Content type="gray" hover={hover} ref={ref} {...props}>{children}</Content>
    );
};

const Black = ({ children, hover, ref, ...props }: ChildrenForBtnContents) => {
    return (
        <Content type="black" hover={hover} ref={ref} {...props}>{children}</Content>
    );
};

export const BtnTextColor = { White, Gray, Black };

const Content = styled.span<{ type: string, hover?: string }>`
    padding: 0px;
    margin: 0px;
    font-family: "Pretendard";
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;

    ${({ type }) => {
        switch (type) {
            case "white":
                return `color: white;`;
            case "black":
                return `color: black;`;
            case "gray":
                return `color: ${colorSet.textMedium};`;
            default:
                return null;
        }
    }}

    &:hover {
        color: ${({ hover }) => hover ? hover : null};
    }
`;