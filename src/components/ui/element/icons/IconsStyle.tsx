import { iconImgPath } from "../../../../shared/path"
import { IconSize12, IconSize16, IconSize24 } from "./IconSize"

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

export const IconSmallDownArrow = () => {
  return(
    <IconSize12>
      <img src={iconImgPath.arrow.chevrondown16} alt="작은 화살표" />
    </IconSize12>
  )
}

export const IconPlusWhite24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.write.plus} alt="추가하기" />
    </IconSize24>
  )
}

//하트
export const IconLikeInactive24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.like.likeInactive24} alt="좋아요" />
    </IconSize24>
  )
}
export const IconLikeActive24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.like.likeActive24} alt="좋아요" />
    </IconSize24>
  )
}

//코멘트
export const IconComment24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.comment.comment24} alt="댓글" />
    </IconSize24>
  )
}