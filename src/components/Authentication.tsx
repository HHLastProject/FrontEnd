import { PropsWithChildren } from "react";
import { getToken } from "../apis/getToken";

//토큰이 없으면 보여주고, 있으면 안 보여줌.
export const LoginCheck = ({children} : PropsWithChildren) => {
  const token = getToken();
  if(!token) {
    return(
      <>{children}</>
    )
  } else {return <></>;}
};