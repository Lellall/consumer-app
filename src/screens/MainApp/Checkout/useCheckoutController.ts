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
    postCheckout,
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
    consumerPhoneNumber: '',
  };
  const validationSchema = Yup.object({
    landMark: Yup.string(),
    apartmentFloor: Yup.string(),
    houseNumber: Yup.string(),
    estate: Yup.string(),
    consumerPhoneNumber: Yup.string()
      .required('Phone Number is required')
      .min(8, 'must be at least 8 characters long')
      .max(12, 'must be at least 12 characters'),
  });

  const actions = {postCheckout, postOrder};
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
