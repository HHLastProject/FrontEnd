import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name:string, value:string) => {
  if (getCookie(name)) removeCookie(name);
  return cookies.set(name, value);
};

export const getCookie = (name:string) => {
  return cookies.get(name);
};

export const removeCookie = (name:string) => {
  return cookies.remove(name);
};