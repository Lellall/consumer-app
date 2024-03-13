import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import HomeScreen from '../../screens/MainApp/Home/HomeScreen';
import ShopDetail from '../../screens/MainApp/Shop/ShopDetail';
import AllCarts from '../../screens/MainApp/Cart/AllCarts';
import CheckoutScreen from '../../screens/MainApp/Checkout/CheckoutScreen';
import CheckOutSuccess from '../../screens/MainApp/Checkout/CheckOutSuccess';
import Product from '../../screens/MainApp/Product/Product';
import TrackOrderScreen from '../../screens/MainApp/Settings/Orders/TrackOrderScreen';
import CheckRider from '../../screens/MainApp/Checkout/CheckRider';
import CheckRiderSuccess from '../../screens/MainApp/Checkout/CheckRiderSuccess';

type HomeStackParamList = {
  HomeScreenIndex: undefined;
  CheckoutSuccess: {tansaction_id: number | string};
  Product: {id: string};
  Shop: undefined;
  Carts: undefined;
  Checkout: {total: number; navigation: any};
  Preview: undefined;
  CheckRider: {orderId: number | string};
  CheckRiderSuccess: {orderId: number | string; txtRef: string};
};
const HomeStack = createStackNavigator<HomeStackParamList>();

export type CheckoutSuccessProps = {
  route: RouteProp<HomeStackParamList, 'CheckoutSuccess'>;
};
export type CheckoutScreenProps = {
  route: RouteProp<HomeStackParamList, 'Checkout'>;
};

export default function HomeScreenStack() {
  // const {initiateOrder} = useSelector(uiSelector);
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreenIndex">
      <HomeStack.Screen name="HomeScreenIndex" component={HomeScreen} />
      <HomeStack.Screen name="Shop" component={ShopDetail} />
      <HomeStack.Screen name="Product" component={Product} />
      <HomeStack.Screen name="Carts" component={AllCarts} />
      <HomeStack.Screen name="Checkout" component={CheckoutScreen} />
      <HomeStack.Screen name="Preview" component={TrackOrderScreen} />

      <HomeStack.Screen name="CheckRider" component={CheckRider} />
      <HomeStack.Screen
        name="CheckRiderSuccess"
        component={CheckRiderSuccess}
      />

      <HomeStack.Screen name="CheckoutSuccess" component={CheckOutSuccess} />
    </HomeStack.Navigator>
  );
}
