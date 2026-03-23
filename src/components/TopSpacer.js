import React from "react";
import { View } from "react-native";
import { STATUSBAR_H, C } from "../constants/theme";

export default function TopSpacer() {
  return <View style={{ height: STATUSBAR_H, backgroundColor: C.navy }} />;
}
