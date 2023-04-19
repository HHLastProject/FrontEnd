export const debounce = (callback: any, delay: number) => {
  let timerId:null | NodeJS.Timeout = null;

  return ((...args: any) => {
    if(timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  })
};