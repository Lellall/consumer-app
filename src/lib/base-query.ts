import {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {BASE_URL} from '@env';
import {getStoreData, storeData} from '../utils/utils';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

let isRefreshingToken = false;

const refreshExpiredToken = async (refreshToken: any) => {
  try {
    const {data} = await axiosInstance.post(`/auth/refresh-token`, {
      refreshToken: refreshToken,
      role: 'CONSUMER',
    });
    await storeData('access_token', data.access_token);
    return data;
  } catch (error) {
    return undefined;
  }
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> =>
  async ({url, method, data, params}) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });
      return {data: result.data};
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      if (error?.response?.status === 403 || error?.status === 403) {
        console.log('*********>> response >>*********', error);
        const originalRequest = error.response?.config;
        if (!isRefreshingToken) {
          isRefreshingToken = true;
          const refresh_token = getStoreData('refresh_token');
          delete axiosInstance.defaults.headers.common.Authorization;

          try {
            const res = await refreshExpiredToken(refresh_token);
            if (res) {
              const {access_token: token} = res;
              await storeData('access_token', token);
              isRefreshingToken = false;
              axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
              // @ts-ignore
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                // const {data}: any = await axios(originalRequest);
                // resolve(data);
              }
            }
            // eslint-disable-next-line no-catch-shadow
          } catch (error) {
            isRefreshingToken = false;
            return error;
          }
        } else {
          setTimeout(async () => {
            const access_token = getStoreData('access_token');
            // @ts-ignore
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            const {data}: any = await axios(originalRequest);
            // resolve(data);
            return data;
          }, 2000);
        }
      }
      return {
        error,
      };
    }
  };

// axios.interceptors.request.use(async req => {
//   console.log('*****intercepting request *****');
//   return req;
// });
