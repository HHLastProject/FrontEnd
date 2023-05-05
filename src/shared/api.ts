import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Authorization": localStorage.getItem("access_token"),
  },
}

const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
})

export const api_token = axios.create(axiosConfig);

api.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    // const token = cookies.get("token")
    // config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    return Promise.reject(error);
  }
)

api_token.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem("access_token");
    return config;
  },

  // 오류 응답을 내보내기 전 수행되는 함수
  function (error) {
    return Promise.reject(error);
  }
)

// api_token.interceptors.response.use(
//   (response) => response,
//   (err: AxiosError) => {
//     if (err.response && err.response.status === 401) {
//     } else {
//       return Promise.reject(err);
//     }
//   }
// )


export default api;
