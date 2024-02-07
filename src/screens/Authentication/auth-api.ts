import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from '../../redux/base-api';
import {baseUrl} from '../../utils/utils';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().user.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.query({
      query: () => 'auth/login',
      //   providesTags: [''],
    }),
    postLogin: builder.mutation<LoginResponse, LoginRequest>({
      query: data => ({
        url: 'auth/login',
        method: 'post',
        body: data,
      }),
      //   invalidatesTags: ['student'],
    }),
    postSignup: builder.mutation({
      query: data => ({
        url: 'auth/register',
        method: 'post',
        body: data,
      }),
      //   invalidatesTags: ['student'],
    }),
    updateProfile: builder.mutation({
      query: data => ({
        url: `users/${data.id}`,
        method: 'put',
        body: data,
      }),
      //   invalidatesTags: ['student'],
    }),
    postGoogleAuth: builder.mutation({
      query: () => ({
        url: `https://api.dev.lellall.com/auth/oauth2/google/authorize?role=CONSUMER&platform_type=ANDROID&callback_url=lellal://open`,
        method: 'GET',
      }),
      onQueryStarted: async data => {
        console.log(data);
      },
      //   invalidatesTags: ['student'],
    }),
    postGoogleAuthVerify: builder.mutation({
      query: data => ({
        url: `https://api.dev.lellall.com/auth/transfer`,
        method: 'POST',
        body: data,
      }),

      //   invalidatesTags: ['student'],
    }),
  }),
  // overrideExisting: false,
});

export const {
  usePostLoginMutation,
  useLoginQuery,
  usePostSignupMutation,
  useUpdateProfileMutation,
  usePostGoogleAuthMutation,
  usePostGoogleAuthVerifyMutation,
} = authApi;

function transformLoginResponse(resp) {
  const {user: rawUser, ...restResp} = resp;

  const user = {...rawUser, currentRole: rawUser.roles[0]};

  return {
    ...restResp,
    user,
  };
}

export interface User {
  [x: string]: any;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  registrationSource: string;
  streetName: string;
  houseNumber: string;
  apartmentName: string;
  estate: string;
  poBox: string;
}

export interface LoginResponse {
  refresh_token: string;
  access_token: string;
  token_type: string;
  user: User | undefined;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}
