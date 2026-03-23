import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";
import ScreenHeader from "../components/ScreenHeader";

export default function TicketScreen({ myFlight, setMyFlight, goHome }) {
  const [scanMode, setScanMode] = useState(false);

  if (myFlight) return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="My Boarding Pass" subtitle="Show this at the gate" goHome={goHome} />
      <ScrollView contentContainerStyle={{ padding: 16, alignItems: "center" }}>
        <View style={{ width: "100%", backgroundColor: C.white, borderRadius: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 12, elevation: 6 }}>
          <View style={{ backgroundColor: C.navy, padding: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: C.gold, fontSize: 12, fontWeight: "700" }}>BOARDING PASS</Text>
              <Text style={{ color: C.gray, fontSize: 11 }}>{myFlight.airline}</Text>
            </View>
            <Text style={{ color: C.white, fontSize: 28, fontWeight: "800", marginTop: 8 }}>{myFlight.num}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
              <View>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>FROM</Text>
                <Text style={{ color: C.white, fontSize: 22, fontWeight: "800" }}>ONT</Text>
                <Text style={{ color: C.gray, fontSize: 11 }}>Ontario, CA</Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 24 }}>{"\u2708\uFE0F"}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>TO</Text>
                <Text style={{ color: C.white, fontSize: 22, fontWeight: "800" }}>{(myFlight.dest || myFlight.from || "").match(/\((\w+)\)/)?.[1] || "---"}</Text>
                <Text style={{ color: C.gray, fontSize: 11 }}>{(myFlight.dest || myFlight.from || "").replace(/\s*\(\w+\)/, "")}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: -1 }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: C.bg, marginLeft: -10 }} />
            <View style={{ flex: 1, borderTopWidth: 2, borderStyle: "dashed", borderColor: C.grayLight }} />
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: C.bg, marginRight: -10 }} />
          </View>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <View>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>GATE</Text>
                <Text style={{ color: C.navy, fontSize: 20, fontWeight: "800" }}>{myFlight.gate}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>TIME</Text>
                <Text style={{ color: C.navy, fontSize: 20, fontWeight: "800" }}>{myFlight.time}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>SEAT</Text>
                <Text style={{ color: C.navy, fontSize: 20, fontWeight: "800" }}>14A</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <View>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>CLASS</Text>
                <Text style={{ color: C.navy, fontSize: 14, fontWeight: "600" }}>Economy</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>STATUS</Text>
                <View style={{ backgroundColor: myFlight.color + "18", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 2, marginTop: 2 }}>
                  <Text style={{ fontSize: 12, color: myFlight.color, fontWeight: "700" }}>{myFlight.status}</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>ZONE</Text>
                <Text style={{ color: C.navy, fontSize: 14, fontWeight: "600" }}>3</Text>
              </View>
            </View>
            <View style={{ backgroundColor: C.white, borderRadius: 12, padding: 16, alignItems: "center", borderWidth: 2, borderColor: C.grayLight }}>
              <View style={{ width: 140, height: 140, backgroundColor: C.navy, borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: C.white, fontSize: 10, textAlign: "center", padding: 10 }}>QR CODE{"\n"}{myFlight.num}{"\n"}GATE {myFlight.gate}</Text>
                <View style={{ position: "absolute", top: 10, left: 10, width: 20, height: 20, borderTopWidth: 3, borderLeftWidth: 3, borderColor: C.gold }} />
                <View style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderTopWidth: 3, borderRightWidth: 3, borderColor: C.gold }} />
                <View style={{ position: "absolute", bottom: 10, left: 10, width: 20, height: 20, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: C.gold }} />
                <View style={{ position: "absolute", bottom: 10, right: 10, width: 20, height: 20, borderBottomWidth: 3, borderRightWidth: 3, borderColor: C.gold }} />
              </View>
              <Text style={{ fontSize: 11, color: C.gray, marginTop: 8 }}>Scan at gate for boarding</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => setMyFlight(null)} style={{ marginTop: 16, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#ffcdd2", backgroundColor: "#fff5f5", width: "100%", alignItems: "center" }}>
          <Text style={{ color: C.red, fontSize: 14, fontWeight: "600" }}>Remove Boarding Pass</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="Boarding Pass" subtitle="Scan or set your flight" goHome={goHome} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 32 }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 44 }}>{"\uD83C\uDFAB"}</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: "700", color: C.navy, textAlign: "center" }}>No Boarding Pass</Text>
        <Text style={{ fontSize: 13, color: C.gray, textAlign: "center", marginTop: 8, lineHeight: 20 }}>Scan your boarding pass barcode or set your flight from the Flights tab</Text>
        <TouchableOpacity onPress={() => setScanMode(true)} style={{ backgroundColor: C.gold, borderRadius: 12, padding: 14, paddingHorizontal: 32, marginTop: 24 }}>
          <Text style={{ color: C.navy, fontSize: 15, fontWeight: "700" }}>{"\uD83D\uDCF7"} Scan Boarding Pass</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, color: C.gray, marginTop: 12 }}>or go to Flights {"\u2192"} Set as My Flight</Text>
      </View>
      {scanMode && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center", padding: 32 }}>
          <View style={{ width: 240, height: 240, borderWidth: 3, borderColor: C.gold, borderRadius: 16, alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <View style={{ position: "absolute", top: -2, left: -2, width: 30, height: 30, borderTopWidth: 4, borderLeftWidth: 4, borderColor: C.gold, borderTopLeftRadius: 16 }} />
            <View style={{ position: "absolute", top: -2, right: -2, width: 30, height: 30, borderTopWidth: 4, borderRightWidth: 4, borderColor: C.gold, borderTopRightRadius: 16 }} />
            <View style={{ position: "absolute", bottom: -2, left: -2, width: 30, height: 30, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: C.gold, borderBottomLeftRadius: 16 }} />
            <View style={{ position: "absolute", bottom: -2, right: -2, width: 30, height: 30, borderBottomWidth: 4, borderRightWidth: 4, borderColor: C.gold, borderBottomRightRadius: 16 }} />
            <Text style={{ color: C.white, fontSize: 14, textAlign: "center" }}>{"\uD83D\uDCF7"}{"\n\n"}Point camera at{"\n"}boarding pass barcode</Text>
          </View>
          <TouchableOpacity onPress={() => {
            setScanMode(false);
            setMyFlight({ id: 99, num: "WN 1423", airline: "Southwest", dest: "Las Vegas (LAS)", gate: "204", time: "10:45 AM", status: "Boarding", color: C.gold });
          }} style={{ backgroundColor: C.gold, borderRadius: 12, padding: 14, paddingHorizontal: 32, marginBottom: 12 }}>
            <Text style={{ color: C.navy, fontSize: 15, fontWeight: "700" }}>Simulate Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScanMode(false)}>
            <Text style={{ color: C.white, fontSize: 14 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
