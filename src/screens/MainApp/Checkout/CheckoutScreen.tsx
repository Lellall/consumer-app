/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckoutHeader from './Components/CheckoutHeader';
import Text from '../../../components/Text/Text';
import Previous from './Components/Previous';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
// import {MapImage} from '../../../assets/Images';
import Button from '../../../components/Buttons/Button';
import {Product} from '../Shop/shop-api';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import useCheckoutController from './useCheckoutController';
import Input from '../../../components/Inputs/Input';
import {useFormik} from 'formik';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {CheckoutScreenProps} from '../../../navigation/Stack/HomeScreenStack';
import {calculateDistance} from '../../../utils/utils';
import Geocoder from 'react-native-geocoding';
import {setInitiateOrder, setOrderInfo} from '../../../redux/ui';
import {GOOGLEPLACEKEY} from '@env';

Geocoder.init(GOOGLEPLACEKEY); // use a valid API key

const CheckoutScreen = ({route, navigation}: CheckoutScreenProps) => {
  const {total} = route.params;
  const cart = useSelector(state => state?.cart);
  const [address, setAddress] = useState<null | any>(null);
  const [longLatitude, setLongLatitude] = useState({});
  const dispatch = useDispatch();
  const paymentItems = cart.map((product: Product) => ({
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
  const {orderError} = checkoutErrors;
  const {OrderData, initialValues, validationSchema} = data;
  const {postOrder} = actions;
  const {isCheckingOut, isOrderError, isOrderSuccess, isOrderLoading} = loading;

  console.log('------------------------');
  console.log('orderError?', orderError);
  useEffect(() => {
    if (isOrderError) {
      Toast.show({
        type: 'error',
        text1: orderError?.data?.message || orderError.data[0],
      });
      return;
    }
    if (isOrderSuccess) {
      // handleCheckout();
      navigation.replace('CheckRider', {
        orderId: OrderData.orderId,
        totalAmount: total,
      });
      dispatch(setInitiateOrder(true));
      dispatch(setOrderInfo({orderId: OrderData.orderId, totalAmount: total}));
      Toast.show({
        type: 'success',
        text1: 'Your order has been registered successfully',
      });
    }
  }, [
    OrderData?.orderId,
    dispatch,
    isOrderError,
    isOrderSuccess,
    navigation,
    orderError,
    total,
  ]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      // navigation.navigate('Preview');
      // handleOrder(values);
      postOrder({
        paymentItems,
        address: {
          streetName: address?.structured_formatting?.main_text,
          houseNumber: values.houseNumber,
          apartmentName: values.apartmentFloor,
          estate: values.estate,
          poBox: '38101',
        },
        deliveryPoint: longLatitude,
        distance: calculateDistance(
          undefined,
          undefined,
          longLatitude?.latitude,
          longLatitude?.longitude,
        ),
        consumerPhoneNumber: values.consumerPhoneNumber,
      });
    },
  });
  const {values, handleChange, handleSubmit, errors} = formik;

  function ConvertAddress(address: string) {
    // Search by address
    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log('Location', location);
        setLongLatitude({
          longitude: location.lng,
          latitude: location.lat,
        });
      })
      .catch(error => console.warn(error));
  }

  useEffect(() => {
    if (address) {
      ConvertAddress(address?.description);
    }
  }, [address]);

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
        <View
          style={{
            flex: 1,
            zIndex: 999,
            // backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 20,
            right: 0,
            width: '100%',
          }}>
          <GooglePlacesAutocomplete
            placeholder="Enter location"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setAddress(data);
              // rollInFun();
              //   setIsModal(true);
            }}
            query={{
              key: GOOGLEPLACEKEY,
              language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            minLength={2}
            enablePoweredByContainer={false}
            styles={{
              textInput: {
                // height: 50,
                borderRadius: 3,
                paddingVertical: 5,
                paddingHorizontal: 20,
                fontSize: 15,
                borderWidth: 1,
                borderColor: '#F1EFEF',
                backgroundColor: '#bababa9f',
                color: '#000',
                width: '90%',
                // backgroundColor: 'transparent',
                height: 48,
                fontFamily: 'Poppins-Regular',
                // elevation: 1,
              },
              description: {
                color: 'black',
                backgroundColor: 'transparent',
              },
            }}
          />
        </View>

        <View>
          <View style={{marginTop: 45}} />
          <Input
            label=""
            onChange={handleChange('consumerPhoneNumber')}
            value={values.consumerPhoneNumber}
            placeholder="Phone number"
            type="number-pad"
            error={errors.consumerPhoneNumber ? errors.consumerPhoneNumber : ''}
          />
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
              onPress={handleSubmit}
              style={{
                width: '80%',
                marginTop: 'auto',
                borderRadius: 40,
                marginBottom: 15,
              }}
              label="Proceed to checkout"
              isLoading={isOrderLoading || isCheckingOut}
              disabled={!address}
            />

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
