/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CartHeader from './components/CartHeader';
import Text from '../../../components/Text/Text';
import CartItem from './components/CartItem';
import Button from '../../../components/Buttons/Button';
// import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Product} from '../Shop/shop-api';
import {EmptyState} from '../../../components/EmptyState';
import Toast from 'react-native-toast-message';
import {uiSelector} from '../../../redux/ui';
import {useFocusEffect} from '@react-navigation/native';
import useOpenCloseShop from '../../../hooks/useOpenCloseShop';
import ModalWrapper from '../../../components/ModalWrapper';
import {useUserSelector} from '../../../redux/user/userSlice';
import {useCartSelector} from '../../../redux/cart/cartSlice';

const AllCarts = ({navigation}) => {
  // const navigation = useNavigation();
  const cart = useCartSelector();
  const {user} = useUserSelector();
  const {isShopsClose} = useOpenCloseShop();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {initiateOrder, orderInfo} = useSelector(uiSelector);

  const total = cart?.reduce(
    (acc: number, currVal: {price: number; quantity: number}) =>
      acc + Number(currVal.price) * currVal.quantity,
    0,
  );
  //   useFocusEffect((
  //     if (initiateOrder) {
  //       navigation.navigate('CheckRider', {
  //         orderId: orderInfo?.orderId,
  //         totalAmount: orderInfo?.totalAmount,
  //       });
  //     }
  // ))

  useFocusEffect(
    React.useCallback(() => {
      if (initiateOrder) {
        navigation.navigate('CheckRider', {
          orderId: orderInfo?.orderId,
          totalAmount: orderInfo?.totalAmount,
        });
      }
    }, [initiateOrder, navigation, orderInfo?.orderId, orderInfo?.totalAmount]),
  );

  const handlePress = () => {
    if (isShopsClose) {
      setIsModalOpen(true);
      return;
    }

    if (user.trial) {
      Toast.show({
        type: 'error',
        text1: 'Registration is required before checkout',
      });
      navigation.navigate('Signup');
    } else {
      navigation.navigate('Checkout', {total: total});
    }
  };

  return (
    <>
      <View style={styles.container}>
        <CartHeader />
        {!cart.length ? (
          <EmptyState title={'No Product available'} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.content}
            style={styles.remain}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Product ({cart.length})</Text>
            </View>
            {/* <CartItem /> */}
            {cart?.map((item: React.JSX.IntrinsicAttributes & Product) => {
              return <CartItem key={item.id} {...item} />;
            })}

            <View style={styles.lable}>
              <Text>Subtotal</Text>
              <Text>₦ {total.toLocaleString('en-US')}</Text>
            </View>
            <View style={styles.lable}>
              <Text>Discount</Text>
              <Text>₦0</Text>
            </View>
            {/* <View style={styles.lable}>
            <Text>Delivery</Text>
            <Text>₦500</Text>
          </View> */}
            <Button
              fontStyle={{color: '#000'}}
              style={styles.button}
              label="Add discount code"
              disabled
            />
            <View style={styles.lable}>
              <Text h2>Grand Total</Text>
              <Text h2>₦ {total.toLocaleString('en-US')}</Text>
            </View>

            <Button
              onPress={handlePress}
              style={{
                width: '80%',
                marginTop: 20,
                borderRadius: 40,
              }}
              label="Next"
            />

            {/* <Text style={{marginVertical: 20}} h2>
            You may also like
          </Text> */}
          </ScrollView>
        )}
      </View>
      <>
        <ModalWrapper
          header={'We are currently closed'}
          body={
            'Our shop is closed for the day. We will resume our regular operating hours tomorrow at 10am until 5pm.'
          }
          open={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          children={<></>}
        />
      </>
    </>
  );
};

export default AllCarts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  remain: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  lable: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DFE2E8',
    marginTop: 20,
  },
});
