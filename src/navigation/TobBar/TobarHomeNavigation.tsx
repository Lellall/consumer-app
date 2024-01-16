import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllScreens from "../../screens/MainApp/Home/TobBarScreens/AllScreens";
import Colors from "../../constants/Colors";
import CategoriesScreen from "../../screens/MainApp/Home/TobBarScreens/CategoriesScreen";

const Tab = createMaterialTopTabNavigator();

export default function TobarHomeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          borderColor: Colors.general.primary,
          borderWidth: 2,
        },
      }}
    >
      <Tab.Screen name="All" component={AllScreens} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Shops" component={CategoriesScreen} />
    </Tab.Navigator>
  );
}
