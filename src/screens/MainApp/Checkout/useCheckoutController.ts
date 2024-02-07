import {
  useCheckoutMutation,
  usePostOrderMutation,
} from '../Settings/payment-order-api';
import * as Yup from 'yup';
const useCheckoutController = () => {
  const [
    postOrder,
    {
      data: OrderData,
      isLoading: isOrderLoading,
      isSuccess: isOrderSuccess,
      isError: isOrderError,
      error: orderError,
    },
  ] = usePostOrderMutation();

  const [
    handleCheckout,
    {
      isLoading: isChecking,
      isSuccess: isCheckoutSuccess,
      isError: isCheckoutError,
      data: checkoutData,
      error: checkoutError,
    },
  ] = useCheckoutMutation();

  const initialValues = {
    landMark: '',
    apartmentFloor: '',
    estate: '',
    houseNumber: '',
  };
  const validationSchema = Yup.object({
    landMark: Yup.string().required(),
    apartmentFloor: Yup.string().required('Apartment number or floor number'),
    houseNumber: Yup.string().required(),
    estate: Yup.string().required(),
  });

  const actions = {handleCheckout, postOrder};
  const errors = {checkoutError, orderError};
  const data = {checkoutData, OrderData, initialValues, validationSchema};
  const loading = {
    isChecking,
    isCheckoutSuccess,
    isCheckoutError,
    isOrderSuccess,
    isOrderError,
    isOrderLoading,
  };
  return {actions, loading, data, errors};
};

export default useCheckoutController;
