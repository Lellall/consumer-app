import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import useColorScheme from "../hooks/useColorScheme";


export const getDeviceTheme = (_selectedTheme: string) => {
  const colorScheme = useColorScheme();
  if (_selectedTheme === "dark") return DarkTheme;
  else if (_selectedTheme === "light") return DefaultTheme;
  else {
    return colorScheme === "dark" ? DarkTheme : DefaultTheme;
  }
};

export const getAppTheme = (
  selectedTheme: "dark" | "light" | "system"
): "dark" | "light" => {
  const colorScheme = useColorScheme();
  return selectedTheme === "dark"
    ? "dark"
    : selectedTheme === "system"
    ? colorScheme
    : "light";
};

export type AppThemeType = "light" | "dark" | "system";
