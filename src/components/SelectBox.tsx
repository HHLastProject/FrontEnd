import styled from 'styled-components'
import { colorSet } from './ui/styles/color';
import { fontType } from './ui/styles/typo';
import { ReactNode, useContext, useEffect } from 'react';
import { CommentIdContext, OrderByContext } from '../apis/context';
import deleteFeedComment from '../custom/jh/deleteFeedComment';
import { controlHidden } from '../custom/jh/controlHidden';

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
  const {orderBy, setOrderBy} = useContext(OrderByContext);

  const onClickHandler = (order: string) => {
    if(setOrderBy) {
      setOrderBy(order);

      //댓글 삭제하기 기능 있을때
      if((orderBy === '삭제하기') && isDeleteComment && param){
        const result = window.confirm('해당 댓글을 삭제하시겠습니까?');
        if(result){
          deleteFeedComment({feedId: param, commentId: commentId})
          .then(() => {
            alert('삭제되었습니다.');
          })
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
        { arr?.map((item) => {
            return(
              <div 
                className='selectBox-order-value'
                style={{cursor: 'pointer'}}
                onClick={() => {onClickHandler(item);}}
                key={item}
              >
                {item}
              </div>
            )
          })
        }
      </SelectBoxStyle>
      <BottomSheet
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
  .selectBox-order-value {
    padding: 20px;
    ${fontType.body_1}
  }
`;

const SelectTop = () => {
  return(
    <div style={{
      width:"100%", 
      display: "flex",
      justifyContent: "center",
      padding: "12px 0 16px 0", 
      }}
    >
      <SmallbarSpan/>
    </div>
  )
};

const SmallbarSpan = styled.span`
  width: 60px;
  height: 4px;
  border-radius: 100px;
  background-color: ${colorSet.lineMedium};
`;

const BottomSheet = ({onClick, hidden}: {onClick: React.MouseEventHandler<HTMLDivElement>, hidden?: boolean}) => {
  return(
    <>
    <BottomSheetStyle>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
        onClick={onClick}
      />
    </BottomSheetStyle>
    </>
  )
}

const BottomSheetStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
`;

