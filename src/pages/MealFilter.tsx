import React from 'react'
import styled from 'styled-components'

function MealFilter() {
  return (
    <FilterContainer>
      <form action="/home">
        <div>
          <input type="checkbox" checked/>
          <label htmlFor="">전체</label>
        </div>
        <div>
          <input type="checkbox" name='mealFilter'/>
          <label htmlFor="">샐러드</label>
        </div>
        <div>
          <input type="checkbox" name='mealFilter'/>
          <label htmlFor="">분식</label>
        </div>
        <div>
          <input type="checkbox" name='mealFilter'/>
          <label htmlFor="">육류</label>
        </div>
        <div>
          <input type="checkbox" name='mealFilter'/>
          <label htmlFor="">해산물</label>
        </div>

      </form>
    </FilterContainer>
  )
}

export default MealFilter;

const FilterContainer = styled.div`
  width: 100%;
  height: 80vh;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  
  border-radius: 20px 20px 0 0;
  background-color: #ffb8b8;
`;