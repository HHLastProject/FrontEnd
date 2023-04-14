import { PropsWithChildren } from 'react'
import styled from 'styled-components'

function ListCount({children}: PropsWithChildren) {
  return (
    <ListCountStyle>
      {children}
    </ListCountStyle>
  )
}

export default ListCount

const ListCountStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 12px;
  border-radius: 100px;

  background: #F1F1F5;
  color: #717176;

  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
`;