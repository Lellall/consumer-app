import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// import {baseApi} from '../../redux/base-api';
import {baseUrl} from '../../utils/utils';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder: any) => ({
    login: builder.query({
      query: () => 'auth/login',
      //   providesTags: [''],
    }),
    postLogin: builder.mutation({
      query: (data: any) => ({
        url: 'auth/login',
        method: 'post',
        body: data,
      }),
      //   invalidatesTags: ['student'],
    }),
    postSignup: builder.mutation({
      query: (data: any) => ({
        url: 'auth/register',
        method: 'post',
        body: data,
      }),
      //   invalidatesTags: ['student'],
    }),
    postGoogleAuth: builder.mutation({
      query: () => ({
        url: 'http://api.dev.lellall.com/auth/oauth2/google/authorize?role=CONSUMER&platform_type=ANDROID&callback_url=lellal://open',
        method: 'GET',
      }),
      onQueryStarted: async (data: any) => {
        console.log(data);
      },
      //   invalidatesTags: ['student'],
    }),

    postGoogleAuthVerify: builder.mutation({
      query: (data: any) => ({
        url: `http://api.dev.lellall.com/auth/transfer`,
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
  usePostGoogleAuthMutation,
  usePostGoogleAuthVerifyMutation,
} = authApi;

export interface User {
  [x: string]: any;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  registrationSource: string;
}

export interface LoginResponse {
  refresh_token: string;
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}
