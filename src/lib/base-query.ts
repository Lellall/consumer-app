import {Mutex} from 'async-mutex';
import axios, {AxiosError} from 'axios';
import {retry} from '@reduxjs/toolkit/dist/query';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BaseQueryOptions = {
  baseUrl: string;
};

const mutex = new Mutex();

export function createBaseQuery(opts: BaseQueryOptions) {
  const axiosInstance = axios.create({baseURL: opts.baseUrl});

  return async function baseQuery(requestConfig, api) {
    try {
      const resp = await axiosInstance(requestConfig);
      console.log('response', resp);

      return {data: resp.data};
    } catch (error) {
      const err = error as AxiosError;
      const token = await AsyncStorage.getItem('accessToken');

      // Example: handle unauthorized errors and refresh token
      if (err.response?.status === 401 && token) {
        // Implement your token refresh logic here
        // You might want to use a retry or dispatch an action to refresh the token
      }

      return formatError(error); // Re-throw the error to indicate a failed request
    }
  };
}

async function tokenRefresh(url: string, api, data) {
  const navigation = useNavigation();

  const unlock = await mutex.acquire();
  try {
    const resp = await axios.post(url, {
      refreshToken: data,
      role: 'CONSUMER',
    });
    console.log('res', resp);
    AsyncStorage.setItem('accessToken', resp.data.token);
  } catch (err) {
    api.dispatch({type: 'clear'});
    await AsyncStorage.clear();
    navigation.navigate('Authentication');
  } finally {
    unlock();
  }
}

// async function requestInterceptor(requestConfig) {
//   attachToken(requestConfig.headers);
//   return requestConfig;
// }

function attachToken(headers) {
  const accessToken = AsyncStorage.getItem('accessToken');
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }
}

function formatError(error) {
  if (error.response) {
    const {status, data} = error.response;
    const message = data?.details || error.message;
    return {error: {status, message}};
  }
}
