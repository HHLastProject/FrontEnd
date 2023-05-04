interface ISelectData {
  readonly [key: string] : string[]
}

export const SelectData: ISelectData = {
  MODIFY_DELETE_SELECT: ['삭제하기'],
  // MODIFY_DELETE_SELECT: ['수정하기', '삭제하기'],
  TAG_SELECT: ['분위기 맛집', '디저트 맛집', '커피 맛집', '뷰 맛집'],
  ORDER_BY: ['거리순', '인기순', '피드순'],
}
