import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/MainApp/Home/HomeScreen';
import ProfileScreen from '../../screens/MainApp/Settings/ProfileScreen';
import SettingsScreen from '../../screens/MainApp/Settings/SettingsScreen';
import TrackOrderScreen from '../../screens/MainApp/Settings/TrackOrderScreen';
import OrderScreen from '../../screens/MainApp/Settings/OrderScreen';
import OrderDetails from '../../screens/MainApp/Settings/OrderDetails';

const SettingsStack = createStackNavigator();

export default function SettingsScreenStack() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SettingsScreenIndex">
      <SettingsStack.Screen
        name="SettingsScreenIndex"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="profile" component={ProfileScreen} />
      <SettingsStack.Screen name="myorders" component={OrderScreen} />
      <SettingsStack.Screen name="orderDetails" component={OrderDetails} />
      <SettingsStack.Screen name="trackOrder" component={TrackOrderScreen} />
    </SettingsStack.Navigator>
  );
}
