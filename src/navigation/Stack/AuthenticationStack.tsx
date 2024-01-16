import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StatusScreen from "../../screens/Common/StatusScreen";
import OTPScreen from "../../screens/Authentication/OTPScreen";
import MainAuthScreen from "../../screens/Authentication/MainAuthScreen";

const Authentication = createStackNavigator();

export default function AuthenticationStack() {
  return (
    <Authentication.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Authentication.Screen name="Signup" component={MainAuthScreen} />

      <Authentication.Screen name="Success" component={StatusScreen} />
      <Authentication.Screen name="Otp" component={OTPScreen} />
    </Authentication.Navigator>
  );
}
