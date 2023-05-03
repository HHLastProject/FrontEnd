import React from 'react'
import styled from 'styled-components'
import { iconImgPath } from '../../shared/path';
import IconSize from '../ui/element/icons/IconSize';

function Loading() {
  return (
    <Centered>
      <IconSize.size100>
        <img src={`${iconImgPath.loading.default}`} alt="로딩 중" />
      </IconSize.size100>
    </Centered>
  )
}

export default Loading

const Centered = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;