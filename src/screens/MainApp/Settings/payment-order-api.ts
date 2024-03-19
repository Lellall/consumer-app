import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {baseUrl} from '../../../utils/utils';
// import { baseUrl } from '../../services/controller';
import {BASE_URL} from '@env';

export const paymentOrder = createApi({
  reducerPath: 'paymentOrder',
  tagTypes: ['paymentOrder'],
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
    checkOrderStatus: builder.query<Order, string>({
      query: id => `orders/consumer/${id}`,
    }),
    postOrder: builder.mutation({
      query: data => ({
        url: '/orders',
        method: 'post',
        body: data,
      }),
    }),
    checkout: builder.mutation({
      query: data => ({
        url: '/checkout/initiate',
        method: 'post',
        body: data,
      }),
    }),
    checkoutSummary: builder.mutation({
      query: data => ({
        url: '/checkout/summary',
        method: 'post',
        body: data,
      }),
    }),
  }),
});

export const {
  useCheckOrderStatusQuery,
  usePostOrderMutation,
  useCheckoutMutation,
  useCheckoutSummaryMutation,
} = paymentOrder;

export interface Order {
  orderId: string;
  orderCode: string;
  paymentItems: [
    {
      productId: string;
      count: number;
      productName: string;
      price: number;
    },
  ];
  status: string;
  address: {
    streetName: string;
    houseNumber: string;
    apartmentName: string;
    estate: string;
    poBox: string;
  };
}
