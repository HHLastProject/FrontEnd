
import React, { useState } from 'react'

function useTextHandler(maxLength: number, setText: any) {
  const [count, setCount] = useState<number>(0);
  const textCountHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length <= 500) {
      setCount(e.target.value.length);
    }
  };
  const textCountAndSetHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length <= 500) {
      setCount(e.target.value.length);
      setText(e.target.value);
    }
  };
  return {count, setCount, textCountHandler, textCountAndSetHandler};
};

export default useTextHandler
