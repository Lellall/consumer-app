import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {cacher} from './rtkQueryCacheUtils';
import {BASE_URL} from '@env';
import {RootState} from './store';
import {logout, setUser} from './user/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const {access_token} = getState().user;
    if (access_token) {
      headers.set('authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
});

const refreshExpiredToken = async (refreshToken: any) => {
  try {
    const refreshResult: any = await fetch(`${BASE_URL}auth/refresh-token`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({refreshToken: refreshToken, role: 'CONSUMER'}),
      method: 'POST',
    });
    return refreshResult.json();
  } catch (error) {
    return undefined;
  }
};
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = (api.getState() as RootState).user.refresh_token;
  console.log('------------------------------');

  if (result?.error && result?.error?.status === 401) {
    const res = await refreshExpiredToken(refreshToken);
    console.log('res', res);
    if (res) {
      const {user} = api.getState() as RootState;
      console.log('get user', user);

      api.dispatch(
        setUser({
          access_token: res.access_token,
          user: user.user,
          refresh_token: res.refresh_token, // Update with new token
        }),
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('FAILED');
      api.dispatch(logout());
      //   console.log('DISPATCH LOGON OUT NOW ********************************');
    }
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: [...cacher.defaultTags],
  endpoints: () => ({}),
});

export default api;
