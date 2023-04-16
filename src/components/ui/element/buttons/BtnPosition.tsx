import React from "react";
import styled from "styled-components";
import { VFlexCenter } from "../../../../custom/ym/styleStore";
import { InternalJSX } from "../../../../custom/ym/types";

const Center = ({ children }: InternalJSX) => {
    return (
        <VFlexCenter>{children}</VFlexCenter>
    );
}

export const BtnPosition = { Center };