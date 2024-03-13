/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../../../components/Text/Text';
import {useDispatch, useSelector} from 'react-redux';
import {User} from '../../Authentication/auth-api';
import PayWithFlutterwave from 'flutterwave-react-native';
import {RedirectParams} from 'flutterwave-react-native/dist/PayWithFlutterwave';
import {clearCart} from '../../../redux/cart/cartSlice';
import Toast from 'react-native-toast-message';
import {flutterWaveAuthKey} from '../../../utils/utils';
import {reset} from '../../../redux/ui';

const CheckRiderSuccess = ({route, navigation}) => {
  const {user} = useSelector((state: User) => state.user);
  const dispatch = useDispatch();
  const totalAmount = route.params.totalAmount;
  const transactionRef = route.params.txtRef;

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
      dispatch(reset());
    }

    if (paymentData.status === 'cancelled') {
      Toast.show({
        type: 'error',
        text1: 'Your payment is cancelled',
      });
      // setHasRider(false);
    }
  };

  // useEffect(() => {
  //   if (checkoutData?.transactionReference) {
  //     setHasRider(true);
  //   }
  // }, [checkoutData?.transactionReference, stopTimer]);

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

          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: transactionRef,
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
};

export default CheckRiderSuccess;

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
