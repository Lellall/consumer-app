import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../../../utils/utils';
// import { baseUrl } from '../../services/controller';

export const paymentOrder = createApi({
  reducerPath: 'paymentOrder',
  tagTypes: ['paymentOrder'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: builder => ({
    orders: builder.query<Order, string>({
      query: id => `orders/consumer/${id}`,
    }),
  }),
});

export const {useOrdersQuery} = paymentOrder;

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
