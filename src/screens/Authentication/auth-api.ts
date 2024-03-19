import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {baseApi} from '../../redux/base-api';
// import {baseUrl} from '../../utils/utils';
import {BASE_URL} from '@env';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const {access_token} = getState().user;
      // If we have a token set in state, let's assume that we should be passing it.
      if (access_token) {
        headers.set('authorization', `Bearer ${access_token}`);
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
    postRefereshToken: builder.mutation<LoginResponse, RefreshRequest>({
      query: data => ({
        url: 'auth/refresh-token',
        method: 'POST',
        body: data,
      }),
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
  usePostRefereshTokenMutation,
} = authApi;

// interface RefreshResponse {}
interface RefreshRequest {
  refreshToken: string;
  role: string;
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
  trail: boolean;
  address: {
    streetName: string;
    houseNumber: string;
    apartmentName: string;
    estate: string;
    poBox: string;
    region: string;
  };
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
