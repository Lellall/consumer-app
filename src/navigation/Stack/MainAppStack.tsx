import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/MainApp/Home/HomeScreen';
import MainAppDrawer from '../Drawer/MainAppDrawer';
import MainAppBottomTab from '../BottomTab/MainAppBottomTab';
import AllCarts from '../../screens/MainApp/Cart/AllCarts';

const MainApp = createStackNavigator();

export default function MainAppStack() {
  return (
    <MainApp.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainApp.Screen name="MainHome" component={MainAppBottomTab} />
      {/* <MainApp.Screen name="Carts" component={AllCarts} /> */}
    </MainApp.Navigator>
  );
}
