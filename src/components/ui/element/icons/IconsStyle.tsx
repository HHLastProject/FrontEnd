import { iconImgPath } from "../../../../shared/path"
import { IconSize16, IconSize24 } from "./IconSize"

export const IconPencil = () => {
  return (
    <IconSize16>
      <img src={iconImgPath.write.pencil} alt="피드 작성하기" />
    </IconSize16>
  )
}

export const IconMapFilled24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.search.marker} alt="위치" />
    </IconSize24>
  )
}