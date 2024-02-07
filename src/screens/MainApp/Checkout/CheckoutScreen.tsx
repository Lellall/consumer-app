/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Linking,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CheckoutHeader from './Components/CheckoutHeader';
import Text from '../../../components/Text/Text';
import LocationSelector from './Components/LocationSelector';
import Previous from './Components/Previous';
import {PayWithFlutterwave, FlutterwaveInit} from 'flutterwave-react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../../../redux/cart/cartSlice';
// import {MapImage} from '../../../assets/Images';
import Button from '../../../components/Buttons/Button';
import {Product} from '../Shop/shop-api';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import useCheckoutController from './useCheckoutController';
import useFlutterLink from '../../../utils/useFlutterLink';
import {CloseIcon} from '../../../assets/Svg/Index';
import Input from '../../../components/Inputs/Input';
import LocationModal from './Components/LocationModal';
import {useFormik} from 'formik';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

interface RedirectParams {
  status: 'successful' | 'cancelled';
  transaction_id?: string;
  tx_ref: string;
}
const {width} = Dimensions.get('window');

const CheckoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: Product[]) => state.cart);
  const {user} = useSelector(state => state.user);
  const [address, setAddress] = useState<null | any>(null);
  const {status, transactionId, transactionRef} = useFlutterLink();
  const [isModal, setIsModal] = useState(false);

  console.log('status', status);
  console.log('transactionId', transactionId);
  console.log('transactionRef', transactionRef);
  const rollInValue = useState(new Animated.Value(0))[0];

  const rollOutFun = useCallback(() => {
    Animated.timing(rollInValue, {
      toValue: -width,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [rollInValue]);

  const handleOnRedirect = (data: RedirectParams) => {
    if (data.status === 'completed') {
      navigation.navigate('CheckoutSuccess', {
        orderNumber: data.transaction_id,
      });
      dispatch(clearCart());
      Toast.show({
        type: 'success',
        text1: 'Your payment is success',
      });
    }

    if (data.status === 'cancelled') {
      Toast.show({
        type: 'error',
        text1: 'Your payment is cancelled',
      });
    }
  };
  // const paymentWithFultter = async => {
  //   try {
  //     // initialize payment
  //     const paymentLink = await FlutterwaveInit({
  //       tx_ref: generateTransactionRef(),
  //       authorization: '[your merchant public Key]',
  //       amount: 100,
  //       currency: 'USD',
  //       customer: {
  //         email: 'customer-email@example.com',
  //       },
  //       payment_options: 'card',
  //     });
  //     // use payment link
  //     usePaymentLink(paymentLink);
  //   } catch (error) {
  //     // handle payment error
  //     displayError(error.message);
  //   }
  // };

  const paymentItems = cart.map(product => ({
    productId: product.id,
    productName: product.name,
    count: product.quantity,
    price: product.price,
  }));

  const {
    errors: checkoutErrors,
    actions,
    loading,
    data,
  } = useCheckoutController();
  const {checkoutError, orderError} = checkoutErrors;
  const {OrderData, checkoutData, initialValues, validationSchema} = data;
  const {handleCheckout, postOrder} = actions;
  const {
    isChecking,
    isCheckoutError,
    isCheckoutSuccess,
    isOrderError,
    isOrderSuccess,
    isOrderLoading,
  } = loading;
  useEffect(() => {
    if (isOrderError) {
      Toast.show({
        type: 'error',
        text1: orderError?.data?.message,
      });
    }
    if (isOrderSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Your order has been registered successfully',
      });
    }
  }, [isOrderError, isOrderSuccess, orderError, rollOutFun]);

  useEffect(() => {
    if (isCheckoutError) {
      Toast.show({
        type: 'error',
        text1: checkoutError?.data?.message,
      });
    }
    if (isCheckoutSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Your order has been checkout successfully',
      });
    }
  }, [checkoutError?.data?.message, isCheckoutError, isCheckoutSuccess]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('-----------------Submit formik');
      console.log(values);
      navigation.navigate('preview');
    },
  });
  const {values, handleChange, handleSubmit, errors} = formik;

  return (
    <View style={styles.container}>
      <CheckoutHeader />
      <View style={styles.location}>
        <Text style={{fontWeight: 'bold'}}>Confirm your location</Text>
        <View style={styles.decoContainer}>
          <View style={styles.deco} />
          <View style={styles.deco2} />
          <View style={styles.deco2} />
        </View>
      </View>

      <View style={styles.remain}>
        <TouchableOpacity onPress={() => setIsModal(true)}>
          {/* <LocationSelector /> */}
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            zIndex: 999,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 20,
            right: 0,

            width: '100%',
          }}>
          <GooglePlacesAutocomplete
            placeholder="Search location..."
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setAddress(data);
              // rollInFun();
              console.log(data);
              console.log('-------');
              console.log(details);
              //   setIsModal(true);
            }}
            query={{
              key: 'AIzaSyDBqbRu9jjh3kBFSXTH6bgp7cAt2_2M2x4',
              language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            minLength={2}
            enablePoweredByContainer={false}
            styles={{
              textInput: {
                height: 44,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 15,
                borderWidth: 1,
                borderColor: '#F1EFEF',
                backgroundColor: '#9694949f',
                color: '#000',
              },
              description: {
                color: 'black',
                backgroundColor: 'transparent',
              },
            }}
          />
        </View>

        <View>
          <View style={{marginTop: 35}} />

          <Input
            label=""
            onChange={handleChange('landMark')}
            value={values.landMark}
            placeholder="Land Mark (Optional)"
          />
          <Input
            label=""
            onChange={handleChange('apartmentFloor')}
            value={values.apartmentFloor}
            placeholder="Apartment Number / Floor Number"
            error={
              formik.touched.apartmentFloor && errors.apartmentFloor
                ? errors.apartmentFloor
                : ''
            }
          />
          <Input
            label=""
            value={values.houseNumber}
            onChange={handleChange('houseNumber')}
            placeholder="House Number"
            error={
              formik.touched.houseNumber && errors.houseNumber
                ? errors.houseNumber
                : ''
            }
          />

          <Input
            label=""
            onChange={handleChange('estate')}
            value={values.estate}
            placeholder="Estate"
            error={formik.touched.estate && errors.estate ? errors.estate : ''}
          />
        </View>

        <>
          <View style={{width: '100%', marginVertical: 20}}>
            <Button
              // onPress={() => navigation.navigate('CheckoutSuccess')}
              onPress={handleSubmit}
              style={{
                width: '80%',
                marginTop: 'auto',
                borderRadius: 40,
                marginBottom: 15,
              }}
              label="Proceed to checkout"
              isLoading={isOrderLoading}
            />

            <Button
              onPress={() => {
                handleCheckout({
                  userId: user?.id,
                  shippingAddress: 'Abuja road cbn',
                  orderId: OrderData?.orderId,
                });
              }}
              isLoading={isChecking}
              style={{
                width: '80%',
                marginTop: 'auto',
                borderRadius: 40,
              }}
              label="Checkokut"
              disabled={!isOrderSuccess}
            />

            {/* <PayWithFlutterwave
              onRedirect={handleOnRedirect}
              options={{
                tx_ref: '452342343+6243532_35353x000-09',
                authorization:
                  'FLWPUBK_TEST-e007e0538282acb39f0899d9c96fb3c2-X',
                customer: {
                  email: 'mujtabadamu@gmail.com',
                },
                amount: 2000,
                currency: 'NGN',
                payment_options: 'card',
              }}
              currency="NGN"
            /> */}
            <View>
              {address && (
                <>
                  <View style={styles.divider} />
                  <Previous
                    title={address?.description}
                    subtitle={address?.structured_formatting?.main_text}
                  />
                </>
              )}
            </View>
          </View>
        </>
      </View>
      <>
        <LocationModal modal={isModal} setModal={setIsModal} />
      </>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  decoContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  deco: {
    width: 40,
    height: 1,
    backgroundColor: '#F06D06',
    borderRadius: 5,
  },
  deco2: {
    width: 20,
    height: 1,
    backgroundColor: '#F7ECE1',
    marginLeft: 10,
  },
  remain: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    // height: Dimensions.get('window').height,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
});
