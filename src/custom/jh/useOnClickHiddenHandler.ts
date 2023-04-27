import { useState } from 'react'

function useOnClickHiddenHandler(defaultValue: boolean) {
  const [isSelectHidden, setIsSelectHidden] = useState<boolean>(defaultValue);
  const onClickHiddenHandler = ( ) => {
    setIsSelectHidden(!isSelectHidden);
    console.log(isSelectHidden);
  };
  return {isSelectHidden, setIsSelectHidden, onClickHiddenHandler};
}

export default useOnClickHiddenHandler

export const displayHandler = (id: string) => {
  const el = document.getElementById(id);
  if(el) el.style.display = 'none';
}