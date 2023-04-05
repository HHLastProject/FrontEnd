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
      <input type="radio" value={idKor} id={id} name={name} hidden/>
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
    overflow: hidden;
  }
`;

type idKor = "전체" | "샐러드" | "분식" | "육류" | "해산물";
// interface ICategoryFilterItem implements idKor{
//   iconImg : string in idKor;
// };

export const categoryFilterItem = [
  {
    iconImg : "전체.jpg",
    id : "mealAll",
    idKor : "전체",
    name : "mealFilter",
  },
  {
    iconImg : "샐러드.jpg",
    id : "salad",
    idKor : "샐러드",
    name : "mealFilter",
  },
  {
    iconImg : "분식.jpg",
    id : "bunsik",
    idKor : "분식",
    name : "mealFilter",
  },
  {
    iconImg : "육류.jpg",
    id : "meat",
    idKor : "육류",
    name : "mealFilter",
  },
  {
    iconImg : "해산물.jpg",
    id : "seafood",
    idKor : "해산물",
    name : "mealFilter",
  },
];