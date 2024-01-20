import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {
  CartIcon,
  HeartIcon,
  HomeIcon,
  HomeIcon2,
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
} from '../../assets/Svg/Index';
import Colors from '../../constants/Colors';
import HomeScreenStack from '../Stack/HomeScreenStack';
import HomeScreen from '../../screens/MainApp/Home/HomeScreen';
import SettingsScreen from '../../screens/MainApp/Settings/SettingsScreen';
import SettingsScreenStack from '../Stack/SettingsScreenStack';
import Notifications from '../../screens/MainApp/Notifications/Notifications';
import Favourites from '../../screens/MainApp/Favourites/Favourites';
import AllCarts from '../../screens/MainApp/Cart/AllCarts';
const Tab = createBottomTabNavigator();
const MainAppBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // @ts-ignore
        tabBarStyle: {
          backgroundColor: '#fff',
        },

        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: Colors.general.secondary,
      }}
      initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarIcon: props => <HomeIcon2 {...props} />,
          tabBarLabel: 'Home',
        }}
        name="Home"
        component={HomeScreenStack}
      />
      {/* <Tab.Screen
        options={{
          tabBarIcon: props => <HeartIcon {...props} />,
          tabBarLabel: 'Wish List',
        }}
        name="WishList"
        component={Favourites}
      /> */}
      <Tab.Screen
        options={{
          tabBarIcon: props => <CartIcon {...props} />,
          tabBarLabel: 'Cart',
        }}
        name="carts"
        component={AllCarts}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <NotificationIcon {...props} />,
          tabBarLabel: 'Notifications',
        }}
        name="Notifications"
        component={Notifications}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <SettingsIcon {...props} />,
          tabBarLabel: 'Settings',
        }}
        name="Settings"
        component={SettingsScreenStack}
      />
    </Tab.Navigator>
  );
};

export default MainAppBottomTab;

const styles = StyleSheet.create({});
