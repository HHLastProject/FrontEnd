import React, { useState } from 'react'

const useOnChangeInputHandler = () => {
  const [inputValue, setInputValue] = useState('');
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  return {inputValue, setInputValue, onChangeInputHandler};
}

export default useOnChangeInputHandler