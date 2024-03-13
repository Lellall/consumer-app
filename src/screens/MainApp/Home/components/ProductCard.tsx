/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../../../../components/Text/Text';
import {CartIcon} from '../../../../assets/Svg/Index';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../../../redux/cart/cartSlice';
import Toast from 'react-native-toast-message';
import {ProductMini} from '../../Shop/shop-api';
import SummaryMessageModal from './SummaryMessageModal';
import {uiSelector} from '../../../../redux/ui';

const ProductCard = (props: ProductMini) => {
  const {imageUrl, name, price} = props;
  const navigate = useNavigation();
  // const cart = useSelector(state => state.cart);
  // const shopName = cart[0]?.shop?.name;

  const dispatch = useDispatch();
  const {initiateOrder} = useSelector(uiSelector);
  console.log('initiateOrder', initiateOrder);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addItemToCart = () => {
    // if (shopName === undefined || shopName === shop.name) {
    if (initiateOrder) {
      setIsModalOpen(true);
      return;
    }
    dispatch(addToCart(props));
    Toast.show({
      type: 'success',
      text1: `${name} has been added to cart`,
    });
    // }
    //  else {
    //   Toast.show({
    //     type: 'error',
    //     text1: `Sorry you can not add ${name} is not on the same shop`,
    //   });
    // }

    // navigate.navigate('Carts');
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigate.navigate('Product', {id: props.id, shopId: props.shop.id});
        }}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: imageUrl}}
          style={styles.image}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={addItemToCart} style={styles.cartButton}>
              <CartIcon color="#F06D06" />
            </TouchableOpacity>
            {/* <View style={styles.promoCard}>
            <Text
              style={{
                color: '#f06d06',
              }}>
              20% off
            </Text>
          </View> */}
          </View>
        </ImageBackground>
        <View style={{paddingHorizontal: 10, margin: 0}}>
          <Text style={{fontWeight: '700'}}>{name}</Text>
          <Text>₦ {price}</Text>
        </View>
      </TouchableOpacity>
      <SummaryMessageModal setModal={setIsModalOpen} modal={isModalOpen} />
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    // elevation: 2,
    padding: 4,
  },
  image: {
    width: '100%',
    flex: 1,
    marginVertical: 10,
    height: '100%',
  },
  promoCard: {
    backgroundColor: '#fff',
    height: 20,
    padding: 3,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButton: {
    height: 35,
    width: 35,
    backgroundColor: '#F3F3F8',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
