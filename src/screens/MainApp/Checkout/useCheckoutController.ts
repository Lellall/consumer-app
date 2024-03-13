import {
  useCheckoutMutation,
  useCheckoutSummaryMutation,
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
      isLoading: isCheckingOut,
      isSuccess: isCheckoutSuccess,
      isError: isCheckoutError,
      data: checkoutData,
      error: checkoutError,
    },
  ] = useCheckoutMutation();

  const [
    postCheckOutSummary,
    {
      isLoading: isCheckingOutSummary,
      isSuccess: isSummarySucess,
      isError: isSummaryError,
      data: summaryData,
      error: summaryError,
    },
  ] = useCheckoutSummaryMutation();

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

  const actions = {postCheckout, postOrder, postCheckOutSummary};
  const errors = {checkoutError, orderError, summaryError};
  const data = {
    checkoutData,
    OrderData,
    initialValues,
    validationSchema,
    summaryData,
  };
  const loading = {
    isCheckingOut,
    isSummarySucess,
    isSummaryError,
    isCheckingOutSummary,
    isCheckoutSuccess,
    isCheckoutError,
    isOrderSuccess,
    isOrderError,
    isOrderLoading,
  };
  return {actions, loading, data, errors};
};

export default useCheckoutController;
