import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseApi} from '../../../redux/base-api';
import {baseUrl} from '../../../utils/utils';
// import { baseUrl } from '../../services/controller';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: builder => ({
    shop: builder.query<Shops, void>({
      query: () => 'shops',
    }),
    postShop: builder.mutation({
      query: data => ({
        url: 'shop',
        method: 'post',
        body: data,
      }),
    }),
    getShop: builder.query<CompleteShop, string>({
      query: id => ({
        url: `shops/${id}`,
        method: 'get',
      }),
    }),
    getShopProducts: builder.query<any, string>({
      query: id => ({
        url: `shops/${id}/products`,
        method: 'get',
      }),
    }),
    deleteShop: builder.mutation({
      query: id => ({
        url: `shops/${id}`,
        method: 'delete',
      }),
    }),
    updateShop: builder.mutation({
      query: data => ({
        url: `shops/${data?.id}`,
        method: 'put',
        body: data,
      }),
    }),
    products: builder.query<ProductsResponse, ProductSearch>({
      query: params => ({
        url: 'products',
        method: 'get',
        params,
      }),
    }),
    category: builder.query<Category[], void>({
      query: () => ({
        url: `shops/categories`,
        method: 'get',
      }),
    }),
    getProduct: builder.query<Product, any>({
      query: id => ({
        url: `products/${id}`,
      }),
    }),
  }),
  // overrideExisting: true,
});
// products?page=0&size=10&filter=red
export const {
  usePostShopMutation,
  useShopQuery,
  useGetShopQuery,
  useDeleteShopMutation,
  useUpdateShopMutation,
  useGetShopProductsQuery,
  useProductsQuery,
  useCategoryQuery,
  useGetProductQuery,
} = shopApi;

// transformResponse: [(data) => {
//   // Your custom JSON parsing logic goes here
//   // You might want to increase the nesting level limit or handle the data differently
//   return JSON.parse(data);

export interface Shop {
  id: string;
  logoUrl: string;
  name: string;
  status: string;
  category: Category;
}
export interface Shops {
  resultTotal: number;
  pageTotal: number;
  data: Shop[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  quantity: number;
  inventory: string;
  imageUrl: string;
  discount: string;
  manufacturer: string;
  weight: string;
  height: string;
  width: string;
  depth: string;
  currency: string;
  tags: string[];
  featured: boolean;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  shop: {
    name: string;
    id: string;
  };
  category: Category;
}
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}
export interface CompleteShop {
  id: string;
  description: string;
  logoUrl: string;
  name: string;
  address: string;
  status: string;
  inventory: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  timeZone: string;
  products: Product[];
}

export interface ProductMini {
  name: string;
  id: string;
  currency: string;
  description: string;
  price: number;
  imageUrl: string;
  shop: {
    name: string;
    id: string;
  };
}
export interface ProductsResponse {
  resultTotal: number;
  pageTotal: number;
  data: ProductMini[];
}

export interface ProductSearch {
  filter: string;
  page: number;
  size: number;
  categoryId: string;
}
