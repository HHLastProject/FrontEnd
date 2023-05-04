import { PropsWithChildren, ReactNode } from "react";
import { getToken } from "../apis/getToken";

//토큰이 없으면 보여주고, 있으면 안 보여줌.
export const LoginCheck = ({children, logout} : {children: ReactNode, logout?: boolean}) => {
  const token = getToken();
  if(!token) return <>{children}</>;
  if(logout && token)  return<>{children}</>;
  return <></>;
};

//내 것인게 확인되면 보여주기
export const CheckMine = ({children, isMine} : {children: ReactNode, isMine: boolean}) => {
  if(isMine) return <>{children}</>;
  return <></>;
}