import React from 'react'
import { IconSize28 } from '../ui/element/icons/IconSize'

function IconScrap({isScrap}: {isScrap: boolean}) {
  return (
    <>
      <IconSize28>
        {isScrap
          ? <img src={`${process.env.PUBLIC_URL}/icon/bookmark checked.png`} alt="스크랩" />
          : <img src={`${process.env.PUBLIC_URL}/icon/book mark line_28.png`} alt="스크랩" />
        }
      </IconSize28>
    </>
  )
}

export default IconScrap