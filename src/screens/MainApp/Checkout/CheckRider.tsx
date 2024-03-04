/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Buttons/Button';
import {LoadingIcon} from '../../../assets/Svg/Index';
import {useCheckOrderStatusQuery} from '../Settings/payment-order-api';
import useCheckoutController from './useCheckoutController';
import {useDispatch, useSelector} from 'react-redux';
import {User} from '../../Authentication/auth-api';
import PayWithFlutterwave from 'flutterwave-react-native';
import {RedirectParams} from 'flutterwave-react-native/dist/PayWithFlutterwave';
import {clearCart} from '../../../redux/cart/cartSlice';
import Toast from 'react-native-toast-message';
import {flutterWaveAuthKey} from '../../../utils/utils';

const CheckRider = ({route, navigation}) => {
  const {user} = useSelector((state: User) => state.user);
  const dispatch = useDispatch();
  // const [isModal, setIsModal] = useState(false);
  const orderId = route.params.orderId;
  const totalAmount = route.params.totalAmount;

  const {
    data: riderData,
    // isLoading,
    isFetching,
    // isError,
    refetch,
  } = useCheckOrderStatusQuery(orderId);
  console.log('-----------------OREDER-ID:', orderId);
  // console.log('Rider Data', riderData);
  // console.log('order_id', orderId);

  const {actions, loading, data, errors} = useCheckoutController();
  const {checkoutData} = data;
  const {postCheckout} = actions;
  // console.log('checkoutData', checkoutData);
  // console.log('checkoutError', errors.checkoutError);
  const handleCheckout = useCallback(() => {
    // console.log('CHecking out +++++++++++++++++++++++++++');
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
  }, [
    errors.checkoutError?.data?.message,
    loading.isCheckoutError,
    loading.isCheckoutSuccess,
  ]);

  const handleOnRedirect = (paymentData: RedirectParams) => {
    console.log('trigger payment');
    console.log('payment data', paymentData);
    // setIsModal(false);
    if (paymentData.status === 'successful') {
      Toast.show({
        type: 'success',
        text1: 'Your payment is success',
      });
      navigation.navigate('CheckoutSuccess', {
        tansaction_id: paymentData.transaction_id,
      });
      dispatch(clearCart());
    }

    if (paymentData.status === 'cancelled') {
      Toast.show({
        type: 'error',
        text1: 'Your payment is cancelled',
      });
      setHasRider(false);
    }
  };

  const [hasRider, setHasRider] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null | number>(null);

  const stopTimer = useCallback(() => {
    if (isRunning && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setEnableButton(true);
    }
  }, [isRunning]);

  if (seconds === 0) {
    stopTimer();
  }
  const startTimer = () => {
    if (isRunning && !hasRider) {
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
  useEffect(() => {
    startTimer();
  }, [isRunning]);

  useEffect(() => {
    if (checkoutData?.transactionReference) {
      setHasRider(true);
      stopTimer();
    }
  }, [checkoutData?.transactionReference, stopTimer]);

  if (hasRider) {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: '#fff',
              height: 200,
              width: '95%',
              padding: 3,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <Text h1>Arriving in few minutes after payment</Text> */}
            <View
              style={{
                backgroundColor: 'orange',
                width: 50,
                height: 50,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                // alignSelf: 'center',
              }}>
              <Text style={{fontSize: 20}}>YA</Text>
            </View>
            <Text h3>Yahya Ahmad</Text>
            <Text h2>Power Bike - Red - 32039</Text>
            <View style={{borderColor: '#000', borderWidth: 1}} />
            <Text>Oya Pay then I will come </Text>

            {/* {checkoutData?.transactionReference && ( */}
            <PayWithFlutterwave
              onRedirect={handleOnRedirect}
              options={{
                tx_ref: checkoutData?.transactionReference,
                authorization: flutterWaveAuthKey,
                customer: {
                  email: user.username,
                },
                amount: totalAmount, // amount of total transaction remove hard coded values
                currency: 'NGN',
                payment_options: 'card',
              }}
              currency="NGN"
            />
            {/* )} */}
          </View>
        </View>
      </>
    );
  } else {
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
            isLoading={isFetching || loading.isChecking}
            style={{borderRadius: 30, width: '90%', marginVertical: 10}}
            onPress={() => {
              refetch();
              resetTimer();
              // startTimer();
              // setRefetchTime(20);
              // setEnableButton(!enableButton);
            }}
            disabled={!enableButton}
          />
          <Text>
            Try agin in <Text style={{color: 'orange'}}>{seconds} secs</Text>
          </Text>
        </View>
      </>
    );
  }
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
