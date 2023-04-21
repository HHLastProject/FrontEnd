import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

function CategoryDetailSpan({children}: PropsWithChildren) {
  return (
    <CategoryDetailSpanStyle>
      {children}
    </CategoryDetailSpanStyle>
  )
}

export default CategoryDetailSpan

const CategoryDetailSpanStyle = styled.span`
  padding: 3px 8px;
  border-radius: 4px;
  background: #EDEDED;
  color: #717176;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`;