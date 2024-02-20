/* eslint-disable react-native/no-inline-styles */
import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {ArrowLeftIcon2, CartIcon} from '../../../assets/Svg/Index';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ProductCarousel from './components/ProductCarousel';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Buttons/Button';
import Toast from 'react-native-toast-message';
import {useGetProductQuery} from '../Shop/shop-api';
import LoadingState from '../../../components/LoadingState';
import {addToCart} from '../../../redux/cart/cartSlice';
import {useDispatch} from 'react-redux';

const Product = ({route, navigation}: {route: any; navigation: any}) => {
  const productId = route?.params?.id;
  const shopId = route?.params?.shopId;
  let params = {productId, shopId};
  const {data, isError, error, isLoading} = useGetProductQuery(params);
  console.log('shop id------', shopId);
  const dispatch = useDispatch();
  // const cart = useSelector(state => state.cart);
  // const shopName = cart[0]?.shop?.name;

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: `${error?.data?.message} || ${error?.message} || 'Something went wrong' `,
      });
    }
  }, [error?.data?.message, error?.message, isError]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{padding: 3}}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon2 />
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 3}}
          onPress={() => navigation.navigate('Carts')}>
          <CartIcon />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <LoadingState />
      ) : (
        <ScrollView>
          <View>
            <ProductCarousel imageUrl={data?.imageUrl} />
          </View>
          <View style={styles.main}>
            <View style={styles.mainHeader}>
              <View>
                <Text h1>{data?.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text h2>{data?.price}</Text>
                  <Text style={styles.discountPrice}>{data?.discount}</Text>
                </View>
              </View>
              <TouchableOpacity style={{padding: 10}}>
                {/* <ShareIcon2 /> */}
                {/* <Text>Height:{data?.height && data?.height}</Text>
                <Text>Width: {data?.width && data?.width}</Text>
                <Text>Weigth: {data?.weight && data?.weight}</Text> */}
              </TouchableOpacity>
            </View>
            <View style={styles.mainBody}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text h2>Item description:</Text>
                <Text style={styles.reviews}>58 Review</Text>
              </View>
              <View>
                <Text style={styles.itemBody}>{data?.description}</Text>
              </View>
              {/* <View style={styles.optContainer}>
                <View style={styles.optCard}>
                  <Text h3>Quantity</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: 96,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        // if (quantity > 1) {
                        //   dispatch(decreaseQuantity(props));
                        //   return;
                        // } else {
                        //   dispatch(removeFromCart(props));
                        //   return;
                        // }
                      }}
                      style={styles.add}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text h3>1</Text>
                    <TouchableOpacity
                      style={styles.add}
                      // onPress={() => dispatch(increaseQuantity(props))}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View> */}
            </View>
          </View>
          <View style={styles.footer}>
            {/* <Button
          label="Buy now"
          style={{marginBottom: 10, width: '70%', borderRadius: 50}}
        /> */}
            <Button
              label="Add to cart "
              style={{width: '70%', borderRadius: 50}}
              onPress={() => {
                // if (shopName === undefined || shopName === data?.shop?.name) {
                //@ts-expect-error
                dispatch(addToCart({...data, id: data.productId}));
                Toast.show({
                  type: 'success',
                  text1: `${data?.name} has been added to cart`,
                });

                // navigate.navigate('Carts');
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    minHeight: Dimensions.get('window').height,
  },

  header: {
    marginVertical: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  main: {
    marginTop: 30,
    // backgroundColor: 'red',
  },
  mainHeader: {
    minHeight: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    borderColor: '#0E5D37',
    borderBottomWidth: 1,
  },

  discountPrice: {
    color: '#000',
    fontFamily: 'Raleway',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  mainBody: {
    marginTop: 20,
    // backgroundColor: 'coral',
    marginHorizontal: 16,
  },

  reviews: {
    color: '#aaaa',
    fontSize: 12,
    fontWeight: '400',
  },
  itemBody: {
    color: '#121D2B99',
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 3,
  },

  optContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  add: {
    width: 30,
    height: 30,
    backgroundColor: '#F3F3F8',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optCard: {
    height: 61,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});
