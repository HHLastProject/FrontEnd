import styled from 'styled-components'
import { colorSet } from './ui/styles/color';
import { ReactNode, useContext, useEffect } from 'react';
import { CommentIdContext, OrderByContext } from '../apis/context';
import deleteFeedComment from '../custom/jh/deleteFeedComment';
import { controlHidden } from '../custom/jh/controlHidden';
import BtnResetStyle from './ui/element/buttons/BtnReset';
import LOCALSTORAGE_KEY from '../shared/locatstorageKey';
import { SelectData } from '../shared/select';
import { Body1 } from './FontStyle';

export const SelectBoxId = {
  ORDER_BY_SELECT_ID : 'orderby-select-box',
  CATEGORY_SELECT_ID : 'category-select-box',
  RANGE_SELECT_ID : 'range-select-box',
  MODIFY_SELECT_ID : 'modify-select-box',
}

interface ISelectBox {
  children?: ReactNode, 
  id: string, 
  arr?: string[],
  param?: number, 
  isDeleteComment?:boolean,
}

function SelectBox({children, id, arr, param, isDeleteComment} : ISelectBox) {
  if(!id) id = 'select-box';
  const {commentId} = useContext(CommentIdContext);
  const {setOrderBy} = useContext(OrderByContext);

  const onClickHandler = (order: string) => {
    if(setOrderBy) {
      setOrderBy(order);

      if(SelectData.ORDER_BY.includes(order)) {
        localStorage.setItem(LOCALSTORAGE_KEY.shop.ORDER_BY, order);
      } else if (SelectData.TAG_SELECT.includes(order)) {
        localStorage.setItem(LOCALSTORAGE_KEY.feed.ORDER_BY, order);
      };

      //댓글 삭제하기
      if((order === '삭제하기') && isDeleteComment && param){
        const result = window.confirm('해당 댓글을 삭제하시겠습니까?');
        if(result){
          deleteFeedComment({feedId: param, commentId: commentId})
          .then(() => { alert('삭제되었습니다.') });
        }
      }
      controlHidden(id);
    }
  }

  useEffect(() => {
    //기본적으로 창을 숨겨둠
    controlHidden(id);
  }, []);

  return (
    <div
      id={id}
      style={{
        width: "390px",
        height: "100%",
        position: "absolute",
        zIndex: "9999",
      }}
    >
      <SelectBoxStyle>
        <SelectTop/>
        {children}
        {arr?.map((item: string) => {
          return(
            <div style={{padding: '20px'}} key={item}>
              <Body1>
                <BtnResetStyle
                  onClick={() => {onClickHandler(item);}}
                >
                  {item}
                </BtnResetStyle>
              </Body1>
            </div>
          )
        })}
      </SelectBoxStyle>
      <BottomSheetStyle
        onClick={() => controlHidden(id)}
      />
    </div>
  )
}

export default SelectBox

const SelectBoxStyle = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 10000;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
`;

const SelectTop = () => {
  return(
    <JustifyCenter padding='12px 0 16px 0'>
      <SmallbarSpan/>
    </JustifyCenter>
  )
};

const JustifyCenter = styled.div<{padding: string}>`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({padding})=> padding};
`;

const SmallbarSpan = styled.span`
  width: 60px;
  height: 4px;
  border-radius: 100px;
  background-color: ${colorSet.lineMedium};
`;

const BottomSheetStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
`;