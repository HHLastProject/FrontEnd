import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import MealCategoryCheckContainer, { categoryFilterItem } from '../components/jh/MealFilter/MealCategory';
import { path } from '../shared/path';

function MealFilter() {
  const [priceRange, setPriceRange] = useState("20");
  const priceRangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(e.target.value);
  }

  return (
    <>
      <Background />
      <MealFilterWrap>
        <form action={path.home} method="get">
          <Link to={'/'}>뒤로가기</Link>
          <div className='category-content'>
            <h3>카테고리</h3>
            <MealFilterContainer>
              {
                categoryFilterItem.map((item) => {
                  return (
                    <MealCategoryCheckContainer
                      key={item.id}
                      iconImg={item.iconImg}
                      id={item.id}
                      idKor={item.idKor}
                      name={item.name}
                    />
                  )
                })
              }
            </MealFilterContainer>
          </div>

          <div className='category-content'>
            <h3>가격대</h3>
            <div className='center'>
              <input
                type="range"
                id="priceRange"
                name="priceRange"
                min="0"
                max="100"
                step="20"
                list="values"
                value={priceRange}
                onChange={priceRangeHandler}
              />
            </div>
            <datalist id="values">
              <option value="0" label="최소" />
              <option value="20" label="1만" />
              <option value="40" label="1만 5천" />
              <option value="60" label="2만" />
              <option value="80" label="2만5천" />
              <option value="100" label="최대" />
            </datalist>
          </div>

          <button>적용하기</button>
        </form>
      </MealFilterWrap>
    </>

  )
}

export default MealFilter;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #8a8a8a86;
`;

const MealFilterWrap = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  
  border-radius: 20px 20px 0 0;
  background-color: #ffffff;

  .category-content {
    margin-top: 30px;
    .center {
      display: flex;
      justify-content: center;
    }
    input[type="range"] {
      width: 94%;
      margin: 0;
    }
    datalist {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

const MealFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  .meal-category {
    display: inline-block;
  }
`;

