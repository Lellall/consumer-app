import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../../screens/MainApp/Home/HomeScreen';
import React from 'react';

const Drawer = createDrawerNavigator();
export default function MainAppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
