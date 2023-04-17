
import React, { useState } from 'react'

function useTextCountHandler(maxLength: number) {
  const [count, setCount] = useState<number>(0);
  const textCountHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length <= 500) {
      setCount(e.target.value.length);
    }
  };
  return {count, setCount, textCountHandler};
};

export default useTextCountHandler
