import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";
import ScreenHeader from "../components/ScreenHeader";

export default function FlightsScreen({ myFlight, setMyFlight, goHome }) {
  const [tab, setTab] = useState("departures");
  const [search, setSearch] = useState("");
  const [selFlight, setSelFlight] = useState(null);
  const flights = {
    departures: [
      { id: 1, num: "WN 1423", airline: "Southwest", dest: "Las Vegas (LAS)", gate: "204", time: "10:45 AM", status: "Boarding", color: C.gold },
      { id: 2, num: "UA 5521", airline: "United", dest: "San Francisco (SFO)", gate: "207", time: "11:30 AM", status: "On Time", color: C.green },
      { id: 3, num: "DL 2287", airline: "Delta", dest: "Atlanta (ATL)", gate: "401", time: "12:15 PM", status: "Delayed", color: C.red },
      { id: 4, num: "AA 3310", airline: "American", dest: "Dallas (DFW)", gate: "209", time: "1:00 PM", status: "On Time", color: C.green },
      { id: 5, num: "WN 738", airline: "Southwest", dest: "Denver (DEN)", gate: "202", time: "2:30 PM", status: "On Time", color: C.green },
      { id: 6, num: "F9 1182", airline: "Frontier", dest: "Phoenix (PHX)", gate: "405", time: "3:45 PM", status: "Delayed", color: C.red },
    ],
    arrivals: [
      { id: 7, num: "WN 2219", airline: "Southwest", from: "Seattle (SEA)", gate: "201", time: "10:20 AM", status: "Arrived", color: C.blue, carousel: "3" },
      { id: 8, num: "UA 1087", airline: "United", from: "Chicago (ORD)", gate: "206", time: "11:00 AM", status: "On Time", color: C.green, carousel: "5" },
      { id: 9, num: "DL 1543", airline: "Delta", from: "New York (JFK)", gate: "403", time: "12:45 PM", status: "Delayed", color: C.red, carousel: "2" },
    ],
  };
  const list = flights[tab].filter(
    (f) => !search || f.num.toLowerCase().includes(search.toLowerCase()) || f.airline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="KONT \u00b7 TODAY" subtitle="Ontario International Airport" goHome={goHome} />
      <View style={{ backgroundColor: C.navy, paddingHorizontal: 16, paddingBottom: 14 }}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          {["departures", "arrivals"].map((t) => (
            <TouchableOpacity key={t} onPress={() => setTab(t)} style={{ flex: 1, padding: 8, borderRadius: 10, backgroundColor: tab === t ? C.gold : C.navyLight, alignItems: "center" }}>
              <Text style={{ color: tab === t ? C.navy : C.gray, fontSize: 13, fontWeight: "600", textTransform: "capitalize" }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ backgroundColor: C.navyLight, borderRadius: 10, padding: 8, paddingHorizontal: 12, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: C.gray }}>{"\uD83D\uDD0D"}</Text>
          <TextInput style={{ flex: 1, color: C.white, fontSize: 13, marginLeft: 8 }} placeholder="Search flight, airline..." placeholderTextColor={C.gray} value={search} onChangeText={setSearch} />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        {myFlight && (
          <View style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 2, borderColor: C.gold }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ fontSize: 11, color: C.gold, fontWeight: "700" }}>{"\u2708"} MY FLIGHT</Text>
              <TouchableOpacity onPress={() => setMyFlight(null)}>
                <Text style={{ color: C.gray, fontSize: 12 }}>{"\u2715"} Remove</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: "700", fontSize: 15, color: C.navy }}>{myFlight.num} {"\u00b7"} {myFlight.airline}</Text>
            <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{myFlight.dest || myFlight.from} {"\u00b7"} Gate {myFlight.gate}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
              <View style={{ backgroundColor: myFlight.color + "22", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 }}>
                <Text style={{ fontSize: 11, color: myFlight.color, fontWeight: "700" }}>{myFlight.status}</Text>
              </View>
              <Text style={{ fontSize: 11, color: C.gray }}>{myFlight.time}</Text>
            </View>
          </View>
        )}
        {list.map((f) => (
          <TouchableOpacity key={f.id} onPress={() => setSelFlight(selFlight?.id === f.id ? null : f)} style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: selFlight?.id === f.id ? 2 : 1, borderColor: selFlight?.id === f.id ? C.gold : "#eee" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{f.num}</Text>
                <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{f.airline}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 13, fontWeight: "600", color: C.navy }}>{f.time}</Text>
                <View style={{ backgroundColor: f.color + "18", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginTop: 2 }}>
                  <Text style={{ fontSize: 11, color: f.color, fontWeight: "700" }}>{f.status}</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
              <Text style={{ fontSize: 12, color: C.gray }}>{tab === "departures" ? "To" : "From"}: {f.dest || f.from}</Text>
              <Text style={{ fontSize: 12, color: C.gray }}>Gate {f.gate}</Text>
            </View>
            {f.carousel && <Text style={{ fontSize: 11, color: C.blue, marginTop: 4 }}>{"\uD83E\uDDF3"} Baggage Carousel {f.carousel}</Text>}
            {selFlight?.id === f.id && (
              <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#eee", flexDirection: "row", gap: 8 }}>
                <TouchableOpacity onPress={() => { setMyFlight(f); setSelFlight(null); }} style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}>
                  <Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>Set as My Flight</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 10, alignItems: "center" }}>
                  <Text style={{ color: C.white, fontWeight: "600", fontSize: 12 }}>{"\uD83E\uDDED"} Navigate</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
