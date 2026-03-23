import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";
import ScreenHeader from "../components/ScreenHeader";

export default function WalletScreen({ goHome }) {
  const [selCard, setSelCard] = useState(null);
  const cards = [
    { id: 1, name: "Amex Platinum", last4: "4821", bg: "#666", perks: ["Centurion Lounge Access", "Priority Pass", "$200 Airline Credit"], icon: "\uD83D\uDC8E" },
    { id: 2, name: "Chase Sapphire Reserve", last4: "7733", bg: "#1a237e", perks: ["Priority Pass", "3x Travel Points", "$300 Travel Credit"], icon: "\uD83D\uDD37" },
    { id: 3, name: "Capital One Venture X", last4: "5592", bg: "#333", perks: ["Capital One Lounge", "Priority Pass", "10x Hotels"], icon: "\uD83C\uDFE6" },
  ];
  const lounges = [
    { name: "Escape Lounge", access: true, via: "Amex Platinum", icon: "\uD83D\uDECB\uFE0F" },
    { name: "USO Lounge", access: true, via: "Military ID", icon: "\uD83C\uDDFA\uD83C\uDDF8" },
    { name: "Delta Sky Club", access: false, requires: "Delta Reserve Card", icon: "\uD83D\uDD35" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="My Wallet" subtitle="Cards & lounge access" goHome={goHome} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginBottom: 10, marginLeft: 4 }}>My Cards</Text>
        {cards.map((c) => (
          <TouchableOpacity key={c.id} onPress={() => setSelCard(selCard?.id === c.id ? null : c)} style={{ backgroundColor: c.bg, borderRadius: 16, padding: 18, marginBottom: 10, borderWidth: selCard?.id === c.id ? 2 : 0, borderColor: C.gold }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 22 }}>{c.icon}</Text>
              <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{"\u2022\u2022\u2022\u2022"} {c.last4}</Text>
            </View>
            <Text style={{ color: C.white, fontSize: 15, fontWeight: "700", marginTop: 16 }}>{c.name}</Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4 }}>Mar 2026</Text>
            {selCard?.id === c.id && (
              <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.2)" }}>
                <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 6, fontWeight: "600" }}>PERKS</Text>
                {c.perks.map((p) => (
                  <Text key={p} style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", paddingVertical: 3 }}>{"\u2713"} {p}</Text>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginTop: 8, marginBottom: 10, marginLeft: 4 }}>Lounge Access</Text>
        {lounges.map((l) => (
          <View key={l.name} style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 8, flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: l.access ? "#e8f5e9" : "#ffebee", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
              <Text style={{ fontSize: 20 }}>{l.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{l.name}</Text>
              {l.access ? (
                <Text style={{ fontSize: 12, color: C.green, fontWeight: "600", marginTop: 2 }}>{"\u2705"} Access Granted {"\u00b7"} via {l.via}</Text>
              ) : (
                <Text style={{ fontSize: 12, color: C.red, marginTop: 2 }}>{"\uD83D\uDD12"} Requires: {l.requires}</Text>
              )}
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
