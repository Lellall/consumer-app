import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const ParentStack = createStackNavigator();
import {NavigationContainer} from '@react-navigation/native';
import OnboardingStack from './Stack/OnboardingStack';
import AuthenticationStack from './Stack/AuthenticationStack';

import RNBootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import MainAppStack from './Stack/MainAppStack';
export default function ParentNavigation() {
  // const token = useSelector((state: RootState) => state.user.token);
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <ParentStack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}>
        <ParentStack.Screen name="Onboarding" component={OnboardingStack} />
        <ParentStack.Screen
          name="Authentication"
          component={AuthenticationStack}
        />
        <ParentStack.Screen name="MainApp" component={MainAppStack} />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
}
