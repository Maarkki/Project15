import axios from "axios";

const host = "http://127.0.0.1:5173";

export const Instance = axios.create({
  withCredentials: true,
  baseURL: host,
});

// создаем перехватчик запросов
// который к каждому запросу добавляет accessToken из localStorage
Instance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

// создаем перехватчик ответов
// который в случае невалидного accessToken попытается его обновить
// и переотправить запрос с обновленным accessToken
Instance.interceptors.response.use(
  // в случае валидного accessToken ничего не делаем:
  (config) => {
    return config;
  },
  // в случае просроченного accessToken пытаемся его обновить:
  async (error) => {
    // предотвращаем зацикленный запрос, добавляя свойство _isRetry
    // const originalRequest = { ...error.config };
    // originalRequest._isRetry = true;
    //}
    //if (!error.config._isRetry) {
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (
      // проверим, что ошибка именно из-за невалидного accessToken
      error.response.status === 401 &&
      // проверим, что запрос не повторный
      error.config &&
      !error.config._isRetry &&
      error.config.url !== "/users/signin"
    ) {
      try {
        // запрос на обновление токенов
        const resp = await fetch(host+"/users/refresh", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("refresh"),
          },
        });
        if (resp.status == 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.reload();
        }
        const data = await resp.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh", data.refresh);
        //     // переотправляем запрос с обновленным accessToken
        return Instance.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        //window.location.replace("/login");
        window.location.reload();
      }
    }
    // на случай, если возникла другая ошибка (не связанная с авторизацией)
    // пробросим эту ошибку
    throw error;
  }
);
