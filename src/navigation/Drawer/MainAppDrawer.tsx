import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/MainApp/Home/HomeScreen";

const Drawer = createDrawerNavigator();

export default function MainAppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
