import { Dimensions, Platform, StatusBar } from "react-native";

export const SW = Dimensions.get("window").width;
export const STATUSBAR_H = Platform.OS === "ios" ? 50 : StatusBar.currentHeight || 30;

export const C = {
  navy: "#0c1b2e",
  navyLight: "#1a2d47",
  gold: "#c9a84c",
  goldBg: "#fdf8ec",
  white: "#fff",
  gray: "#8899aa",
  grayLight: "#e8ecf0",
  bg: "#f4f5f7",
  green: "#0a7c4f",
  red: "#d32f2f",
  blue: "#1976d2",
  orange: "#f57c00",
};
