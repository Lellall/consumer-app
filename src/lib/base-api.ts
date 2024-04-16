import {createApi} from '@reduxjs/toolkit/query/react';
// import {createBaseQuery} from './base-query';
import {axiosBaseQuery} from './base-query';

const tagTypes = ['shopApi', 'paymentOrder', 'categories'] as const;

export const baseApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'baseApi',
  endpoints: () => ({}),
  tagTypes,
});
// export type QueryTag = (typeof tagTypes)[number];
