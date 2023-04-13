import React from 'react'
import { BG_MEDIUM } from '../custom/ym/variables'
import styled from 'styled-components'
type Prop = {
    children: JSX.Element
}
const TagPaint = ({ children }: Prop) => {
    return (
        <Paint>{children}</Paint>
    )
}

export default TagPaint;
const Paint = styled.div`
    width: fit-content;
    height: fit-content;
    background-color: ${`#${BG_MEDIUM}`};
`