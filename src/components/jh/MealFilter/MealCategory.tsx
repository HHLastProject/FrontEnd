import React from 'react'
import styled from 'styled-components';

interface IMealCategoryCheckProps {
  iconImg : string;
  id : string;
  idKor? : string;
  name : string;
  children? : any;
};

const MealCategoryCheckContainer = ({iconImg, id, idKor, name, children} : IMealCategoryCheckProps)  => {
  return (
    <MealCategoryCheck>
      <div className='check-category-item'>
          <img src={iconImg} alt={id} />
      </div>
      <input type="radio" value={idKor} id={id} name={name}/>
      <label htmlFor={id}>{idKor}</label>
    </MealCategoryCheck>
  );
}

export default MealCategoryCheckContainer;

const MealCategoryCheck = styled.div`
  display: flex;
  flex-direction: column;

  .check-category-item {
    width: 50px;
    height: 50px;
    border-radius: 5px 20px 5px 5px;
    background-color: #dfceff;
    display: inline-block;
  }
`;

export const categoryFilterItem = [
  {
    iconImg : "전체",
    id : "mealAll",
    idKor : "전체",
    name : "mealFilter",
  },
  {
    iconImg : "샐러드",
    id : "salad",
    idKor : "샐러드",
    name : "mealFilter",
  },
  {
    iconImg : "분식",
    id : "bunsik",
    idKor : "분식",
    name : "mealFilter",
  },
  {
    iconImg : "육류",
    id : "meat",
    idKor : "육류",
    name : "mealFilter",
  },
  {
    iconImg : "해산물",
    id : "seafood",
    idKor : "해산물",
    name : "mealFilter",
  },
];