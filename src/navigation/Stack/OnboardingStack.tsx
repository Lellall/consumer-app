import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingHomeScreen from '../../screens/Onboarding/OnboardingHomeScreen';

const Onboarding = createStackNavigator();

export default function OnboardingStack() {
  return (
    <Onboarding.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Onboarding.Screen
        name="OnboardingHome"
        component={OnboardingHomeScreen}
      />
    </Onboarding.Navigator>
  );
}
