/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Buttons/Button';
import {LoadingIcon} from '../../../assets/Svg/Index';
import {useCheckOrderStatusQuery} from '../Settings/payment-order-api';
import useCheckoutController from './useCheckoutController';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {Product} from '../Shop/shop-api';
import SummaryModal from './Components/SummaryModal';
import {userSelector} from '../../../redux/user/userSlice';
import {reset, uiSelector} from '../../../redux/ui';

const CheckRider = ({route, navigation}) => {
  // Redux state selectors
  const {user} = useSelector(userSelector);
  const {orderInfo} = useSelector(uiSelector);

  // Redux dispatcher
  const dispatch = useDispatch();

  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null | number>(null);

  // Fetch rider data
  const orderId = route.params.orderId;
  const {
    data: riderData,
    isFetching,
    refetch,
  } = useCheckOrderStatusQuery(orderId);

  // Custom hook for checkout logic
  const {actions, loading, data, errors} = useCheckoutController();
  const {checkoutData, summaryData} = data;
  const {postCheckout, postCheckOutSummary} = actions;

  // Variables
  const deliveryFee = summaryData?.items.find(
    item => item.name === 'Delivery Fee',
  );
  const serviceCharge = summaryData?.items.find(
    item => item.name === 'Service Charge',
  );
  const items = summaryData?.items.filter(item => item.type === 'PRODUCT');

  // Functions
  const handleCheckout = useCallback(() => {
    postCheckout({
      userId: user?.id,
      orderId: riderData?.orderId,
      type: 'INLINE',
      deliveryPoint: riderData?.deliveryPoint,
      distance: riderData?.distance,
    });
  }, [
    postCheckout,
    riderData?.deliveryPoint,
    riderData?.distance,
    riderData?.orderId,
    user?.id,
  ]);

  const cart = useSelector(state => state.cart);
  function handleCheckSummary() {
    const paymentItems = cart.map((product: Product) => ({
      productId: product.id,
      productName: product.name,
      count: product.quantity,
      price: product.price,
    }));
    postCheckOutSummary({
      items: paymentItems,
      deliveryPoint: riderData?.deliveryPoint,
    });
  }

  const stopTimer = useCallback(() => {
    if (isRunning && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setEnableButton(true);
    }
  }, [isRunning]);

  const startTimer = () => {
    if (isRunning) {
      intervalRef.current = setInterval(
        () => setSeconds(prevSeconds => prevSeconds - 1),
        1000,
      );
    }
  };

  const resetTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setIsRunning(true);
      setEnableButton(false);
      setSeconds(20);
    }
  };

  // Effects
  useEffect(() => {
    if (riderData?.status === 'ACCEPTED') {
      handleCheckout();
      //open modal or component with add flutter button to payment
    }
  }, [riderData?.status]);

  useEffect(() => {
    if (loading.isCheckoutError) {
      Toast.show({
        type: 'error',
        text1: errors.checkoutError?.data?.message,
      });
      return;
    }

    if (loading.isCheckoutSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Your order has been checkout successfully',
      });
    }

    if (loading.isSummaryError) {
      Toast.show({
        type: 'error',
        text1: errors.summaryError?.data?.message,
      });
    }
  }, [
    errors.checkoutError?.data?.message,
    errors.summaryError?.data?.message,
    loading.isCheckoutError,
    loading.isCheckoutSuccess,
    loading.isSummaryError,
  ]);

  if (seconds === 0) {
    stopTimer();
  }

  useEffect(() => {
    startTimer();
  }, [isRunning]);

  useEffect(() => {
    if (riderData && riderData.deliveryPoint) {
      handleCheckSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkoutData?.transactionReference) {
      stopTimer();
      navigation.navigate('CheckRiderSuccess', {
        orderId,
        txtRef: checkoutData?.transactionReference,
        totalAmount: summaryData?.totalCost,
      });
    }
  }, [checkoutData?.transactionReference, stopTimer]);

  console.log('summary Error', errors.summaryError);
  console.log('riderData', riderData);
  console.log('-------------');

  console.log('checkout', checkoutData);
  console.log('summaryData', summaryData);
  console.log('checkoutError', errors.checkoutError);
  console.log(' loading.isSummarySucess', loading.isSummarySucess);
  return (
    <>
      <View style={styles.container}>
        <LoadingIcon />
        <View style={{marginVertical: 70}}>
          <Text h1 style={{textAlign: 'center'}}>
            Order Processing!
          </Text>
          <Text>Please be patient as we match your order with a rider</Text>
        </View>
        <Button
          label="Try Again"
          isLoading={isFetching || loading.isCheckingOut}
          style={{borderRadius: 30, width: '90%', marginVertical: 10}}
          onPress={() => {
            refetch();
            resetTimer();
          }}
          disabled={!enableButton}
        />
        <Text>
          Try agin in <Text style={{color: 'orange'}}>{seconds} secs</Text>
        </Text>

        <>
          {loading.isCheckingOutSummary ? (
            <>
              <Text>Loading summary...</Text>
            </>
          ) : loading.isSummarySucess ? (
            <View style={{}}>
              <Text h3>Total Items: {items?.length}</Text>
              <Text h3>
                Total Amount:
                {/* {orderInfo.totalAmount} */}
              </Text>
              <Text h3>Delivery Fee: {deliveryFee?.totalAmount}</Text>
              <Text h3>Service Charge: {serviceCharge?.totalAmount}</Text>
              <Text h3>Total Cost: {summaryData?.totalCost}</Text>
            </View>
          ) : null}
        </>
        <Button
          style={{
            backgroundColor: 'red',
            padding: 4,
            borderRadius: 4,
            marginTop: 7,
            width: '50%',
          }}
          label="Cancel"
          onPress={() => {
            dispatch(reset());
            navigation.goBack();
          }}
        />
      </View>
      <>
        <SummaryModal
          open={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={summaryData}
        />
      </>
    </>
  );
};

export default CheckRider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99999999999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
