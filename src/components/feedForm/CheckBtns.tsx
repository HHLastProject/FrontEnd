import styled from "styled-components";
import { colorSet } from "../ui/styles/color";
import { fontType } from "../ui/styles/typo";
import { useState } from "react";

function CheckBtns({arr, checkList, setCheckList}:{arr: string[], checkList: string[], setCheckList: React.Dispatch<React.SetStateAction<string[]>>}) {
  return (
    <>
      {arr?.map((item: string) => {
        return(
          <TagBtn key={item} checkList={checkList} setCheckList={setCheckList}>
            {item}
          </TagBtn>
      )})
      }
    </>
  )
}

export default CheckBtns

const TagBtn = ({children, checkList, setCheckList}: {children: string, checkList: string[], setCheckList: React.Dispatch<React.SetStateAction<string[]>>}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  //클릭했을때
  const onClickHandler = (value: string) => {
    setIsChecked(pre => !pre);
    if(checkList.length <= 4){
      if(!isChecked){
        //체크된 값 추가
        setCheckList(pre => {
          return [...pre, value];
        });
      } else {
        //value와 값이 같지 않은 것, 즉 체크되지 않은 것만 filter로 거르기
        setCheckList(pre => {
          const result = [...pre].filter((item:string) => (item !== value));
          return [...result];
        });
      }
    }
  };

  return(
    <TagBtnStyle
      isChecked={isChecked}
      onClick={() => onClickHandler(children)}
    >
      {children}
    </TagBtnStyle>
  )
}

const TagBtnStyle = styled.button<{isChecked: boolean}>`
  padding: 7px 12px;
  border-radius: 100px;
  ${fontType.body_3}
  color: ${({isChecked}) => isChecked ? 'white' : colorSet.textMedium};
  background-color: ${({isChecked}) => isChecked ? colorSet.primary_01 : colorSet.lineLight};
  border: none;
`;