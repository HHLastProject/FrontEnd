import styled from 'styled-components'
import { PropsWithChildren } from 'react'
import { colorSet } from './ui/styles/color';
import { fontType } from './ui/styles/typo';

function ListCount({children}: PropsWithChildren) {
  return (
    <ListCountStyle
      className='list-count'
    >
      {children}
    </ListCountStyle>
  )
}

export default ListCount

const ListCountStyle = styled.span`
  padding: 3px 12px;
  border-radius: 100px;

  background: ${colorSet.bgMedium};
  color: ${colorSet.textMedium};
  ${fontType.body_4}
`;