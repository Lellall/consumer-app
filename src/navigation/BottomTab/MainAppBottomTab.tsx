/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {
  CartIcon,
  HomeIcon2,
  NotificationIcon,
  SettingsIcon,
  UserIcon,
} from '../../assets/Svg/Index';
import Colors from '../../constants/Colors';
import HomeScreenStack from '../Stack/HomeScreenStack';
import SettingsScreenStack from '../Stack/SettingsScreenStack';
import Notifications from '../../screens/MainApp/Notifications/Notifications';
import AllCarts from '../../screens/MainApp/Cart/AllCarts';
import AuthenticationStack from '../Stack/AuthenticationStack';
import {useUserSelector} from '../../redux/user/userSlice';
import {useCartSelector} from '../../redux/cart/cartSlice';
const Tab = createBottomTabNavigator();
const MainAppBottomTab = () => {
  const cart = useCartSelector();
  const {user} = useUserSelector();

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
          tabBarBadge: cart.length > 0 && cart.length,
          tabBarBadgeStyle: {
            backgroundColor: cart.length > 0 ? '#0E5D37' : 'transparent',
            fontSize: 10,
            padding: 1.5,
          },
          tabBarIcon: props => <CartIcon {...props} />,
          tabBarLabel: 'Cart',
        }}
        name="carts"
        component={AllCarts}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <NotificationIcon />,
          tabBarLabel: 'Notifications',
        }}
        name="Notifications"
        component={Notifications}
      />
      {user?.trial ? (
        <Tab.Screen
          options={{
            tabBarIcon: () => <UserIcon />,
            tabBarLabel: 'Login',
          }}
          name={'Authentication'}
          component={AuthenticationStack}
        />
      ) : (
        <Tab.Screen
          options={{
            tabBarIcon: props => <SettingsIcon {...props} />,
            tabBarLabel: 'Settings',
          }}
          name={'Settings'}
          component={SettingsScreenStack}
        />
      )}
    </Tab.Navigator>
  );
};

export default MainAppBottomTab;
