import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import HomeScreen from '../../screens/MainApp/Home/HomeScreen';
import ShopDetail from '../../screens/MainApp/Shop/ShopDetail';
import AllCarts from '../../screens/MainApp/Cart/AllCarts';
import CheckoutScreen from '../../screens/MainApp/Checkout/CheckoutScreen';
import CheckOutSuccess from '../../screens/MainApp/Checkout/CheckOutSuccess';

type HomeStackParamList = {
  HomeScreenIndex: undefined;
  CheckoutSuccess: { tansaction_id: number | string };
};
const HomeStack = createStackNavigator<HomeStackParamList>();

export type CheckoutSuccessProps = {
  route: RouteProp<HomeStackParamList, 'CheckoutSuccess'>;
};

export default function HomeScreenStack() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreenIndex">
      <HomeStack.Screen name="HomeScreenIndex" component={HomeScreen} />
      <HomeStack.Screen name="Shop" component={ShopDetail} />
      <HomeStack.Screen name="Carts" component={AllCarts} />
      <HomeStack.Screen name="Checkout" component={CheckoutScreen} />
      <HomeStack.Screen name="CheckoutSuccess" component={CheckOutSuccess} />
    </HomeStack.Navigator>
  );
}
