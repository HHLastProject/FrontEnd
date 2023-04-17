import api from "../../shared/api";
import { apiPath } from "../../shared/path";

const getSearchResult = async (inputValue: string, setState: React.Dispatch<React.SetStateAction<never[]>>) => {
  let data = undefined;
  await api.post(`${apiPath.search}`, {
    searchName: inputValue,
  }).then((result) => {
    setState(result.data);
  }).catch((error) => {
    console.log('error',error);
  });
  return data;
};

export default getSearchResult