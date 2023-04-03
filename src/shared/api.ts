import axios from 'axios'

const api = axios.create({
  baseURL:`${process.env.REACT_APP_SERVER_URL}`,
})

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

api.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    return response;
  },

  // 오류 응답을 내보내기 전 수행되는 함수
  function (error) {
    return Promise.reject(error);
  }
)

export default api
