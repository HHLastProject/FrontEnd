import { useNavigate } from 'react-router';
import { path } from '../../shared/path';

function useNavigateHandler() {
  const navi = useNavigate();
  const loginClickHandler = () => {
    navi(path.login);
  }
  const mapClickHandler = () => {
    navi(path.map);
  }
  const searchClickHandler = () => {
    navi(path.search);
  }
  const adminClickHandler = () => {
    navi(path.adminShoplist);
  }
  const feedFormClickHandler = (param: number | string) => {
    navi(`/shop/${param}/feedform`);
  }
  const backClickHandler = () => {
    navi(-1);
  }
  return {
    loginClickHandler, 
    mapClickHandler, 
    searchClickHandler, 
    adminClickHandler,
    feedFormClickHandler,
    backClickHandler,
  };
}

export default useNavigateHandler