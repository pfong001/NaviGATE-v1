import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SW, C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";
import ScreenHeader from "../components/ScreenHeader";
import PromoCarousel from "../components/PromoCarousel";

export default function DutyFreeScreen({ goHome }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [favs, setFavs] = useState([]);
  const [preOrdered, setPreOrdered] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const cats = ["All", "Fragrances", "Spirits", "Cosmetics", "Electronics", "Accessories"];
  const deals = [
    { tag: "FLASH SALE", title: "30% Off All Fragrances", subtitle: "Today only \u00b7 Chanel, Dior, Tom Ford & more", bg: "#2a1035", tagColor: "#ce93d8" },
    { tag: "BUNDLE DEAL", title: "Buy 2 Spirits, Save $20", subtitle: "Mix & match premium whisky, vodka & gin", bg: "#1a2010", tagColor: "#aed581" },
    { tag: "NEW ARRIVAL", title: "AirPods Pro 2 \u00b7 $199", subtitle: "Duty-free exclusive \u2014 save $50 vs retail", bg: "#0d1a2e", tagColor: "#64b5f6" },
    { tag: "MEMBER SPECIAL", title: "Extra 10% for Gold Tier", subtitle: "Use rewards points for additional savings", bg: "#2e1a08", tagColor: C.gold },
  ];
  const products = [
    { id: 1, name: "Chanel N\u00b05 EDP", cat: "Fragrances", price: 135, duty: 98, icon: "\uD83C\uDF38", rating: 4.8 },
    { id: 2, name: "Johnnie Walker Blue", cat: "Spirits", price: 189, duty: 142, icon: "\uD83E\uDD43", rating: 4.9 },
    { id: 3, name: "La Mer Moisturizer", cat: "Cosmetics", price: 195, duty: 155, icon: "\u2728", rating: 4.7 },
    { id: 4, name: "AirPods Pro 2", cat: "Electronics", price: 249, duty: 199, icon: "\uD83C\uDFA7", rating: 4.6 },
    { id: 5, name: "Ray-Ban Aviators", cat: "Accessories", price: 163, duty: 119, icon: "\uD83D\uDD76\uFE0F", rating: 4.5 },
    { id: 6, name: "Dior Sauvage EDT", cat: "Fragrances", price: 115, duty: 82, icon: "\uD83C\uDF3F", rating: 4.7 },
  ];
  const filtered = products.filter(
    (p) => (cat === "All" || p.cat === cat) && (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="Duty Free" subtitle="Save on premium brands" goHome={goHome} />
      <View style={{ backgroundColor: C.navy, paddingHorizontal: 16, paddingBottom: 14 }}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12, alignItems: "stretch" }}>
          <TouchableOpacity onPress={() => setShowMenu(true)} style={{ width: 42, borderRadius: 10, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: C.gray, fontSize: 18 }}>{"\u2630"}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 10, padding: 8, paddingHorizontal: 12, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: C.gray }}>{"\uD83D\uDD0D"}</Text>
            <TextInput style={{ flex: 1, color: C.white, fontSize: 13, marginLeft: 8 }} placeholder="Search products..." placeholderTextColor={C.gray} value={search} onChangeText={setSearch} />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {cats.map((c) => (
              <TouchableOpacity key={c} onPress={() => setCat(c)} style={{ paddingVertical: 7, paddingHorizontal: 14, borderRadius: 20, backgroundColor: cat === c ? C.gold : C.navyLight }}>
                <Text style={{ color: cat === c ? C.navy : C.gray, fontSize: 12, fontWeight: "600" }}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <PromoCarousel items={deals} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {filtered.map((p) => (
            <View key={p.id} style={{ width: (SW - 36) / 2, backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 10 }}>
              <TouchableOpacity onPress={() => setFavs(favs.includes(p.id) ? favs.filter((f) => f !== p.id) : [...favs, p.id])} style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
                <Text style={{ fontSize: 16 }}>{favs.includes(p.id) ? "\u2764\uFE0F" : "\uD83E\uDD0D"}</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 36, textAlign: "center", marginBottom: 8 }}>{p.icon}</Text>
              <Text style={{ fontWeight: "700", fontSize: 13, color: C.navy }} numberOfLines={2}>{p.name}</Text>
              <Text style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{"\u2B50"} {p.rating}</Text>
              <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6, marginTop: 6 }}>
                <Text style={{ fontSize: 16, fontWeight: "800", color: C.gold }}>${p.duty}</Text>
                <Text style={{ fontSize: 12, color: C.gray, textDecorationLine: "line-through" }}>${p.price}</Text>
              </View>
              <Text style={{ fontSize: 10, color: C.green, fontWeight: "600", marginTop: 2 }}>Save ${p.price - p.duty}</Text>
              {preOrdered.includes(p.id) ? (
                <View style={{ marginTop: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: "#e8f5e9", alignItems: "center" }}>
                  <Text style={{ fontSize: 11, color: C.green, fontWeight: "700" }}>{"\u2713"} Pre-ordered</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={() => setPreOrdered([...preOrdered, p.id])} style={{ marginTop: 8, backgroundColor: C.gold, borderRadius: 8, paddingVertical: 8, alignItems: "center" }}>
                  <Text style={{ color: C.navy, fontSize: 11, fontWeight: "600" }}>Pre-order for pickup</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
      {showMenu && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowMenu(false)} />
          <View style={{ backgroundColor: C.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={{ fontWeight: "700", fontSize: 18, color: C.navy }}>Categories</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <Text style={{ fontSize: 18, color: C.gray }}>{"\u2715"}</Text>
              </TouchableOpacity>
            </View>
            {cats.map((c) => (
              <TouchableOpacity key={c} onPress={() => { setCat(c); setShowMenu(false); }} style={{ padding: 14, borderRadius: 12, backgroundColor: cat === c ? C.goldBg : "transparent", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <Text style={{ fontSize: 15, color: C.navy, fontWeight: cat === c ? "700" : "400" }}>{c}</Text>
                {cat === c && <Text style={{ color: C.gold, fontSize: 16 }}>{"\u2713"}</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
