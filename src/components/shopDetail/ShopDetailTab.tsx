import React, { useRef, useState } from 'react'
import { IconTabPoint24 } from '../ui/element/icons/IconsStyle';
import styled from 'styled-components';
import { colorSet } from '../ui/styles/color';
import { fontType } from '../ui/styles/typo';
import ListCount from '../ListCount';

type TTabEl = {id: string, value: string, checkId: string};

export const shopDetailTabEl: TTabEl[] = [
  {id: `info-top`, value: '정보', checkId: 'detail-tab-info'},
  {id: `menu-top`, value: '메뉴', checkId: 'detail-tab-menu'},
  {id: `feed-top`, value: '피드', checkId: 'detail-tab-feed'},
];

function ShopDetailTab({tabEl, listCount}: {tabEl: TTabEl[], listCount?: number}) {
  const [tabValue, setTabValue] = useState<string>('정보');
  const checkRef = useRef<HTMLInputElement>();

  //탭 눌렀을때
  const tabOnclickHandler = (id: string, value: string, checkId: string) => {
    setTabValue(value);
    const radio = document.getElementById(checkId);
    // const radio = document.getElementById(checkId);
    if(radio){
      console.log(typeof radio.getAttribute('checked'), radio.getAttribute('checked'));
      // if(radio.checked){
      //   radio.checked = 'true';
      // }
    }
    scrollToTabInfo(id);
  };

  //스크롤 이벤트
  const scrollToTabInfo = (id: string) => {
    const container = document.getElementById('page-container');
    if(container) {
      const el = document.getElementById(id)?.offsetTop;
      container.scrollTo({top: el, behavior: 'smooth'});
    }
  };

  return (
    <ShopDetailTabStyle>
      <ul id='detail-tab'>
        {tabEl?.map((item: TTabEl) => {
          return(
            <li key={item.value}>
              {(item.value === tabEl[0].value) 
                ?
                <input
                  onChange={(e) => {console.log('체크')}}
                  type="radio" id={item.checkId} name='detail-tab' defaultChecked hidden
                />
                :
                <input
                  onChange={(e) => {console.log('체크')}}
                  type="radio" id={item.checkId} name='detail-tab' hidden
                />
              }
              <div className='detail-tab-div'
                onClick={(e) => tabOnclickHandler(item.id, item.value, item.checkId)}
              >
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {(tabValue === item.value) && <IconTabPoint24/>}
                  <label htmlFor={item.checkId}>
                    {item.value}
                    {(item.value === '피드') && <span style={{margin: '4px'}}><ListCount>{listCount}</ListCount></span>}
                  </label>
                </div>
              </div>
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
      width: 33.33%; 
    }

    label {
      width: 100%;
      line-height: 50px;
      display: block;
      cursor: pointer;
    }

    .detail-tab-div {
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