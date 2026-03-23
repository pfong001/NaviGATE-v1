import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";

export default function ProfileScreen({ setScreen }) {
  const [sub, setSub] = useState(null);
  const [homeAirport, setHomeAirport] = useState("ONT");
  const [prefAirline, setPrefAirline] = useState("Southwest");
  const [ffNumbers, setFfNumbers] = useState([{ airline: "Southwest", number: "RR-48291037" }]);
  const [programs, setPrograms] = useState([{ name: "TSA PreCheck", id: "KTN-938172", verified: true }]);
  const [savedCards, setSavedCards] = useState([
    { id: 1, name: "Amex Platinum", last4: "4821", type: "Amex", exp: "08/27", isDefault: true },
    { id: 2, name: "Chase Sapphire Reserve", last4: "7733", type: "Visa", exp: "03/28", isDefault: false },
    { id: 3, name: "Capital One Venture X", last4: "5592", type: "Visa", exp: "11/26", isDefault: false },
  ]);
  const stats = [
    { l: "Reward Pts", v: "340", icon: "\uD83C\uDFC6" },
    { l: "Flights", v: "12", icon: "\u2708\uFE0F" },
    { l: "Orders", v: "8", icon: "\uD83D\uDED2" },
  ];
  const menuItems = [
    { label: "Rewards", icon: "\uD83C\uDFC6", key: "rewards" },
    { label: "Order History", icon: "\uD83D\uDCCB", key: "orders" },
    { label: "Saved Cards", icon: "\uD83D\uDCB3", key: "cards" },
    { label: "Travel Preferences", icon: "\uD83C\uDF0D", key: "travel" },
    { label: "Settings", icon: "\u2699\uFE0F", key: "settings" },
  ];

  const SubHeader = ({ title }) => (
    <View style={{ backgroundColor: C.navy, padding: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
      <TouchableOpacity onPress={() => setSub(null)}>
        <Text style={{ color: C.gold, fontSize: 18 }}>{"\u2190"}</Text>
      </TouchableOpacity>
      <Text style={{ color: C.white, fontSize: 18, fontWeight: "700" }}>{title}</Text>
    </View>
  );

  if (sub === "rewards") return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <SubHeader title="My Rewards" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ backgroundColor: C.white, borderRadius: 16, padding: 20, alignItems: "center", marginBottom: 16 }}>
          <Text style={{ fontSize: 36, fontWeight: "800", color: C.gold }}>340</Text>
          <Text style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>points earned</Text>
          <View style={{ width: "100%", height: 10, backgroundColor: C.grayLight, borderRadius: 8, marginTop: 12, overflow: "hidden" }}>
            <View style={{ width: "57%", height: "100%", backgroundColor: C.gold, borderRadius: 8 }} />
          </View>
          <Text style={{ fontSize: 11, color: C.gray, marginTop: 6 }}>340 / 600 pts to next reward</Text>
        </View>
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginBottom: 10 }}>How to Earn</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <Text style={{ fontSize: 13, color: C.navy, marginBottom: 6 }}>{"\uD83D\uDED2"} <Text style={{ fontWeight: "700" }}>10 pts</Text> per order</Text>
          <Text style={{ fontSize: 13, color: C.navy, marginBottom: 6 }}>{"\uD83D\uDD04"} <Text style={{ fontWeight: "700" }}>+2 pts</Text> reorder bonus</Text>
          <Text style={{ fontSize: 13, color: C.navy }}>{"\uD83D\uDD25"} <Text style={{ fontWeight: "700" }}>2x pts</Text> streak bonus (3+ orders)</Text>
        </View>
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginBottom: 10 }}>Redeem</Text>
        {[{ n: "Free side", pts: 60, icon: "\uD83C\uDF5F" }, { n: "Free drink", pts: 60, icon: "\uD83E\uDD64" }, { n: "$5 off", pts: 120, icon: "\uD83D\uDCB0" }].map((r) => (
          <View key={r.n} style={{ backgroundColor: C.white, borderRadius: 12, padding: 14, marginBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Text style={{ fontSize: 24 }}>{r.icon}</Text>
              <View>
                <Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{r.n}</Text>
                <Text style={{ fontSize: 11, color: C.gray }}>{r.pts} pts</Text>
              </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: 340 >= r.pts ? C.gold : C.grayLight, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14 }}>
              <Text style={{ color: 340 >= r.pts ? C.navy : C.gray, fontWeight: "700", fontSize: 12 }}>{340 >= r.pts ? "Redeem" : "Need more"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  if (sub === "orders") return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <SubHeader title="Order History" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {[
          { biz: "Starbucks", icon: "\u2615", items: "Iced Latte, Croissant", date: "Mar 18", total: "$9.45" },
          { biz: "El Pollo Loco", icon: "\uD83C\uDF57", items: "Chicken Bowl", date: "Mar 12", total: "$14.20" },
          { biz: "Hudson News", icon: "\uD83D\uDECD", items: "Water, Trail Mix", date: "Feb 28", total: "$18.75" },
        ].map((o) => (
          <View key={o.biz} style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 10 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 22 }}>{o.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{o.biz}</Text>
                <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{o.items}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                  <Text style={{ fontSize: 11, color: C.gray }}>{o.date}</Text>
                  <Text style={{ fontSize: 13, fontWeight: "700", color: C.navy }}>{o.total}</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}>
                <Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>{"\uD83D\uDD04"} Reorder</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.grayLight, borderRadius: 8, padding: 10, alignItems: "center" }}>
                <Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>{"\uD83E\uDDFE"} Receipt</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  if (sub === "cards") return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <SubHeader title="Saved Cards" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {savedCards.map((c) => (
          <View key={c.id} style={{ backgroundColor: C.white, borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: c.isDefault ? 2 : 1, borderColor: c.isDefault ? C.gold : "#eee" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: C.white, fontSize: 11, fontWeight: "700" }}>{c.type}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{c.name}</Text>
                  <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{"\u2022\u2022\u2022\u2022"} {c.last4} {"\u00b7"} Exp {c.exp}</Text>
                </View>
              </View>
              {c.isDefault && (
                <View style={{ backgroundColor: C.goldBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={{ fontSize: 10, color: C.gold, fontWeight: "700" }}>DEFAULT</Text>
                </View>
              )}
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              {!c.isDefault && (
                <TouchableOpacity onPress={() => setSavedCards(savedCards.map((card) => ({ ...card, isDefault: card.id === c.id })))} style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}>
                  <Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>Set as Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setSavedCards(savedCards.filter((card) => card.id !== c.id))} style={{ flex: 1, backgroundColor: "#fff5f5", borderRadius: 8, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "#ffcdd2" }}>
                <Text style={{ color: C.red, fontWeight: "600", fontSize: 12 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={{ backgroundColor: C.white, borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1.5, borderColor: C.gold, borderStyle: "dashed" }}>
          <Text style={{ fontSize: 24, marginBottom: 4 }}>+</Text>
          <Text style={{ fontSize: 14, color: C.gold, fontWeight: "600" }}>Add New Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  if (sub === "travel") return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <SubHeader title="Travel Preferences" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Home Airport</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          {["ONT", "LAX", "SNA", "BUR", "LGB"].map((a, i) => (
            <TouchableOpacity key={a} onPress={() => setHomeAirport(a)} style={{ padding: 14, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
              <Text style={{ fontSize: 14, color: C.navy, fontWeight: homeAirport === a ? "700" : "400" }}>{a === "ONT" ? "Ontario (ONT)" : a === "LAX" ? "Los Angeles (LAX)" : a === "SNA" ? "John Wayne (SNA)" : a === "BUR" ? "Burbank (BUR)" : "Long Beach (LGB)"}</Text>
              {homeAirport === a && <Text style={{ color: C.gold, fontSize: 16 }}>{"\u2713"}</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Preferred Airline</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          {["Southwest", "United", "Delta", "American", "JetBlue", "Alaska"].map((al, i) => (
            <TouchableOpacity key={al} onPress={() => setPrefAirline(al)} style={{ padding: 14, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
              <Text style={{ fontSize: 14, color: C.navy, fontWeight: prefAirline === al ? "700" : "400" }}>{al}</Text>
              {prefAirline === al && <Text style={{ color: C.gold, fontSize: 16 }}>{"\u2713"}</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Frequent Flyer Numbers</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          {ffNumbers.map((ff, i) => (
            <View key={i} style={{ padding: 14, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "600", color: C.navy }}>{ff.airline}</Text>
                <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{ff.number}</Text>
              </View>
              <TouchableOpacity onPress={() => setFfNumbers(ffNumbers.filter((_, idx) => idx !== i))}>
                <Text style={{ color: C.red, fontSize: 12 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={() => setFfNumbers([...ffNumbers, { airline: "United", number: "MP-" + Math.floor(Math.random() * 90000000 + 10000000) }])} style={{ padding: 14, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 8, borderTopWidth: ffNumbers.length > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
            <Text style={{ color: C.gold, fontSize: 16 }}>+</Text>
            <Text style={{ color: C.gold, fontSize: 14, fontWeight: "600" }}>Add Frequent Flyer Number</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Traveler Programs</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          {programs.map((p, i) => (
            <View key={i} style={{ padding: 14, paddingHorizontal: 16, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: C.navy }}>{p.name}</Text>
                  <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{p.id}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  {p.verified && (
                    <View style={{ backgroundColor: "#e8f5e9", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                      <Text style={{ fontSize: 10, color: C.green, fontWeight: "700" }}>{"\u2713"} VERIFIED</Text>
                    </View>
                  )}
                  <TouchableOpacity onPress={() => setPrograms(programs.filter((_, idx) => idx !== i))}>
                    <Text style={{ color: C.red, fontSize: 12 }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <View style={{ padding: 14, paddingHorizontal: 16, borderTopWidth: programs.length > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
            <Text style={{ color: C.gold, fontSize: 14, fontWeight: "600", marginBottom: 10 }}>+ Add Program</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["Global Entry", "CLEAR", "NEXUS", "SENTRI", "FAST"].filter((name) => !programs.find((p) => p.name === name)).map((name) => (
                <TouchableOpacity key={name} onPress={() => setPrograms([...programs, { name, id: (name === "CLEAR" ? "CLEAR-" : "ID-") + Math.floor(Math.random() * 900000 + 100000), verified: false }])} style={{ backgroundColor: C.grayLight, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 }}>
                  <Text style={{ fontSize: 12, color: C.navy, fontWeight: "600" }}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  if (sub === "settings") return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <SubHeader title="Settings" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {[
          { section: "Account", items: ["Edit profile", "Change password", "Linked accounts"] },
          { section: "Notifications", items: ["Push notifications", "Gate change alerts", "TSA wait spikes", "Promotions & deals", "Parking expiry"] },
          { section: "App Preferences", items: ["Language", "Distance units", "Map theme"] },
          { section: "Privacy & Data", items: ["Privacy policy", "Terms of service", "Clear cache", "Delete account"] },
        ].map((s) => (
          <View key={s.section} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, marginLeft: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.section}</Text>
            <View style={{ backgroundColor: C.white, borderRadius: 12, overflow: "hidden" }}>
              {s.items.map((item, i) => (
                <View key={item} style={{ padding: 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
                  <Text style={{ fontSize: 14, color: item === "Delete account" ? C.red : C.navy }}>{item}</Text>
                  {s.section === "Notifications" ? (
                    <View style={{ width: 40, height: 22, borderRadius: 11, backgroundColor: C.gold, padding: 2, justifyContent: "center" }}>
                      <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: C.white, alignSelf: "flex-end" }} />
                    </View>
                  ) : (
                    <Text style={{ color: C.gray }}>{"\u203A"}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <View style={{ backgroundColor: C.navy, padding: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text style={{ color: C.gold, fontSize: 18 }}>{"\u2190"}</Text>
        </TouchableOpacity>
        <Text style={{ color: C.white, fontSize: 18, fontWeight: "700" }}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 0 }}>
        <View style={{ backgroundColor: C.navy, paddingVertical: 20, paddingHorizontal: 16, alignItems: "center" }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: C.gold, marginBottom: 10 }}>
            <Text style={{ fontSize: 28 }}>{"\uD83D\uDC64"}</Text>
          </View>
          <Text style={{ color: C.white, fontSize: 18, fontWeight: "700" }}>Alex Rivera</Text>
          <Text style={{ color: C.gray, fontSize: 13, marginTop: 2 }}>alex.rivera@email.com</Text>
        </View>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
            {stats.map((s) => (
              <View key={s.l} style={{ flex: 1, backgroundColor: C.white, borderRadius: 14, padding: 14, alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>{s.icon}</Text>
                <Text style={{ fontSize: 20, fontWeight: "800", color: C.navy, marginTop: 4 }}>{s.v}</Text>
                <Text style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.l}</Text>
              </View>
            ))}
          </View>
          {menuItems.map((m) => (
            <TouchableOpacity key={m.key} onPress={() => setSub(m.key)} style={{ backgroundColor: C.white, borderRadius: 12, padding: 14, paddingHorizontal: 16, marginBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Text style={{ fontSize: 18 }}>{m.icon}</Text>
                <Text style={{ fontSize: 14, fontWeight: "600", color: C.navy }}>{m.label}</Text>
              </View>
              <Text style={{ color: C.gray }}>{"\u203A"}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={{ marginTop: 8, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#ffcdd2", backgroundColor: "#fff5f5", alignItems: "center" }}>
            <Text style={{ color: C.red, fontSize: 14, fontWeight: "600" }}>Sign Out</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </View>
  );
}
