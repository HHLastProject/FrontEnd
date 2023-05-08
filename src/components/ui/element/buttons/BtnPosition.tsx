import React from "react";
import styled from "styled-components";
import { VFlexCenter } from "../../../../custom/ym/styleStore";
import { InternalJSX } from "../../../../custom/ym/types";

// const Center = ({ children }: InternalJSX) => {
//     return (
//         <VFlexCenter>{children}</VFlexCenter>
//     );
// }

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

export const BtnPosition = { Center };