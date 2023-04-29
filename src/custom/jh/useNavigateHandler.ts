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
  const backClickHandler = () => {
    navi(-1);
  }
  return {
    loginClickHandler, 
    mapClickHandler, 
    searchClickHandler, 
    adminClickHandler,
    backClickHandler,
  };
}

export default useNavigateHandler