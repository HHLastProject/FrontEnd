import { useState } from "react";
import styled from "styled-components";

interface ButtonProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  value: string;
}

function Button({ categories, onSelectCategory, value }: ButtonProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <Container>
      <StTitleLabel>분류</StTitleLabel>
      {categories.map((category) => (
        <Btn
          value={value}
          key={category}
          onClick={() => handleCategorySelect(category)}
          isSelected={selectedCategory === category}
        >
          {category}
        </Btn>
      ))}
    </Container>
  );
}

export default Button;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StTitleLabel = styled.div`
  display: flex;
  font-weight: bold;
`;

interface BtnProps {
  isSelected: boolean;
}

const Btn = styled.button<BtnProps>`
  margin: 0 5px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 10px;
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
  background-color: ${({ isSelected }) =>
    isSelected ? "blue" : "transparent"};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "blue" : "lightgray"};
  }
`;
