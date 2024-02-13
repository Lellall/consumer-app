import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';

const ParentStack = createStackNavigator();
import {NavigationContainer} from '@react-navigation/native';
import OnboardingStack from './Stack/OnboardingStack';
import AuthenticationStack from './Stack/AuthenticationStack';

import RNBootSplash from 'react-native-bootsplash';
import MainAppStack from './Stack/MainAppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

const Loading = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default function ParentNavigation() {
  // const token = useSelector((state: RootState) => state.user.token);
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkOnboarding();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <ParentStack.Navigator
        initialRouteName={viewedOnboarding ? 'Authentication' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
        }}>
        <ParentStack.Screen
          name="Authentication"
          component={AuthenticationStack}
        />

        <ParentStack.Screen name="MainApp" component={MainAppStack} />

        <ParentStack.Screen name="Onboarding" component={OnboardingStack} />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
}
