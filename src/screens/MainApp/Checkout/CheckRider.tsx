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
import {useUserSelector, userSelector} from '../../../redux/user/userSlice';
import {reset, uiSelector} from '../../../redux/ui';

const CheckRider = ({route, navigation}) => {
  const {user} = useUserSelector();
  const {orderInfo} = useSelector(uiSelector);
  console.log(orderInfo);
  const dispatch = useDispatch();

  // State variables
  const [enableButton, setEnableButton] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null | number>(null);

  // Fetch rider data
  const orderId = route.params.orderId;
  const {
    data: riderData,
    isFetching,
    isSuccess,
    refetch,
  } = useCheckOrderStatusQuery(orderId);

  // Custom hook for checkout logic
  const {actions, loading, data, errors} = useCheckoutController();
  const {checkoutData, summaryData} = data;
  const {postCheckout, postCheckOutSummary} = actions;

  // Variables
  const deliveryFee = summaryData?.items.find(
    (item: {name: string}) => item.name === 'Delivery Fee',
  );
  const serviceCharge = summaryData?.items.find(
    (item: {name: string}) => item.name === 'Service Charge',
  );
  const items = summaryData?.items.filter(
    (item: {type: string}) => item.type === 'PRODUCT',
  );

  // Functions
  const handleCheckout = useCallback(() => {
    postCheckout({
      userId: user?.id,
      orderId: orderInfo?.orderId,
      type: 'INLINE',
      paymentPlatform: 'PAYSTACK',
    });
  }, [orderInfo?.orderId, postCheckout, user?.id]);

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
        text1:
          errors.checkoutError?.data?.message || errors?.checkoutError?.data[0],
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
    errors.checkoutError?.data,
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
    if (isSuccess) {
      handleCheckSummary();
    }
  }, [isSuccess]);

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

  return (
    <>
      <View style={styles.container}>
        <LoadingIcon />
        <View style={{marginVertical: 30}}>
          <Text h1 style={{textAlign: 'center'}}>
            Order Processing!
          </Text>
          <Text>Please be patient as we match your order with a rider</Text>
        </View>

        <>
          {loading.isCheckingOutSummary ? (
            <>
              <Text>Loading summary...</Text>
            </>
          ) : loading.isSummarySucess ? (
            <View style={{width: '90%'}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text h1>Order Summary</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text h3>Total Items</Text>
                <Text>{items?.length}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text h3>Delivery Fee </Text>
                <Text>{deliveryFee?.totalAmount?.toLocaleString('en-US')}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text h3>Service Charge</Text>
                <Text>
                  {serviceCharge?.totalAmount?.toLocaleString('en-US')}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text h3>Total Amount:</Text>
                <Text>{orderInfo?.totalAmount?.toLocaleString('en-US')}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text h3 style={{fontWeight: 'bold'}}>
                  Grand Total
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  {summaryData?.totalCost?.toLocaleString('en-US')}
                </Text>
              </View>
            </View>
          ) : null}
        </>

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

        <Button
          style={{
            backgroundColor: 'transparent',
            padding: 4,
            borderRadius: 4,
            marginTop: 7,
            width: '50%',
          }}
          fontStyle={{
            fontWeight: 'bold',
            color: 'red',
          }}
          label="Cancel Transaction"
          onPress={() => {
            dispatch(reset());
            navigation.goBack();
          }}
        />
      </View>
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
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
});
