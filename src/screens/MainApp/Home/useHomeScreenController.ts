import {useProductsQuery} from '../Shop/shop-api';
import {useCategoriesQuery} from './api/categories-api';

export const useHomeScreenController = ({
  debounceSearch,
  currentPage,
  categoryId,
}: {
  debounceSearch: string;
  currentPage: number;
  categoryId: string;
}) => {
  const {
    data: products,
    isLoading: loadingProducts,
    refetch,
    isFetching,
  } = useProductsQuery({
    filter: debounceSearch.toLocaleLowerCase(),
    page: currentPage,
    size: 16,
    categoryId: categoryId,
  });
  const {data: categories, isLoading: loadingCategories} = useCategoriesQuery();

  const actions = {refetch};
  const data = {
    products,
    categories,
  };
  const loading = {
    loadingProducts,
    loadingCategories,
    isFetching,
  };
  return {actions, loading, data};
};
