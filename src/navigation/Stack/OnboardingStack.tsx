import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingHomeScreen from '../../screens/Onboarding/OnboardingHomeScreen';

export type onboardingParam = {
  OnboardingHome: undefined;
};
const Onboarding = createStackNavigator<onboardingParam>();

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
