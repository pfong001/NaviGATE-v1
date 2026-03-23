import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";
import ScreenHeader from "../components/ScreenHeader";

export default function ParkingScreen({ goHome }) {
  const [selLot, setSelLot] = useState(null);
  const [booked, setBooked] = useState(null);
  const lots = [
    { id: 1, name: "Lot A \u2014 Terminal 2", type: "Short-Term", rate: "$3/hr", daily: "$24/day", spots: 142, total: 400, distance: "2 min walk", icon: "\uD83C\uDD7F\uFE0F" },
    { id: 2, name: "Lot B \u2014 Terminal 4", type: "Short-Term", rate: "$3/hr", daily: "$24/day", spots: 89, total: 350, distance: "3 min walk", icon: "\uD83C\uDD7F\uFE0F" },
    { id: 3, name: "Lot C \u2014 Economy", type: "Long-Term", rate: "$2/hr", daily: "$14/day", spots: 523, total: 1200, distance: "8 min shuttle", icon: "\uD83D\uDE8C" },
    { id: 4, name: "Lot D \u2014 Economy", type: "Long-Term", rate: "$2/hr", daily: "$12/day", spots: 671, total: 1000, distance: "10 min shuttle", icon: "\uD83D\uDE8C" },
    { id: 5, name: "Premium Valet", type: "Valet", rate: "$5/hr", daily: "$45/day", spots: 18, total: 50, distance: "Terminal drop-off", icon: "\uD83D\uDD11" },
  ];
  const getAvailColor = (spots, total) => {
    const pct = spots / total;
    return pct > 0.3 ? C.green : pct > 0.1 ? C.orange : C.red;
  };
  const getAvailLabel = (spots, total) => {
    const pct = spots / total;
    return pct > 0.3 ? "Available" : pct > 0.1 ? "Filling Up" : "Almost Full";
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="Parking" subtitle="Pre-book or pay for parking" goHome={goHome} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 14 }}>
          {[{ l: "Best Rate", v: "$12/day", c: C.green }, { l: "Total Open", v: "1,443", c: C.blue }, { l: "Pre-Book", v: "Save 40%", c: C.gold }].map((s) => (
            <View key={s.l} style={{ flex: 1, backgroundColor: C.white, borderRadius: 12, padding: 10, alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "800", color: s.c }}>{s.v}</Text>
              <Text style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.l}</Text>
            </View>
          ))}
        </View>
        {booked && (
          <View style={{ backgroundColor: C.white, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: C.gold }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ fontSize: 11, color: C.gold, fontWeight: "700" }}>{"\uD83C\uDD7F\uFE0F"} ACTIVE PARKING</Text>
              <View style={{ backgroundColor: "#e8f5e9", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ fontSize: 10, color: C.green, fontWeight: "700" }}>CONFIRMED</Text>
              </View>
            </View>
            <Text style={{ fontWeight: "700", fontSize: 15, color: C.navy }}>{booked.name}</Text>
            <Text style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>Booked at {booked.daily} {"\u00b7"} {booked.distance}</Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}>
                <Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>{"\uD83E\uDDED"} Navigate to Lot</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 10, alignItems: "center" }}>
                <Text style={{ color: C.white, fontWeight: "600", fontSize: 12 }}>{"\u23F1"} Extend Time</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginBottom: 10, marginLeft: 4 }}>Available Lots</Text>
        {lots.map((lot) => {
          const avColor = getAvailColor(lot.spots, lot.total);
          const avLabel = getAvailLabel(lot.spots, lot.total);
          const isSelected = selLot?.id === lot.id;
          return (
            <TouchableOpacity key={lot.id} onPress={() => setSelLot(isSelected ? null : lot)} style={{ backgroundColor: C.white, borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: isSelected ? 2 : 1, borderColor: isSelected ? C.gold : "#eee" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <Text style={{ fontSize: 22 }}>{lot.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{lot.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <View style={{ backgroundColor: avColor + "18", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                      <Text style={{ fontSize: 10, color: avColor, fontWeight: "700" }}>{avLabel} {"\u00b7"} {lot.spots} spots</Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 15, fontWeight: "800", color: C.gold }}>{lot.daily}</Text>
                  <Text style={{ fontSize: 10, color: C.gray }}>{lot.rate}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <Text style={{ fontSize: 11, color: C.gray }}>{"\uD83D\uDCCD"} {lot.distance}</Text>
                <Text style={{ fontSize: 11, color: C.gray }}>{lot.type}</Text>
              </View>
              <View style={{ height: 4, backgroundColor: C.grayLight, borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
                <View style={{ width: ((lot.spots / lot.total) * 100) + "%", height: "100%", backgroundColor: avColor, borderRadius: 2 }} />
              </View>
              {isSelected && (
                <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#eee" }}>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity onPress={() => { setBooked(lot); setSelLot(null); }} style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 12, alignItems: "center" }}>
                      <Text style={{ color: C.navy, fontWeight: "700", fontSize: 13 }}>Pre-Book Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setBooked(lot); setSelLot(null); }} style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 12, alignItems: "center" }}>
                      <Text style={{ color: C.white, fontWeight: "700", fontSize: 13 }}>Pay Now</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "center", gap: 16, marginTop: 10 }}>
                    <Text style={{ fontSize: 11, color: C.gray }}>{"\uD83D\uDCB3"} Saved Card</Text>
                    <Text style={{ fontSize: 11, color: C.gray }}>{"\uF8FF"} Apple Pay</Text>
                    <Text style={{ fontSize: 11, color: C.gray }}>{"\u25B6"} Google Pay</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
