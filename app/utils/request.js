import axios from 'axios';
import backendAdress from './Custom/APIConfig';

const request = axios.create({
  baseURL: backendAdress(), // the base url that u gave to ur backend in the index.js in the server folder in ur case it will probably be /api
  timeout: 0, // the waiting time for ur request to be sent
});

request.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const requestConfig = { ...config };
    const token = localStorage.getItem('token'); // getting the token from local storage
    // const token = null; // getting the token from local storage

    if (token != null) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (res) => res,
  (err) => {
    const error = { ...err };
    if (error.response?.status === 401) {
      if (error.response?.data === 'TOKEN-EXPIRED') {
        localStorage.clear();
        window.location.herf = '/login';
      }
    }
    if (error.response?.status !== 200) {
      // error handling
    }
    return Promise.reject(error);
  },
);

export default request;
