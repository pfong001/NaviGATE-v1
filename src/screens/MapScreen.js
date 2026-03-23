import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SW, C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";
import ScreenHeader from "../components/ScreenHeader";

export default function MapScreen({ myFlight, goHome }) {
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState(null);
  const [floor, setFloor] = useState(2);
  const cats = ["All", "Gates", "Dining", "Coffee", "Lounges", "TSA"];
  const locations = [
    { id: 1, n: "Gate 201", c: "Gates", f: 2, x: 0.25, y: 0.30, icon: "\uD83D\uDEAA" },
    { id: 2, n: "Gate 202", c: "Gates", f: 2, x: 0.40, y: 0.25, icon: "\uD83D\uDEAA" },
    { id: 3, n: "Starbucks", c: "Coffee", f: 2, x: 0.55, y: 0.55, icon: "\u2615", rating: "4.3", hours: "5AM-10PM" },
    { id: 4, n: "El Pollo Loco", c: "Dining", f: 2, x: 0.70, y: 0.40, icon: "\uD83C\uDF57", rating: "4.1", hours: "6AM-9PM" },
    { id: 5, n: "Escape Lounge", c: "Lounges", f: 2, x: 0.35, y: 0.65, icon: "\uD83D\uDECB\uFE0F", rating: "4.7", hours: "5:30AM-10PM" },
    { id: 6, n: "TSA Checkpoint A", c: "TSA", f: 1, x: 0.45, y: 0.45, icon: "\uD83D\uDEE1\uFE0F", wait: "12 min" },
    { id: 7, n: "Hudson News", c: "Dining", f: 2, x: 0.60, y: 0.70, icon: "\uD83D\uDCF0", rating: "3.9", hours: "4:30AM-11PM" },
    { id: 8, n: "Gate 401", c: "Gates", f: 2, x: 0.80, y: 0.55, icon: "\uD83D\uDEAA" },
  ];
  const filtered = locations.filter((l) => (cat === "All" || l.c === cat) && l.f === floor);
  const mapW = SW - 24;
  const mapH = myFlight ? 220 : 300;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title={"ONT Terminal \u00b7 Level " + floor} goHome={goHome} />
      <View style={{ backgroundColor: C.navy, paddingHorizontal: 16, paddingBottom: 14 }}>
        <View style={{ backgroundColor: C.navyLight, borderRadius: 10, padding: 8, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <Text style={{ color: C.gray }}>{"\uD83D\uDD0D"}</Text>
          <Text style={{ color: C.gray, fontSize: 13, marginLeft: 8 }}>Search gates, food...</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
          {cats.map((c) => (
            <TouchableOpacity key={c} onPress={() => { setCat(c); setSel(null); }} style={{ paddingVertical: 7, paddingHorizontal: 14, borderRadius: 20, backgroundColor: cat === c ? C.gold : C.navyLight }}>
              <Text style={{ color: cat === c ? C.navy : C.gray, fontSize: 12, fontWeight: "600" }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {myFlight && (
          <View style={{ margin: 12, marginBottom: 0, backgroundColor: C.white, borderRadius: 14, padding: 14, borderWidth: 2, borderColor: C.gold, shadowColor: C.gold, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <Text style={{ fontSize: 11, color: C.gold, fontWeight: "700" }}>{"\u2708"} MY FLIGHT</Text>
              <View style={{ backgroundColor: myFlight.color + "22", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ fontSize: 10, color: myFlight.color, fontWeight: "700" }}>{myFlight.status}</Text>
              </View>
            </View>
            <Text style={{ fontWeight: "700", fontSize: 15, color: C.navy }}>{myFlight.num} {"\u00b7"} {myFlight.airline}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <Text style={{ fontSize: 12, color: C.gray }}>{myFlight.dest || myFlight.from} {"\u00b7"} Gate {myFlight.gate}</Text>
              <Text style={{ fontSize: 12, color: C.navy, fontWeight: "600" }}>{myFlight.time}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 8, alignItems: "center" }}>
                <Text style={{ color: C.navy, fontWeight: "600", fontSize: 11 }}>{"\uD83E\uDDED"} Navigate to Gate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 8, alignItems: "center" }}>
                <Text style={{ color: C.white, fontWeight: "600", fontSize: 11 }}>{"\uD83C\uDFAB"} Boarding Pass</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ margin: 12, borderRadius: 16, backgroundColor: "#e8edf2", height: mapH, overflow: "hidden", borderWidth: 2, borderColor: "#d0d8e0", position: "relative" }}>
          <Text style={{ position: "absolute", top: 8, left: mapW * 0.18, fontSize: 11, color: C.gray, fontWeight: "600" }}>Terminal 2</Text>
          <Text style={{ position: "absolute", top: 8, right: mapW * 0.12, fontSize: 11, color: C.gray, fontWeight: "600" }}>Terminal 4</Text>
          <View style={{ position: "absolute", top: mapH * 0.15, left: mapW * 0.08, width: mapW * 0.38, height: mapH * 0.7, backgroundColor: "#d5dce4", borderRadius: 8, borderWidth: 1, borderColor: "#b0bcc8" }} />
          <View style={{ position: "absolute", top: mapH * 0.15, right: mapW * 0.08, width: mapW * 0.38, height: mapH * 0.7, backgroundColor: "#d5dce4", borderRadius: 8, borderWidth: 1, borderColor: "#b0bcc8" }} />
          <View style={{ position: "absolute", left: mapW * 0.30 - 7, top: mapH * 0.50 - 7, width: 14, height: 14, borderRadius: 7, backgroundColor: "#4285f4", borderWidth: 3, borderColor: C.white, shadowColor: "#4285f4", shadowOpacity: 0.4, shadowRadius: 6, elevation: 4 }} />
          {filtered.map((l) => (
            <TouchableOpacity key={l.id} onPress={() => setSel(sel?.id === l.id ? null : l)} style={{ position: "absolute", left: mapW * l.x - 18, top: mapH * l.y - 18, alignItems: "center", zIndex: sel?.id === l.id ? 10 : 1 }}>
              <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: sel?.id === l.id ? C.gold : C.navy, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 }}>
                <Text style={{ fontSize: 14 }}>{l.icon}</Text>
              </View>
              <Text style={{ fontSize: 8, color: C.navy, fontWeight: "600", marginTop: 1 }}>{l.n}</Text>
              {l.wait && (
                <View style={{ backgroundColor: "#e8f5e9", borderRadius: 6, paddingHorizontal: 4, paddingVertical: 1 }}>
                  <Text style={{ fontSize: 7, color: C.green, fontWeight: "700" }}>{l.wait}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          <View style={{ position: "absolute", right: 10, top: 10, backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 10, padding: 4, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
            {[3, 2, 1].map((f) => (
              <TouchableOpacity key={f} onPress={() => { setFloor(f); setSel(null); }} style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: floor === f ? C.gold : "transparent", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: floor === f ? C.navy : C.gray }}>L{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {sel && (
          <View style={{ margin: 12, marginTop: 0, backgroundColor: C.white, borderRadius: 16, padding: 16, borderWidth: 2, borderColor: C.gold, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                <Text style={{ fontSize: 24 }}>{sel.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700", fontSize: 15, color: C.navy }}>{sel.n}</Text>
                <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{sel.c} {"\u00b7"} Level {sel.f}</Text>
                {sel.rating && <Text style={{ fontSize: 12, color: C.gold, marginTop: 2 }}>{"\u2B50"} {sel.rating} {sel.hours ? "\u00b7 " + sel.hours : ""}</Text>}
                {sel.wait && <Text style={{ fontSize: 12, color: C.green, fontWeight: "600", marginTop: 2 }}>Wait: {sel.wait}</Text>}
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}>
                <Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>{"\uD83E\uDDED"} Navigate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 10, alignItems: "center" }}>
                <Text style={{ color: C.white, fontWeight: "600", fontSize: 12 }}>{"\u2139\uFE0F"} Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
