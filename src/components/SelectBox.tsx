import styled from 'styled-components'
import { colorSet } from './ui/styles/color';
import { fontType } from './ui/styles/typo';
import { useContext } from 'react';
import { HiddenContext, ShopCategory } from '../apis/context';

function SelectBox({arr}: {arr: string[]}) {
  //선택창 보이기
  const {isSelectHidden, setIsSelectHidden } = useContext(HiddenContext);
  const {setOrderBy} = useContext(ShopCategory);

  const onClickHandler = (item: any) => {
    if(setIsSelectHidden) setIsSelectHidden(prev => !prev);
    if(setOrderBy) setOrderBy(item);
  }

  return (
    <div
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
        { arr?.map((item) => {
            return(
              <div 
                className='selectBox-order-value'
                style={{cursor: 'pointer'}}
                onClick={() => onClickHandler(item)}
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

