import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../../../../utils/utils';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['categories'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: builder => ({
    categories: builder.query<Category[], void>({
      query: () => 'categories/all-categories',
    }),
  }),
  // overrideExisting: true,
});
// products?page=0&size=10&filter=red
export const {useCategoriesQuery} = categoriesApi;

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
  length: any;
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  type: string;
}
