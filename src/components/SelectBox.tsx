import styled from 'styled-components'
import { colorSet } from './ui/styles/color';
import { fontType } from './ui/styles/typo';
import { ReactNode, useContext } from 'react';
import { CommentIdContext, HiddenContext, OrderByContext, ShopCategory } from '../apis/context';
import deleteFeedComment from '../custom/jh/deleteFeedComment';
import { RangeFilterButtonBar } from './home/ListCategoryButtonBar';

function SelectBox({children, id, arr, param, isRange, isDeleteComment}: {children?: ReactNode, id?: string, arr?: string[], param?: number, isRange?: boolean, isDeleteComment?:boolean}) {
  if(!id) id = 'select-box';
  if(isRange) id = 'range-select-box';
  const {isSelectHidden, setIsSelectHidden } = useContext(HiddenContext);//선택창 보이기
  const {commentId} = useContext(CommentIdContext);
  const {orderBy, setOrderBy} = useContext(OrderByContext);
  const {range} = useContext(ShopCategory);

  const onClickHandler = (order: string) => {
    if(setOrderBy) {setOrderBy(order);}

    if((orderBy === '삭제하기') && isDeleteComment && (param !== undefined)){
      const result = window.confirm('해당 댓글을 삭제하시겠습니까?');
      if(result){
        deleteFeedComment({feedId: param, commentId: commentId})
        .then(() => {
          alert('삭제되었습니다.');
        })
      }
    }

    if(setIsSelectHidden) {setIsSelectHidden(prev => !prev);}
  }

  return (
    <div
      id={id}
      style={{
        width: "390px",
        height: "100%",
        position: "absolute",
        zIndex: "9999",
      }}
      hidden={isSelectHidden}
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
      {setIsSelectHidden &&
        <BottomSheet
          hidden={isSelectHidden}
          onClick={() => setIsSelectHidden(prev => !prev)}
        />
      }
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

