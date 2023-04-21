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