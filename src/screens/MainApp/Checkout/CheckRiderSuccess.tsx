/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import Text from '../../../components/Text/Text';
import {useDispatch, useSelector} from 'react-redux';
// import {User} from '../../Authentication/auth-api';
// import PayWithFlutterwave from 'flutterwave-react-native';
// import {RedirectParams} from 'flutterwave-react-native/dist/PayWithFlutterwave';
import {clearCart} from '../../../redux/cart/cartSlice';
import Toast from 'react-native-toast-message';
// import {flutterWaveAuthKey} from '../../../utils/utils';
import {reset, uiSelector} from '../../../redux/ui';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {
  // FLUTTERWAVEAUTHKEY,
  // PAYSTACKPUBLICLIVEKEY,
  PAYSTACKPPUBLICTESTKEY,
} from '@env';
import {userSelector} from '../../../redux/user/userSlice';

const CheckRiderSuccess = ({route, navigation}) => {
  const {user} = useSelector(userSelector);
  const dispatch = useDispatch();
  const {orderInfo} = useSelector(uiSelector);

  // const totalAmount = route.params.totalAmount;
  const transactionRef = route.params.txtRef;

  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  // const handleOnRedirect = (paymentData: RedirectParams) => {
  //   console.log('payment data', paymentData);
  //   // setIsModal(false);
  //   if (paymentData.status === 'successful') {
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Your payment is success',
  //     });
  //     navigation.navigate('CheckoutSuccess', {
  //       tansaction_id: paymentData.transaction_id,
  //     });
  //     dispatch(clearCart());
  //     dispatch(reset());
  //   }

  //   if (paymentData.status === 'cancelled') {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Your payment is cancelled',
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (checkoutData?.transactionReference) {
  //     setHasRider(true);
  //   }
  // }, [checkoutData?.transactionReference, stopTimer]);

  return (
    <>
      <View style={styles.container}>
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

          {/* <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: transactionRef,
              authorization: FLUTTERWAVEAUTHKEY,
              customer: {
                email: user.username,
              },
              amount: totalAmount, // amount of total transaction remove hard coded values
              currency: 'NGN',
              payment_options: 'card',
            }}
            currency="NGN"
          /> */}
          <View style={{marginTop: 10, width: '100%', alignItems: 'center'}}>
            <Paystack
              paystackKey={PAYSTACKPPUBLICTESTKEY}
              billingEmail={user.username}
              currency="NGN"
              refNumber={transactionRef}
              amount={orderInfo?.totalAmount}
              onCancel={e => {
                // handle response here
                if (e.status === 'cancelled') {
                  Toast.show({
                    type: 'error',
                    text1: 'Your payment is canceled',
                  });
                }
              }}
              onSuccess={res => {
                // handle response here

                if (res.status === 'success') {
                  Toast.show({
                    type: 'success',
                    text1: 'Your payment is success',
                  });
                  navigation.navigate('CheckoutSuccess', {
                    tansaction_id: res.data.transactionRef.trans,
                  });
                  dispatch(clearCart());
                  dispatch(reset());
                }
              }}
              ref={paystackWebViewRef}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#14C6F8',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
              }}
              onPress={() => paystackWebViewRef?.current?.startTransaction()}>
              <Text>Pay ₦{orderInfo?.totalAmount.toLocaleString('en-US')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default CheckRiderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
