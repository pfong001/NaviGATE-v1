import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SW, C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";
import PromoCarousel from "../components/PromoCarousel";

export default function HomeScreen({ setScreen }) {
  const promos = [
    { tag: "NOW OPEN", title: "Escape Lounge T2", subtitle: "Premium lounge experience \u00b7 complimentary drinks & bites", bg: "#1a2d47" },
    { tag: "LIMITED TIME", title: "20% Off Duty Free", subtitle: "Save on fragrances, spirits & accessories before you fly", bg: "#2c1810", tagColor: "#ff9800" },
    { tag: "NEW EXHIBIT", title: "ONT Art Walk", subtitle: "Local artist showcase \u00b7 Terminal 2 & 4 corridors", bg: "#0d2818", tagColor: "#66bb6a" },
    { tag: "DEAL", title: "Pre-Book Parking $8/day", subtitle: "Save 40% when you reserve parking before arrival", bg: "#1a1030", tagColor: "#ab47bc" },
  ];
  const features = [
    { icon: "\uD83D\uDDFA\uFE0F", label: "Map", screen: "map" },
    { icon: "\u2708\uFE0F", label: "Flights", screen: "flights" },
    { icon: "\uD83D\uDEE1\uFE0F", label: "TSA", screen: "tsa" },
    { icon: "\uD83D\uDCB3", label: "Wallet", screen: "wallet" },
    { icon: "\uD83D\uDECD\uFE0F", label: "Duty Free", screen: "dutyfree" },
    { icon: "\uD83C\uDD7F\uFE0F", label: "Parking", screen: "parking" },
  ];
  const businesses = [
    { icon: "\u2615", name: "Starbucks", desc: "Coffee & pastries \u00b7 T2 Gate 204", hours: "5AM - 10PM" },
    { icon: "\uD83C\uDF57", name: "El Pollo Loco", desc: "Mexican grill \u00b7 T2 Food Court", hours: "6AM - 9PM" },
    { icon: "\uD83D\uDECB\uFE0F", name: "Escape Lounge", desc: "Premium lounge \u00b7 T2 Level 2", hours: "5:30AM - 10PM" },
    { icon: "\uD83D\uDCF0", name: "Hudson News", desc: "Snacks & essentials \u00b7 T4 Gate 401", hours: "4:30AM - 11PM" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <View style={hs.headerBox}>
        <View style={hs.headerRow}>
          <View>
            <Text style={hs.greeting}>Good morning {"\u2708"}</Text>
            <Text style={hs.airportName}>Ontario International Airport</Text>
          </View>
          <TouchableOpacity onPress={() => setScreen("profile")} style={hs.avatar}>
            <Text style={{ fontSize: 18 }}>{"\uD83D\uDC64"}</Text>
          </TouchableOpacity>
        </View>
        <View style={hs.searchBox}>
          <Text style={{ color: C.gray }}>{"\uD83D\uDD0D"}</Text>
          <Text style={{ color: C.gray, fontSize: 14, marginLeft: 8 }}>Search gates, food, lounges...</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <PromoCarousel items={promos} />
        <View style={hs.grid}>
          {features.map((f) => (
            <TouchableOpacity key={f.label} style={hs.gridItem} onPress={() => setScreen(f.screen)}>
              <Text style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</Text>
              <Text style={hs.gridLabel}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={hs.sectionTitle}>Near You</Text>
        {businesses.map((b) => (
          <View key={b.name} style={hs.bizCard}>
            <View style={hs.bizIcon}>
              <Text style={{ fontSize: 24 }}>{b.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={hs.bizName}>{b.name}</Text>
              <Text style={hs.bizDesc}>{b.desc}</Text>
              <Text style={hs.bizHours}>{b.hours}</Text>
            </View>
            <TouchableOpacity style={hs.navBtn} onPress={() => setScreen("map")}>
              <Text style={hs.navBtnText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const hs = StyleSheet.create({
  headerBox: { backgroundColor: C.navy, padding: 20, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16, alignItems: "center" },
  greeting: { color: C.white, fontSize: 20, fontWeight: "700" },
  airportName: { color: C.gray, fontSize: 13, marginTop: 2 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center" },
  searchBox: { backgroundColor: C.navyLight, borderRadius: 12, padding: 10, paddingHorizontal: 14, flexDirection: "row", alignItems: "center" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  gridItem: { width: (SW - 48) / 3, backgroundColor: C.white, borderRadius: 16, padding: 18, alignItems: "center", marginBottom: 12, borderWidth: 1, borderColor: "#eee", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  gridLabel: { fontSize: 12, fontWeight: "600", color: C.navy },
  sectionTitle: { fontSize: 16, color: C.navy, fontWeight: "700", marginBottom: 12, marginLeft: 4 },
  bizCard: { backgroundColor: C.white, borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#eee", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  bizIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center", marginRight: 14 },
  bizName: { fontWeight: "700", fontSize: 14, color: C.navy },
  bizDesc: { fontSize: 12, color: C.gray, marginTop: 2 },
  bizHours: { fontSize: 11, color: C.gold, marginTop: 4, fontWeight: "600" },
  navBtn: { backgroundColor: C.gold, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  navBtnText: { color: C.navy, fontSize: 12, fontWeight: "600" },
});
