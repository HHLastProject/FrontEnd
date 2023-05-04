import { iconImgPath } from "../../../../shared/path"
import IconSize, { IconSize12, IconSize16, IconSize24, IconSize40 } from "./IconSize"

//연필
export const IconPencil = () => {
  return (
    <IconSize16>
      <img src={iconImgPath.write.pencil} alt="피드 작성하기" />
    </IconSize16>
  )
}

//맵
export const IconMapFilled24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.search.marker} alt="위치" />
    </IconSize24>
  )
}

//아래 화살표
export const IconSmallDownArrow = () => {
  return(
    <IconSize12>
      <img src={iconImgPath.arrow.chevrondown16} alt="작은 화살표" />
    </IconSize12>
  )
}

//더하기
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

//댓글 페이지 이동 버튼
export const IconComment24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.comment.comment24} alt="댓글" />
    </IconSize24>
  )
}

//...버튼
export const IconEtc24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.etc.etc1} alt="그 외" />
    </IconSize24>
  )
}

//댓글 추가하기 버튼
export const IconUploadActive = () => {
  return(
    <IconSize40>
      <img src={iconImgPath.upload.commentActive40} alt="댓글 추가 active"/>
    </IconSize40>
  )
}
export const IconUploadInactive = () => {
  return(
    <IconSize40>
      <img src={iconImgPath.upload.commentInactive40} alt="댓글 추가 inactive"/>
    </IconSize40>
  )
}

//상세페이지 탭 눌렀을때 옆에 추가되는 이미지
export const IconTabPoint24 = () => {
  return(
    <IconSize24>
      <img src={iconImgPath.tab.point24} alt="탭 포인트" />
    </IconSize24>
  )
}
//태그 선택 버튼 누를 시 추가되는 x버튼
export const IconXRount16 = () => {
  return(
    <IconSize.Size20>
      <img src={iconImgPath.cancel.xRound16} alt="x버튼" />
    </IconSize.Size20>
  )
}
//검색 기록 아이콘
export const IconSearchCiarcle24 = () => {
  return(
    <IconSize.Size24>
      <img src={iconImgPath.search.searchCircle} alt="검색기록" />
    </IconSize.Size24>
  )
}