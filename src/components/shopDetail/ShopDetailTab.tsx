import { useState } from 'react'
import styled from 'styled-components';
import { IconTabPoint24 } from '../ui/element/icons/IconsStyle';
import { colorSet } from '../ui/styles/color';
import { fontType } from '../ui/styles/typo';
import ListCount from '../ListCount';
import { scrollToId } from '../../custom/jh/scrollEvent';

type TTabEl = {id: string, value: string, checkId: string};

export const shopDetailTabEl: TTabEl[] = [
  {id: `info-top`, value: '정보', checkId: 'detail-tab-info'},
  {id: `menu-top`, value: '메뉴', checkId: 'detail-tab-menu'},
  {id: `feed-top`, value: '피드', checkId: 'detail-tab-feed'},
];

function ShopDetailTab({tabEl, listCount}: {tabEl: TTabEl[], listCount?: number}) {
  const [tabValue, setTabValue] = useState<string>('정보');

  //탭 눌렀을때
  const tabOnclickHandler = (id: string, value: string) => {
    setTabValue(value);
    scrollToId(id);
  };

  return (
    <ShopDetailTabStyle>
      <ul>
        {tabEl?.map((item: TTabEl) => {
          return(
            <li key={item.value}>
              <input
                type="radio" 
                id={item.checkId} 
                name='detail-tab'
                onChange={(e) => tabOnclickHandler(item.id, item.value)}
                defaultChecked={(item.value === tabEl[0].value) ? true : false}
                hidden
              />
              <label htmlFor={item.checkId} className='detail-tab-div'>
                <Centered>
                  {(tabValue === item.value) && <IconTabPoint24/>}
                  {item.value}
                  {(item.value === '피드') 
                    && 
                    <span style={{marginLeft: '4px'}}>
                      <ListCount>{listCount}</ListCount>
                    </span>
                  }
                </Centered>
              </label>
            </li>
          )
        })}
      </ul>
    </ShopDetailTabStyle>
  )
}

export default ShopDetailTab

const ShopDetailTabStyle = styled.div`
  width: 100%;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;

    li {
      width: ${100/3}%;
    }

    label {
      width: 100%;
      height: 100%;
      line-height: 50px;
      display: block;
      cursor: pointer;
    }

    input[type="radio"] + .detail-tab-div {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid ${colorSet.lineMedium};
      label {
        ${fontType.body_1}
        color: ${colorSet.textMedium};
      }
    }

    input[type="radio"]:checked + .detail-tab-div {
      border-bottom: 3px solid ${colorSet.primary_01};
      label {
        ${fontType.title_4}
        color: ${colorSet.textStrong};
      }
    }
  }
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;