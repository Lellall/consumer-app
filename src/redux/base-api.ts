import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {TagDescription} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {BASE_URL} from '@env';

// import {BaseUrl} from '../lib/config';

const tagTypes = ['AUTH', 'SHOPS'] as const;

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      // You can add custom headers here if needed
      return headers;
    },
  }),
  tagTypes,
  reducerPath: 'baseApi',
  endpoints: () => ({}),
  keepUnusedDataFor: 5000,
});

export type ApiTags = ReadonlyArray<TagDescription<(typeof tagTypes)[number]>>;
