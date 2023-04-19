import api from "../../shared/api";
import { apiPath } from "../../shared/path";

const getSearchResult = async (inputValue: string, setState: React.Dispatch<React.SetStateAction<never[]>>) => {
  let data = undefined;
  console.log('검색중', inputValue);
  await api.post(`${apiPath.search}`, {
    searchName: inputValue,
  }).then((result) => {
    setState(result.data);
    console.log('성공 데이터 가져왔나?', result);
  }).catch((error) => {
    console.log('error',error);
  });
  return data;
};

export default getSearchResult