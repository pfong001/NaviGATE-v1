import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { C } from "../constants/theme";

export default function ScreenHeader({ title, subtitle, goHome }) {
  return (
    <View style={{ backgroundColor: C.navy, padding: 16, paddingBottom: subtitle ? 14 : 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity
          onPress={goHome}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: C.navyLight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: C.gold, fontSize: 16 }}>{"\u2190"}</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ color: C.white, fontSize: 18, fontWeight: "700" }}>
            {title}
          </Text>
          {subtitle && (
            <Text style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
