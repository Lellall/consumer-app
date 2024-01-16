import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Text from '../../../../components/Text/Text';
import { CartIcon } from '../../../../assets/Svg/Index';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../shop-api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../redux/cart/cartSlice';
import Toast from 'react-native-toast-message';

const ProductItem = (props: Product) => {
  const { imageUrl, name, price, description, shop } = props;
  const navigate = useNavigation();
  const cart = useSelector((state) => state.cart);
  const shopName = cart[0]?.shop?.name;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text>{name}</Text>
        <Text h3>₦{price}</Text>
        <Text style={{ fontSize: 10, textAlign: 'justify' }}>
          {description}
        </Text>
      </View>

      <View style={styles.cart}>
        <TouchableOpacity
          onPress={() => {
            if (shopName === undefined || shopName === shop.name) {
              dispatch(addToCart(props));
              Toast.show({
                type: 'success',
                text1: `${name} has been added to cart`,
              });
            } else {
              Toast.show({
                type: 'error',
                text1: `Sorry you can not add ${name} is not on the same shop`,
              });
            }

            // navigate.navigate('Carts');
          }}
          style={styles.cartButton}>
          <CartIcon color="#F06D06" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,

    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    // height: 80,
    // backgroundColor: 'green',
  },
  cart: {
    height: '100%',
    width: 100,

    justifyContent: 'center',
    alignItems: 'center',
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
