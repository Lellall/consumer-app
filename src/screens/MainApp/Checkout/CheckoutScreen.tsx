/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import CheckoutHeader from './Components/CheckoutHeader';
import Text from '../../../components/Text/Text';
import LocationSelector from './Components/LocationSelector';
import Previous from './Components/Previous';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {clearCart} from '../../../redux/cart/cartSlice';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {MapImage} from '../../../assets/Images';
import Button from '../../../components/Buttons/Button';
interface RedirectParams {
  status: 'successful' | 'cancelled';
  transaction_id?: string;
  tx_ref: string;
}

/* An example function called when transaction is completed successfully or canceled */

/* An example function to generate a random transaction reference */
const generateTransactionRef = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `flw_tx_ref_${result}`;
};
// const handlePaymentRequest = async () => {
//   try {
//     // initialize payment
//     const paymentLink = await FlutterwaveInit({
//       tx_ref: generateTransactionRef(7),
//       authorization: 'FLWPUBK_TEST-e007e0538282acb39f0899d9c96fb3c2-X',
//       amount: 100,
//       currency: 'USD',
//       customer: {
//         email: 'mujtabadamu@gmail.com',
//       },
//       payment_options: 'card',
//       redirect_url: '',
//     });
//     // use payment link
//     // usePaymentLink(paymentLink);
//   } catch (error) {
//     // handle payment error
//     // displayError(error.message);
//     console.log(error);
//   }
// };

const CheckoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
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
        {/* <LocationSelector /> */}
        <View style={{flex: 1}}>
          <GooglePlacesAutocomplete
            placeholder="Search location..."
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
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
                backgroundColor: '#000000a1',
                color: '#000',
              },

              description: {
                color: 'black',
                backgroundColor: 'transparent',
              },
            }}
          />
        </View>

        {/* <View style={styles.divider} />
        <Previous />
        <Previous />
        <Button
          onPress={() => navigation.navigate('CheckoutSuccess')}
          style={{
            width: '80%',
            marginTop: 'auto',
            borderRadius: 40,
          }}
          label="Next"
        /> */}
        <View>
          <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: 'FLWPUBK_TEST-e007e0538282acb39f0899d9c96fb3c2-X',
              customer: {
                email: 'mujtabadamu@gmail.com',
              },
              amount: 2000,
              currency: 'NGN',
              payment_options: 'card',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    position: 'relative',
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
    // height: '50%',
    // top: 180,
    // left: 0,
    // right: 0,
    // position: 'absolute',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
});
