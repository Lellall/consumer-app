import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {baseUrl} from '../../../utils/utils';
// import { baseUrl } from '../../services/controller';
import {BASE_URL} from '@env';
import api from '../../../redux/api';

// export const paymentOrder = createApi({
//   reducerPath: 'paymentOrder',
//   tagTypes: ['paymentOrder'],
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     prepareHeaders: (headers, {getState}) => {
//       const {access_token} = getState().user;
//       // If we have a token set in state, let's assume that we should be passing it.

//       if (access_token) {
//         headers.set('authorization', `Bearer ${access_token}`);
//       }
//       return headers;
//     },
//   }),
export const paymentOrder = api.injectEndpoints({
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
    orderHistory: builder.query<any, OrderHistory>({
      query: () => '/orders/consumer/history',
    }),
  }),
  overrideExisting: true,
});

export const {
  useCheckOrderStatusQuery,
  usePostOrderMutation,
  useCheckoutMutation,
  useCheckoutSummaryMutation,
  useOrderHistoryQuery,
} = paymentOrder;

interface OrderHistory {
  page: number;
  size: number;
  status: 'PENDING' | 'COMPLETED' | 'ON_GOING' | 'ACCEPTED' | 'CANCELED';
}
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
