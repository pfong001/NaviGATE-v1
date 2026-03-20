import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  StatusBar, ScrollView, Dimensions, SafeAreaView, FlatList,
  Platform, Modal
} from "react-native";

const SW = Dimensions.get("window").width;
const STATUSBAR_H = Platform.OS === "ios" ? 50 : StatusBar.currentHeight || 30;
const C = {
  navy: "#0c1b2e", navyLight: "#1a2d47", gold: "#c9a84c", goldBg: "#fdf8ec",
  white: "#fff", gray: "#8899aa", grayLight: "#e8ecf0", bg: "#f4f5f7",
  green: "#0a7c4f", red: "#d32f2f", blue: "#1976d2", orange: "#f57c00"
};

// ============ SHARED: STATUS BAR SPACER (FIX #4) ============
function TopSpacer() {
  return <View style={{ height: STATUSBAR_H, backgroundColor: C.navy }} />;
}

// ============ SHARED: SCREEN HEADER WITH BACK BUTTON ============
function ScreenHeader({ title, subtitle, goHome }) {
  return (
    <View style={{ backgroundColor: C.navy, padding: 16, paddingBottom: subtitle ? 14 : 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity onPress={goHome} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: C.gold, fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ color: C.white, fontSize: 18, fontWeight: "700" }}>{title}</Text>
          {subtitle && <Text style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );
}

// ============ SHARED: PROMO CAROUSEL ============
function PromoCarousel({ items, autoPlay = true, interval = 4000 }) {
  const [active, setActive] = useState(0);
  const flatRef = useRef(null);
  const timerRef = useRef(null);
  const cardW = SW - 48;

  const startTimer = useCallback(() => {
    if (!autoPlay) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % items.length;
        flatRef.current?.scrollToOffset({ offset: next * (cardW + 12), animated: true });
        return next;
      });
    }, interval);
  }, [items.length, interval, autoPlay, cardW]);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const onScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (cardW + 12));
    if (idx !== active && idx >= 0 && idx < items.length) {
      setActive(idx);
      clearInterval(timerRef.current);
      startTimer();
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <FlatList
        ref={flatRef}
        data={items}
        horizontal
        pagingEnabled={false}
        snapToInterval={cardW + 12}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={{ width: cardW, marginRight: 12, borderRadius: 16, overflow: "hidden", backgroundColor: item.bg || C.navyLight }}>
            <View style={{ padding: 20, minHeight: 110, justifyContent: "flex-end" }}>
              <Text style={{ fontSize: 13, color: item.tagColor || C.gold, fontWeight: "700", marginBottom: 4 }}>{item.tag}</Text>
              <Text style={{ fontSize: 17, color: C.white, fontWeight: "800", marginBottom: 4 }}>{item.title}</Text>
              <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10, gap: 6 }}>
        {items.map((_, i) => (
          <View key={i} style={{ width: active === i ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: active === i ? C.gold : C.grayLight }} />
        ))}
      </View>
    </View>
  );
}

// ============ WELCOME SCREEN ============
function Welcome({ onLogin }) {
  const [authPage, setAuthPage] = useState("main");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (authPage === "signup") return (
    <View style={ws.container}>
      <TopSpacer />
      <StatusBar barStyle="light-content" />
      <View style={ws.inner}>
        <View style={ws.header}>
          <Text style={ws.bigIcon}>✈️</Text>
          <Text style={ws.title}>Create Account</Text>
          <Text style={ws.subtitle}>Join ONT Navigator</Text>
        </View>
        <TextInput style={ws.input} placeholder="Full name" placeholderTextColor={C.gray} value={name} onChangeText={setName} />
        <Text style={ws.hint}>e.g. Alex Rivera</Text>
        <TextInput style={ws.input} placeholder="Email address" placeholderTextColor={C.gray} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={ws.input} placeholder="Your password" placeholderTextColor={C.gray} value={password} onChangeText={setPassword} secureTextEntry />
        <Text style={ws.hint}>6+ characters</Text>
        <TouchableOpacity style={ws.btnGold} onPress={onLogin}><Text style={ws.btnGoldText}>Sign Up</Text></TouchableOpacity>
        <View style={ws.switchRow}>
          <Text style={ws.switchText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => setAuthPage("login")}><Text style={ws.switchLink}>Log in</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (authPage === "login") return (
    <View style={ws.container}>
      <TopSpacer />
      <StatusBar barStyle="light-content" />
      <View style={ws.inner}>
        <View style={ws.header}>
          <Text style={ws.bigIcon}>✈️</Text>
          <Text style={ws.title}>Welcome Back</Text>
          <Text style={ws.subtitle}>Log in to ONT Navigator</Text>
        </View>
        <TextInput style={ws.input} placeholder="Email address" placeholderTextColor={C.gray} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={ws.input} placeholder="Password" placeholderTextColor={C.gray} value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={ws.btnGold} onPress={onLogin}><Text style={ws.btnGoldText}>Log In</Text></TouchableOpacity>
        <View style={ws.switchRow}>
          <Text style={ws.switchText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => setAuthPage("signup")}><Text style={ws.switchLink}>Sign up</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={ws.container}>
      <TopSpacer />
      <StatusBar barStyle="light-content" />
      <View style={[ws.inner, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontSize: 64 }}>✈️</Text>
        <Text style={ws.mainTitle}>ONT Navigator</Text>
        <Text style={ws.mainSub}>Ontario International Airport</Text>
        <TouchableOpacity style={[ws.btnGold, { width: "100%" }]} onPress={() => setAuthPage("signup")}><Text style={ws.btnGoldText}>Sign Up</Text></TouchableOpacity>
        <TouchableOpacity style={[ws.btnOutline, { width: "100%" }]} onPress={() => setAuthPage("login")}><Text style={ws.btnOutlineText}>Log In</Text></TouchableOpacity>
        <TouchableOpacity onPress={onLogin}><Text style={ws.guestText}>Continue as guest →</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const ws = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.navy },
  inner: { flex: 1, padding: 24, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 32 },
  bigIcon: { fontSize: 40, marginBottom: 8 },
  title: { color: C.gold, fontSize: 22, fontWeight: "700" },
  subtitle: { color: C.gray, fontSize: 13, marginTop: 6 },
  input: { backgroundColor: C.navyLight, borderRadius: 12, padding: 14, color: C.white, fontSize: 14, marginBottom: 12, borderWidth: 1, borderColor: C.navyLight },
  hint: { color: C.gray, fontSize: 11, marginTop: -8, marginBottom: 8, paddingLeft: 4 },
  btnGold: { backgroundColor: C.gold, borderRadius: 12, padding: 14, alignItems: "center", marginBottom: 12 },
  btnGoldText: { color: C.navy, fontSize: 15, fontWeight: "700" },
  btnOutline: { borderRadius: 12, padding: 14, alignItems: "center", marginBottom: 16, borderWidth: 1.5, borderColor: C.gold },
  btnOutlineText: { color: C.gold, fontSize: 15, fontWeight: "600" },
  switchRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  switchText: { color: C.gray, fontSize: 13 },
  switchLink: { color: C.gold, fontSize: 13, fontWeight: "600" },
  mainTitle: { color: C.white, fontSize: 28, fontWeight: "800", letterSpacing: 1, marginTop: 16 },
  mainSub: { color: C.gold, fontSize: 14, fontWeight: "600", marginTop: 8, marginBottom: 40 },
  guestText: { color: C.gray, fontSize: 14, marginTop: 4 },
});

// ============ HOME SCREEN (FIX #2: profile icon top-right opens profile) ============
function Home({ setScreen }) {
  const promos = [
    { tag: "NOW OPEN", title: "Escape Lounge T2", subtitle: "Premium lounge experience · complimentary drinks & bites", bg: "#1a2d47" },
    { tag: "LIMITED TIME", title: "20% Off Duty Free", subtitle: "Save on fragrances, spirits & accessories before you fly", bg: "#2c1810", tagColor: "#ff9800" },
    { tag: "NEW EXHIBIT", title: "ONT Art Walk", subtitle: "Local artist showcase · Terminal 2 & 4 corridors", bg: "#0d2818", tagColor: "#66bb6a" },
    { tag: "DEAL", title: "Pre-Book Parking $8/day", subtitle: "Save 40% when you reserve parking before arrival", bg: "#1a1030", tagColor: "#ab47bc" },
  ];
  const features = [
    { icon: "🗺️", label: "Map", screen: "map" },
    { icon: "✈️", label: "Flights", screen: "flights" },
    { icon: "🛡️", label: "TSA", screen: "tsa" },
    { icon: "💳", label: "Wallet", screen: "wallet" },
    { icon: "🛍️", label: "Duty Free", screen: "dutyfree" },
    { icon: "🅿️", label: "Parking", screen: "parking" },
  ];
  const businesses = [
    { icon: "☕", name: "Starbucks", desc: "Coffee & pastries · T2 Gate 204", hours: "5AM - 10PM" },
    { icon: "🍗", name: "El Pollo Loco", desc: "Mexican grill · T2 Food Court", hours: "6AM - 9PM" },
    { icon: "🛋️", name: "Escape Lounge", desc: "Premium lounge · T2 Level 2", hours: "5:30AM - 10PM" },
    { icon: "📰", name: "Hudson News", desc: "Snacks & essentials · T4 Gate 401", hours: "4:30AM - 11PM" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <View style={hs.headerBox}>
        <View style={hs.headerRow}>
          <View>
            <Text style={hs.greeting}>Good morning ✈</Text>
            <Text style={hs.airportName}>Ontario International Airport</Text>
          </View>
          <TouchableOpacity onPress={() => setScreen("profile")} style={hs.avatar}>
            <Text style={{ fontSize: 18 }}>👤</Text>
          </TouchableOpacity>
        </View>
        <View style={hs.searchBox}>
          <Text style={{ color: C.gray }}>🔍</Text>
          <Text style={{ color: C.gray, fontSize: 14, marginLeft: 8 }}>Search gates, food, lounges...</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <PromoCarousel items={promos} />
        <View style={hs.grid}>
          {features.map(f => (
            <TouchableOpacity key={f.label} style={hs.gridItem} onPress={() => setScreen(f.screen)}>
              <Text style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</Text>
              <Text style={hs.gridLabel}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={hs.sectionTitle}>Near You</Text>
        {businesses.map(b => (
          <View key={b.name} style={hs.bizCard}>
            <View style={hs.bizIcon}><Text style={{ fontSize: 24 }}>{b.icon}</Text></View>
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

// ============ MAP SCREEN (FIX #1: flight card above map, map shrinks) ============
function MapScreen({ myFlight, goHome }) {
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState(null);
  const [floor, setFloor] = useState(2);
  const cats = ["All", "Gates", "Dining", "Coffee", "Lounges", "TSA"];
  const locations = [
    { id: 1, n: "Gate 201", c: "Gates", f: 2, x: 0.25, y: 0.30, icon: "🚪" },
    { id: 2, n: "Gate 202", c: "Gates", f: 2, x: 0.40, y: 0.25, icon: "🚪" },
    { id: 3, n: "Starbucks", c: "Coffee", f: 2, x: 0.55, y: 0.55, icon: "☕", rating: "4.3", hours: "5AM-10PM" },
    { id: 4, n: "El Pollo Loco", c: "Dining", f: 2, x: 0.70, y: 0.40, icon: "🍗", rating: "4.1", hours: "6AM-9PM" },
    { id: 5, n: "Escape Lounge", c: "Lounges", f: 2, x: 0.35, y: 0.65, icon: "🛋️", rating: "4.7", hours: "5:30AM-10PM" },
    { id: 6, n: "TSA Checkpoint A", c: "TSA", f: 1, x: 0.45, y: 0.45, icon: "🛡️", wait: "12 min" },
    { id: 7, n: "Hudson News", c: "Dining", f: 2, x: 0.60, y: 0.70, icon: "📰", rating: "3.9", hours: "4:30AM-11PM" },
    { id: 8, n: "Gate 401", c: "Gates", f: 2, x: 0.80, y: 0.55, icon: "🚪" },
  ];
  const filtered = locations.filter(l => (cat === "All" || l.c === cat) && l.f === floor);
  const mapW = SW - 24;
  const mapH = myFlight ? 220 : 300;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title={`ONT Terminal · Level ${floor}`} goHome={goHome} />
      <View style={{ backgroundColor: C.navy, paddingHorizontal: 16, paddingBottom: 14 }}>
        <View style={{ backgroundColor: C.navyLight, borderRadius: 10, padding: 8, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <Text style={{ color: C.gray }}>🔍</Text>
          <Text style={{ color: C.gray, fontSize: 13, marginLeft: 8 }}>Search gates, food...</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
          {cats.map(c => (
            <TouchableOpacity key={c} onPress={() => { setCat(c); setSel(null); }} style={{ paddingVertical: 7, paddingHorizontal: 14, borderRadius: 20, backgroundColor: cat === c ? C.gold : C.navyLight }}>
              <Text style={{ color: cat === c ? C.navy : C.gray, fontSize: 12, fontWeight: "600" }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/* FIX #1: My Flight card on top of map area */}
        {myFlight && (
          <View style={{ margin: 12, marginBottom: 0, backgroundColor: C.white, borderRadius: 14, padding: 14, borderWidth: 2, borderColor: C.gold, shadowColor: C.gold, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <Text style={{ fontSize: 11, color: C.gold, fontWeight: "700" }}>✈ MY FLIGHT</Text>
              <View style={{ backgroundColor: myFlight.color + "22", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}><Text style={{ fontSize: 10, color: myFlight.color, fontWeight: "700" }}>{myFlight.status}</Text></View>
            </View>
            <Text style={{ fontWeight: "700", fontSize: 15, color: C.navy }}>{myFlight.num} · {myFlight.airline}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <Text style={{ fontSize: 12, color: C.gray }}>{myFlight.dest || myFlight.from} · Gate {myFlight.gate}</Text>
              <Text style={{ fontSize: 12, color: C.navy, fontWeight: "600" }}>{myFlight.time}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 8, alignItems: "center" }}><Text style={{ color: C.navy, fontWeight: "600", fontSize: 11 }}>🧭 Navigate to Gate</Text></TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 8, alignItems: "center" }}><Text style={{ color: C.white, fontWeight: "600", fontSize: 11 }}>🎫 Boarding Pass</Text></TouchableOpacity>
            </View>
          </View>
        )}
        {/* Map area - shrinks when flight card is showing */}
        <View style={{ margin: 12, borderRadius: 16, backgroundColor: "#e8edf2", height: mapH, overflow: "hidden", borderWidth: 2, borderColor: "#d0d8e0", position: "relative" }}>
          <Text style={{ position: "absolute", top: 8, left: mapW * 0.18, fontSize: 11, color: C.gray, fontWeight: "600" }}>Terminal 2</Text>
          <Text style={{ position: "absolute", top: 8, right: mapW * 0.12, fontSize: 11, color: C.gray, fontWeight: "600" }}>Terminal 4</Text>
          <View style={{ position: "absolute", top: mapH * 0.15, left: mapW * 0.08, width: mapW * 0.38, height: mapH * 0.7, backgroundColor: "#d5dce4", borderRadius: 8, borderWidth: 1, borderColor: "#b0bcc8" }} />
          <View style={{ position: "absolute", top: mapH * 0.15, right: mapW * 0.08, width: mapW * 0.38, height: mapH * 0.7, backgroundColor: "#d5dce4", borderRadius: 8, borderWidth: 1, borderColor: "#b0bcc8" }} />
          <View style={{ position: "absolute", left: mapW * 0.30 - 7, top: mapH * 0.50 - 7, width: 14, height: 14, borderRadius: 7, backgroundColor: "#4285f4", borderWidth: 3, borderColor: C.white, shadowColor: "#4285f4", shadowOpacity: 0.4, shadowRadius: 6, elevation: 4 }} />
          {filtered.map(l => (
            <TouchableOpacity key={l.id} onPress={() => setSel(sel?.id === l.id ? null : l)} style={{ position: "absolute", left: mapW * l.x - 18, top: mapH * l.y - 18, alignItems: "center", zIndex: sel?.id === l.id ? 10 : 1 }}>
              <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: sel?.id === l.id ? C.gold : C.navy, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 }}>
                <Text style={{ fontSize: 14 }}>{l.icon}</Text>
              </View>
              <Text style={{ fontSize: 8, color: C.navy, fontWeight: "600", marginTop: 1 }}>{l.n}</Text>
              {l.wait && <View style={{ backgroundColor: "#e8f5e9", borderRadius: 6, paddingHorizontal: 4, paddingVertical: 1 }}><Text style={{ fontSize: 7, color: C.green, fontWeight: "700" }}>{l.wait}</Text></View>}
            </TouchableOpacity>
          ))}
          <View style={{ position: "absolute", right: 10, top: 10, backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 10, padding: 4, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
            {[3, 2, 1].map(f => (
              <TouchableOpacity key={f} onPress={() => { setFloor(f); setSel(null); }} style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: floor === f ? C.gold : "transparent", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: floor === f ? C.navy : C.gray }}>L{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {sel && (
          <View style={{ margin: 12, marginTop: 0, backgroundColor: C.white, borderRadius: 16, padding: 16, borderWidth: 2, borderColor: C.gold, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center", marginRight: 12 }}><Text style={{ fontSize: 24 }}>{sel.icon}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700", fontSize: 15, color: C.navy }}>{sel.n}</Text>
                <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{sel.c} · Level {sel.f}</Text>
                {sel.rating && <Text style={{ fontSize: 12, color: C.gold, marginTop: 2 }}>⭐ {sel.rating} {sel.hours ? `· ${sel.hours}` : ""}</Text>}
                {sel.wait && <Text style={{ fontSize: 12, color: C.green, fontWeight: "600", marginTop: 2 }}>Wait: {sel.wait}</Text>}
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>🧭 Navigate</Text></TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.white, fontWeight: "600", fontSize: 12 }}>ℹ️ Details</Text></TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

// ============ TICKET / BOARDING PASS SCREEN (FIX #2: new screen) ============
function TicketScreen({ myFlight, setMyFlight, goHome }) {
  const [scanMode, setScanMode] = useState(false);

  if (myFlight) return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="My Boarding Pass" subtitle="Show this at the gate" goHome={goHome} />
      <ScrollView contentContainerStyle={{ padding: 16, alignItems: "center" }}>
        {/* Boarding pass card */}
        <View style={{ width: "100%", backgroundColor: C.white, borderRadius: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 12, elevation: 6 }}>
          {/* Top section */}
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
                <Text style={{ fontSize: 24 }}>✈️</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>TO</Text>
                <Text style={{ color: C.white, fontSize: 22, fontWeight: "800" }}>{(myFlight.dest || myFlight.from || "").match(/\((\w+)\)/)?.[1] || "---"}</Text>
                <Text style={{ color: C.gray, fontSize: 11 }}>{(myFlight.dest || myFlight.from || "").replace(/\s*\(\w+\)/, "")}</Text>
              </View>
            </View>
          </View>
          {/* Dotted divider */}
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: -1 }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: C.bg, marginLeft: -10 }} />
            <View style={{ flex: 1, borderTopWidth: 2, borderStyle: "dashed", borderColor: C.grayLight }} />
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: C.bg, marginRight: -10 }} />
          </View>
          {/* Details */}
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <View><Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>GATE</Text><Text style={{ color: C.navy, fontSize: 20, fontWeight: "800" }}>{myFlight.gate}</Text></View>
              <View style={{ alignItems: "center" }}><Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>TIME</Text><Text style={{ color: C.navy, fontSize: 20, fontWeight: "800" }}>{myFlight.time}</Text></View>
              <View style={{ alignItems: "flex-end" }}><Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>SEAT</Text><Text style={{ color: C.navy, fontSize: 20, fontWeight: "800" }}>14A</Text></View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <View><Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>CLASS</Text><Text style={{ color: C.navy, fontSize: 14, fontWeight: "600" }}>Economy</Text></View>
              <View style={{ alignItems: "center" }}><Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>STATUS</Text><View style={{ backgroundColor: myFlight.color + "18", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 2, marginTop: 2 }}><Text style={{ fontSize: 12, color: myFlight.color, fontWeight: "700" }}>{myFlight.status}</Text></View></View>
              <View style={{ alignItems: "flex-end" }}><Text style={{ color: C.gray, fontSize: 10, fontWeight: "600" }}>ZONE</Text><Text style={{ color: C.navy, fontSize: 14, fontWeight: "600" }}>3</Text></View>
            </View>
            {/* QR code placeholder */}
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

  // No flight set — scan prompt
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="Boarding Pass" subtitle="Scan or set your flight" goHome={goHome} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 32 }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 44 }}>🎫</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: "700", color: C.navy, textAlign: "center" }}>No Boarding Pass</Text>
        <Text style={{ fontSize: 13, color: C.gray, textAlign: "center", marginTop: 8, lineHeight: 20 }}>Scan your boarding pass barcode or set your flight from the Flights tab</Text>
        <TouchableOpacity onPress={() => setScanMode(true)} style={{ backgroundColor: C.gold, borderRadius: 12, padding: 14, paddingHorizontal: 32, marginTop: 24 }}>
          <Text style={{ color: C.navy, fontSize: 15, fontWeight: "700" }}>📷 Scan Boarding Pass</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, color: C.gray, marginTop: 12 }}>or go to Flights → Set as My Flight</Text>
      </View>
      {scanMode && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center", padding: 32 }}>
          <View style={{ width: 240, height: 240, borderWidth: 3, borderColor: C.gold, borderRadius: 16, alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <View style={{ position: "absolute", top: -2, left: -2, width: 30, height: 30, borderTopWidth: 4, borderLeftWidth: 4, borderColor: C.gold, borderTopLeftRadius: 16 }} />
            <View style={{ position: "absolute", top: -2, right: -2, width: 30, height: 30, borderTopWidth: 4, borderRightWidth: 4, borderColor: C.gold, borderTopRightRadius: 16 }} />
            <View style={{ position: "absolute", bottom: -2, left: -2, width: 30, height: 30, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: C.gold, borderBottomLeftRadius: 16 }} />
            <View style={{ position: "absolute", bottom: -2, right: -2, width: 30, height: 30, borderBottomWidth: 4, borderRightWidth: 4, borderColor: C.gold, borderBottomRightRadius: 16 }} />
            <Text style={{ color: C.white, fontSize: 14, textAlign: "center" }}>📷{"\n\n"}Point camera at{"\n"}boarding pass barcode</Text>
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

// ============ FLIGHTS SCREEN ============
function Flights({ myFlight, setMyFlight, goHome }) {
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
    ]
  };
  const list = flights[tab].filter(f => !search || f.num.toLowerCase().includes(search.toLowerCase()) || f.airline.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="KONT · TODAY" subtitle="Ontario International Airport" goHome={goHome} />
      <View style={{ backgroundColor: C.navy, paddingHorizontal: 16, paddingBottom: 14 }}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          {["departures", "arrivals"].map(t => (
            <TouchableOpacity key={t} onPress={() => setTab(t)} style={{ flex: 1, padding: 8, borderRadius: 10, backgroundColor: tab === t ? C.gold : C.navyLight, alignItems: "center" }}>
              <Text style={{ color: tab === t ? C.navy : C.gray, fontSize: 13, fontWeight: "600", textTransform: "capitalize" }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ backgroundColor: C.navyLight, borderRadius: 10, padding: 8, paddingHorizontal: 12, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: C.gray }}>🔍</Text>
          <TextInput style={{ flex: 1, color: C.white, fontSize: 13, marginLeft: 8 }} placeholder="Search flight, airline..." placeholderTextColor={C.gray} value={search} onChangeText={setSearch} />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        {myFlight && (
          <View style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 2, borderColor: C.gold }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ fontSize: 11, color: C.gold, fontWeight: "700" }}>✈ MY FLIGHT</Text>
              <TouchableOpacity onPress={() => setMyFlight(null)}><Text style={{ color: C.gray, fontSize: 12 }}>✕ Remove</Text></TouchableOpacity>
            </View>
            <Text style={{ fontWeight: "700", fontSize: 15, color: C.navy }}>{myFlight.num} · {myFlight.airline}</Text>
            <Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{myFlight.dest || myFlight.from} · Gate {myFlight.gate}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
              <View style={{ backgroundColor: myFlight.color + "22", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 }}><Text style={{ fontSize: 11, color: myFlight.color, fontWeight: "700" }}>{myFlight.status}</Text></View>
              <Text style={{ fontSize: 11, color: C.gray }}>{myFlight.time}</Text>
            </View>
          </View>
        )}
        {list.map(f => (
          <TouchableOpacity key={f.id} onPress={() => setSelFlight(selFlight?.id === f.id ? null : f)} style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: selFlight?.id === f.id ? 2 : 1, borderColor: selFlight?.id === f.id ? C.gold : "#eee" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View><Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{f.num}</Text><Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{f.airline}</Text></View>
              <View style={{ alignItems: "flex-end" }}><Text style={{ fontSize: 13, fontWeight: "600", color: C.navy }}>{f.time}</Text><View style={{ backgroundColor: f.color + "18", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginTop: 2 }}><Text style={{ fontSize: 11, color: f.color, fontWeight: "700" }}>{f.status}</Text></View></View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
              <Text style={{ fontSize: 12, color: C.gray }}>{tab === "departures" ? "To" : "From"}: {f.dest || f.from}</Text>
              <Text style={{ fontSize: 12, color: C.gray }}>Gate {f.gate}</Text>
            </View>
            {f.carousel && <Text style={{ fontSize: 11, color: C.blue, marginTop: 4 }}>🧳 Baggage Carousel {f.carousel}</Text>}
            {selFlight?.id === f.id && (
              <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#eee", flexDirection: "row", gap: 8 }}>
                <TouchableOpacity onPress={() => { setMyFlight(f); setSelFlight(null); }} style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>Set as My Flight</Text></TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.white, fontWeight: "600", fontSize: 12 }}>🧭 Navigate</Text></TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

// ============ TSA SCREEN ============
function TSA({ goHome }) {
  const [showTips, setShowTips] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [reporting, setReporting] = useState(null);
  const [reportVal, setReportVal] = useState(10);
  const [reported, setReported] = useState(false);
  const tips = ["Have ID ready", "Remove laptops/liquids", "Easy-to-remove shoes", "Consider PreCheck"];
  const checkpoints = [
    { id: "A", name: "Checkpoint A", loc: "Terminal 2 · Level 1", wait: 12, trend: "steady", reports: 24, lastReport: "3 min ago", lanes: ["Standard", "PreCheck"], hours: "4:00 AM - 11:00 PM" },
    { id: "B", name: "Checkpoint B", loc: "Terminal 4 · Level 1", wait: 8, trend: "decreasing", reports: 18, lastReport: "7 min ago", lanes: ["Standard", "PreCheck", "CLEAR"], hours: "4:30 AM - 10:30 PM" },
    { id: "C", name: "Checkpoint C", loc: "Terminal 2 · Level 1 (South)", wait: 22, trend: "increasing", reports: 31, lastReport: "1 min ago", lanes: ["Standard"], hours: "5:00 AM - 9:00 PM" },
  ];
  const getColor = w => w <= 10 ? C.green : w <= 20 ? C.orange : C.red;
  const getTrend = t => t === "steady" ? "→ Steady" : t === "decreasing" ? "↓ Decreasing" : "↑ Increasing";

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="KONT · LIVE" subtitle="TSA Checkpoint Wait Times" goHome={goHome} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          {[{ l: "Avg Wait", v: "14 min", c: C.orange }, { l: "Reports", v: "73", c: C.blue }, { l: "Best", v: "Chk B", c: C.green }].map(s => (
            <View key={s.l} style={{ flex: 1, backgroundColor: C.white, borderRadius: 12, padding: 10, alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: s.c }}>{s.v}</Text>
              <Text style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.l}</Text>
            </View>
          ))}
        </View>
        <View style={{ backgroundColor: C.white, borderRadius: 14, marginBottom: 12, overflow: "hidden" }}>
          <TouchableOpacity onPress={() => setShowTips(!showTips)} style={{ padding: 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", backgroundColor: C.goldBg }}>
            <Text style={{ fontWeight: "700", fontSize: 13, color: C.navy }}>💡 TSA Tips</Text>
            <Text style={{ color: C.gray }}>{showTips ? "▲" : "▼"}</Text>
          </TouchableOpacity>
          {showTips && <View style={{ padding: 16, paddingTop: 8 }}>{tips.map(t => <Text key={t} style={{ fontSize: 12, color: C.navy, paddingVertical: 4 }}>✓ {t}</Text>)}</View>}
        </View>
        {checkpoints.map(cp => (
          <View key={cp.id} style={{ backgroundColor: C.white, borderRadius: 14, marginBottom: 10, overflow: "hidden" }}>
            <TouchableOpacity onPress={() => setExpanded(expanded === cp.id ? null : cp.id)} style={{ padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: getColor(cp.wait) + "18", alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 16, fontWeight: "800", color: getColor(cp.wait) }}>{cp.wait}</Text></View>
                <View><Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{cp.name}</Text><Text style={{ fontSize: 11, color: C.gray }}>{cp.wait} min · {getTrend(cp.trend)}</Text></View>
              </View>
              <Text style={{ color: C.gray }}>{expanded === cp.id ? "▲" : "▼"}</Text>
            </TouchableOpacity>
            {expanded === cp.id && (
              <View style={{ paddingHorizontal: 14, paddingBottom: 14, borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 12 }}>
                <Text style={{ fontSize: 12, color: C.gray, marginBottom: 4 }}>{cp.loc} · {cp.hours}</Text>
                <Text style={{ fontSize: 12, color: C.gray, marginBottom: 8 }}>{cp.reports} reports · Last: {cp.lastReport}</Text>
                <View style={{ flexDirection: "row", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>{cp.lanes.map(l => <View key={l} style={{ backgroundColor: C.goldBg, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 }}><Text style={{ color: C.gold, fontSize: 11, fontWeight: "600" }}>{l}</Text></View>)}</View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TouchableOpacity onPress={() => { setReporting(cp.id); setReported(false); setReportVal(10); }} style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>📝 Report</Text></TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.white, fontWeight: "600", fontSize: 12 }}>🧭 Navigate</Text></TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
      {reporting && (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: C.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 24, elevation: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
            <Text style={{ fontWeight: "700", fontSize: 16, color: C.navy }}>Report Wait Time</Text>
            <TouchableOpacity onPress={() => setReporting(null)}><Text style={{ fontSize: 18, color: C.gray }}>✕</Text></TouchableOpacity>
          </View>
          {reported ? (
            <View style={{ alignItems: "center", paddingVertical: 20 }}>
              <Text style={{ fontSize: 48 }}>✅</Text>
              <Text style={{ fontWeight: "700", fontSize: 16, color: C.navy, marginTop: 8 }}>Thanks for reporting!</Text>
              <Text style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>Your report helps other travelers</Text>
            </View>
          ) : (
            <>
              <View style={{ alignItems: "center", marginBottom: 16 }}><Text style={{ fontSize: 48, fontWeight: "800", color: getColor(reportVal) }}>{reportVal}</Text><Text style={{ fontSize: 14, color: C.gray }}>minutes</Text></View>
              <View style={{ flexDirection: "row", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
                {[5, 10, 15, 20, 30, 45].map(v => (
                  <TouchableOpacity key={v} onPress={() => setReportVal(v)} style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10, backgroundColor: reportVal === v ? C.gold : C.grayLight }}><Text style={{ color: reportVal === v ? C.navy : C.gray, fontWeight: "700", fontSize: 13 }}>{v}m</Text></TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity onPress={() => setReported(true)} style={{ backgroundColor: C.gold, borderRadius: 12, padding: 14, alignItems: "center" }}><Text style={{ color: C.navy, fontSize: 15, fontWeight: "700" }}>Submit Report</Text></TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}

// ============ WALLET SCREEN ============
function Wallet({ goHome }) {
  const [selCard, setSelCard] = useState(null);
  const cards = [
    { id: 1, name: "Amex Platinum", last4: "4821", bg: "#666", perks: ["Centurion Lounge Access", "Priority Pass", "$200 Airline Credit"], icon: "💎" },
    { id: 2, name: "Chase Sapphire Reserve", last4: "7733", bg: "#1a237e", perks: ["Priority Pass", "3x Travel Points", "$300 Travel Credit"], icon: "🔷" },
    { id: 3, name: "Capital One Venture X", last4: "5592", bg: "#333", perks: ["Capital One Lounge", "Priority Pass", "10x Hotels"], icon: "🏦" },
  ];
  const lounges = [
    { name: "Escape Lounge", access: true, via: "Amex Platinum", icon: "🛋️" },
    { name: "USO Lounge", access: true, via: "Military ID", icon: "🇺🇸" },
    { name: "Delta Sky Club", access: false, requires: "Delta Reserve Card", icon: "🔵" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="My Wallet" subtitle="Cards & lounge access" goHome={goHome} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginBottom: 10, marginLeft: 4 }}>My Cards</Text>
        {cards.map(c => (
          <TouchableOpacity key={c.id} onPress={() => setSelCard(selCard?.id === c.id ? null : c)} style={{ backgroundColor: c.bg, borderRadius: 16, padding: 18, marginBottom: 10, borderWidth: selCard?.id === c.id ? 2 : 0, borderColor: C.gold }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={{ fontSize: 22 }}>{c.icon}</Text><Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>•••• {c.last4}</Text></View>
            <Text style={{ color: C.white, fontSize: 15, fontWeight: "700", marginTop: 16 }}>{c.name}</Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4 }}>Mar 2026</Text>
            {selCard?.id === c.id && (
              <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.2)" }}>
                <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 6, fontWeight: "600" }}>PERKS</Text>
                {c.perks.map(p => <Text key={p} style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", paddingVertical: 3 }}>✓ {p}</Text>)}
              </View>
            )}
          </TouchableOpacity>
        ))}
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginTop: 8, marginBottom: 10, marginLeft: 4 }}>Lounge Access</Text>
        {lounges.map(l => (
          <View key={l.name} style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 8, flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: l.access ? "#e8f5e9" : "#ffebee", alignItems: "center", justifyContent: "center", marginRight: 12 }}><Text style={{ fontSize: 20 }}>{l.icon}</Text></View>
            <View style={{ flex: 1 }}><Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{l.name}</Text>{l.access ? <Text style={{ fontSize: 12, color: C.green, fontWeight: "600", marginTop: 2 }}>✅ Access Granted · via {l.via}</Text> : <Text style={{ fontSize: 12, color: C.red, marginTop: 2 }}>🔒 Requires: {l.requires}</Text>}</View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

// ============ DUTY FREE SCREEN (FIX #3: single-line swipeable pills + menu icon) ============
function DutyFree({ goHome }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [favs, setFavs] = useState([]);
  const [preOrdered, setPreOrdered] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const cats = ["All", "Fragrances", "Spirits", "Cosmetics", "Electronics", "Accessories"];
  const deals = [
    { tag: "FLASH SALE", title: "30% Off All Fragrances", subtitle: "Today only · Chanel, Dior, Tom Ford & more", bg: "#2a1035", tagColor: "#ce93d8" },
    { tag: "BUNDLE DEAL", title: "Buy 2 Spirits, Save $20", subtitle: "Mix & match premium whisky, vodka & gin", bg: "#1a2010", tagColor: "#aed581" },
    { tag: "NEW ARRIVAL", title: "AirPods Pro 2 · $199", subtitle: "Duty-free exclusive — save $50 vs retail", bg: "#0d1a2e", tagColor: "#64b5f6" },
    { tag: "MEMBER SPECIAL", title: "Extra 10% for Gold Tier", subtitle: "Use rewards points for additional savings", bg: "#2e1a08", tagColor: C.gold },
  ];
  const products = [
    { id: 1, name: "Chanel N°5 EDP", cat: "Fragrances", price: 135, duty: 98, icon: "🌸", rating: 4.8 },
    { id: 2, name: "Johnnie Walker Blue", cat: "Spirits", price: 189, duty: 142, icon: "🥃", rating: 4.9 },
    { id: 3, name: "La Mer Moisturizer", cat: "Cosmetics", price: 195, duty: 155, icon: "✨", rating: 4.7 },
    { id: 4, name: "AirPods Pro 2", cat: "Electronics", price: 249, duty: 199, icon: "🎧", rating: 4.6 },
    { id: 5, name: "Ray-Ban Aviators", cat: "Accessories", price: 163, duty: 119, icon: "🕶️", rating: 4.5 },
    { id: 6, name: "Dior Sauvage EDT", cat: "Fragrances", price: 115, duty: 82, icon: "🌿", rating: 4.7 },
  ];
  const filtered = products.filter(p => (cat === "All" || p.cat === cat) && (!search || p.name.toLowerCase().includes(search.toLowerCase())));

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="Duty Free" subtitle="Save on premium brands" goHome={goHome} />
      <View style={{ backgroundColor: C.navy, paddingHorizontal: 16, paddingBottom: 14 }}>
        {/* Menu icon + Search bar (FIX #2: menu on left, same height) */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12, alignItems: "stretch" }}>
          <TouchableOpacity onPress={() => setShowMenu(true)} style={{ width: 42, borderRadius: 10, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: C.gray, fontSize: 18 }}>☰</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 10, padding: 8, paddingHorizontal: 12, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: C.gray }}>🔍</Text>
            <TextInput style={{ flex: 1, color: C.white, fontSize: 13, marginLeft: 8 }} placeholder="Search products..." placeholderTextColor={C.gray} value={search} onChangeText={setSearch} />
          </View>
        </View>
        {/* Single-line swipeable pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {cats.map(c => (
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
          {filtered.map(p => (
            <View key={p.id} style={{ width: (SW - 36) / 2, backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 10 }}>
              <TouchableOpacity onPress={() => setFavs(favs.includes(p.id) ? favs.filter(f => f !== p.id) : [...favs, p.id])} style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}><Text style={{ fontSize: 16 }}>{favs.includes(p.id) ? "❤️" : "🤍"}</Text></TouchableOpacity>
              <Text style={{ fontSize: 36, textAlign: "center", marginBottom: 8 }}>{p.icon}</Text>
              <Text style={{ fontWeight: "700", fontSize: 13, color: C.navy }} numberOfLines={2}>{p.name}</Text>
              <Text style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>⭐ {p.rating}</Text>
              <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6, marginTop: 6 }}><Text style={{ fontSize: 16, fontWeight: "800", color: C.gold }}>${p.duty}</Text><Text style={{ fontSize: 12, color: C.gray, textDecorationLine: "line-through" }}>${p.price}</Text></View>
              <Text style={{ fontSize: 10, color: C.green, fontWeight: "600", marginTop: 2 }}>Save ${p.price - p.duty}</Text>
              {preOrdered.includes(p.id) ? (
                <View style={{ marginTop: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: "#e8f5e9", alignItems: "center" }}><Text style={{ fontSize: 11, color: C.green, fontWeight: "700" }}>✓ Pre-ordered</Text></View>
              ) : (
                <TouchableOpacity onPress={() => setPreOrdered([...preOrdered, p.id])} style={{ marginTop: 8, backgroundColor: C.gold, borderRadius: 8, paddingVertical: 8, alignItems: "center" }}><Text style={{ color: C.navy, fontSize: 11, fontWeight: "600" }}>Pre-order for pickup</Text></TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
      {/* Category Menu Modal */}
      {showMenu && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowMenu(false)} />
          <View style={{ backgroundColor: C.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={{ fontWeight: "700", fontSize: 18, color: C.navy }}>Categories</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}><Text style={{ fontSize: 18, color: C.gray }}>✕</Text></TouchableOpacity>
            </View>
            {cats.map(c => (
              <TouchableOpacity key={c} onPress={() => { setCat(c); setShowMenu(false); }} style={{ padding: 14, borderRadius: 12, backgroundColor: cat === c ? C.goldBg : "transparent", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <Text style={{ fontSize: 15, color: C.navy, fontWeight: cat === c ? "700" : "400" }}>{c}</Text>
                {cat === c && <Text style={{ color: C.gold, fontSize: 16 }}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// ============ PARKING SCREEN (NEW) ============
function Parking({ goHome }) {
  const [selLot, setSelLot] = useState(null);
  const [booked, setBooked] = useState(null);
  const [payMode, setPayMode] = useState(null);
  const lots = [
    { id: 1, name: "Lot A — Terminal 2", type: "Short-Term", rate: "$3/hr", daily: "$24/day", spots: 142, total: 400, distance: "2 min walk", icon: "🅿️" },
    { id: 2, name: "Lot B — Terminal 4", type: "Short-Term", rate: "$3/hr", daily: "$24/day", spots: 89, total: 350, distance: "3 min walk", icon: "🅿️" },
    { id: 3, name: "Lot C — Economy", type: "Long-Term", rate: "$2/hr", daily: "$14/day", spots: 523, total: 1200, distance: "8 min shuttle", icon: "🚌" },
    { id: 4, name: "Lot D — Economy", type: "Long-Term", rate: "$2/hr", daily: "$12/day", spots: 671, total: 1000, distance: "10 min shuttle", icon: "🚌" },
    { id: 5, name: "Premium Valet", type: "Valet", rate: "$5/hr", daily: "$45/day", spots: 18, total: 50, distance: "Terminal drop-off", icon: "🔑" },
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
        {/* Summary stats */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 14 }}>
          {[{ l: "Best Rate", v: "$12/day", c: C.green }, { l: "Total Open", v: "1,443", c: C.blue }, { l: "Pre-Book", v: "Save 40%", c: C.gold }].map(s => (
            <View key={s.l} style={{ flex: 1, backgroundColor: C.white, borderRadius: 12, padding: 10, alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "800", color: s.c }}>{s.v}</Text>
              <Text style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.l}</Text>
            </View>
          ))}
        </View>

        {/* Active booking */}
        {booked && (
          <View style={{ backgroundColor: C.white, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: C.gold }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ fontSize: 11, color: C.gold, fontWeight: "700" }}>🅿️ ACTIVE PARKING</Text>
              <View style={{ backgroundColor: "#e8f5e9", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}><Text style={{ fontSize: 10, color: C.green, fontWeight: "700" }}>CONFIRMED</Text></View>
            </View>
            <Text style={{ fontWeight: "700", fontSize: 15, color: C.navy }}>{booked.name}</Text>
            <Text style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>Booked at {booked.daily} · {booked.distance}</Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>🧭 Navigate to Lot</Text></TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.white, fontWeight: "600", fontSize: 12 }}>⏱ Extend Time</Text></TouchableOpacity>
            </View>
          </View>
        )}

        {/* Lot cards */}
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginBottom: 10, marginLeft: 4 }}>Available Lots</Text>
        {lots.map(lot => {
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
                      <Text style={{ fontSize: 10, color: avColor, fontWeight: "700" }}>{avLabel} · {lot.spots} spots</Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 15, fontWeight: "800", color: C.gold }}>{lot.daily}</Text>
                  <Text style={{ fontSize: 10, color: C.gray }}>{lot.rate}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <Text style={{ fontSize: 11, color: C.gray }}>📍 {lot.distance}</Text>
                <Text style={{ fontSize: 11, color: C.gray }}>{lot.type}</Text>
              </View>
              {/* Availability bar */}
              <View style={{ height: 4, backgroundColor: C.grayLight, borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
                <View style={{ width: `${(lot.spots / lot.total) * 100}%`, height: "100%", backgroundColor: avColor, borderRadius: 2 }} />
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
                    <Text style={{ fontSize: 11, color: C.gray }}>💳 Saved Card</Text>
                    <Text style={{ fontSize: 11, color: C.gray }}> Apple Pay</Text>
                    <Text style={{ fontSize: 11, color: C.gray }}> Google Pay</Text>
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

// ============ PROFILE SCREEN ============
function Profile({ setScreen }) {
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
  const stats = [{ l: "Reward Pts", v: "340", icon: "🏆" }, { l: "Flights", v: "12", icon: "✈️" }, { l: "Orders", v: "8", icon: "🛒" }];
  const menuItems = [
    { label: "Rewards", icon: "🏆", key: "rewards" },
    { label: "Order History", icon: "📋", key: "orders" },
    { label: "Saved Cards", icon: "💳", key: "cards" },
    { label: "Travel Preferences", icon: "🌍", key: "travel" },
    { label: "Settings", icon: "⚙️", key: "settings" },
  ];

  const SubHeader = ({ title }) => (
    <View style={{ backgroundColor: C.navy, padding: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
      <TouchableOpacity onPress={() => setSub(null)}><Text style={{ color: C.gold, fontSize: 18 }}>←</Text></TouchableOpacity>
      <Text style={{ color: C.white, fontSize: 18, fontWeight: "700" }}>{title}</Text>
    </View>
  );

  if (sub === "rewards") return (
    <View style={{ flex: 1, backgroundColor: C.bg }}><TopSpacer /><SubHeader title="My Rewards" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ backgroundColor: C.white, borderRadius: 16, padding: 20, alignItems: "center", marginBottom: 16 }}>
          <Text style={{ fontSize: 36, fontWeight: "800", color: C.gold }}>340</Text><Text style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>points earned</Text>
          <View style={{ width: "100%", height: 10, backgroundColor: C.grayLight, borderRadius: 8, marginTop: 12, overflow: "hidden" }}><View style={{ width: "57%", height: "100%", backgroundColor: C.gold, borderRadius: 8 }} /></View>
          <Text style={{ fontSize: 11, color: C.gray, marginTop: 6 }}>340 / 600 pts to next reward</Text>
        </View>
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginBottom: 10 }}>How to Earn</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <Text style={{ fontSize: 13, color: C.navy, marginBottom: 6 }}>🛒 <Text style={{ fontWeight: "700" }}>10 pts</Text> per order</Text>
          <Text style={{ fontSize: 13, color: C.navy, marginBottom: 6 }}>🔄 <Text style={{ fontWeight: "700" }}>+2 pts</Text> reorder bonus</Text>
          <Text style={{ fontSize: 13, color: C.navy }}>🔥 <Text style={{ fontWeight: "700" }}>2x pts</Text> streak bonus (3+ orders)</Text>
        </View>
        <Text style={{ fontSize: 14, color: C.navy, fontWeight: "700", marginBottom: 10 }}>Redeem</Text>
        {[{ n: "Free side", pts: 60, icon: "🍟" }, { n: "Free drink", pts: 60, icon: "🥤" }, { n: "$5 off", pts: 120, icon: "💰" }].map(r => (
          <View key={r.n} style={{ backgroundColor: C.white, borderRadius: 12, padding: 14, marginBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}><Text style={{ fontSize: 24 }}>{r.icon}</Text><View><Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{r.n}</Text><Text style={{ fontSize: 11, color: C.gray }}>{r.pts} pts</Text></View></View>
            <TouchableOpacity style={{ backgroundColor: 340 >= r.pts ? C.gold : C.grayLight, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14 }}><Text style={{ color: 340 >= r.pts ? C.navy : C.gray, fontWeight: "700", fontSize: 12 }}>{340 >= r.pts ? "Redeem" : "Need more"}</Text></TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  if (sub === "orders") return (
    <View style={{ flex: 1, backgroundColor: C.bg }}><TopSpacer /><SubHeader title="Order History" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {[{ biz: "Starbucks", icon: "☕", items: "Iced Latte, Croissant", date: "Mar 18", total: "$9.45" }, { biz: "El Pollo Loco", icon: "🍗", items: "Chicken Bowl", date: "Mar 12", total: "$14.20" }, { biz: "Hudson News", icon: "🛍", items: "Water, Trail Mix", date: "Feb 28", total: "$18.75" }].map(o => (
          <View key={o.biz} style={{ backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 10 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 22 }}>{o.icon}</Text></View>
              <View style={{ flex: 1 }}><Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{o.biz}</Text><Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{o.items}</Text><View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}><Text style={{ fontSize: 11, color: C.gray }}>{o.date}</Text><Text style={{ fontSize: 13, fontWeight: "700", color: C.navy }}>{o.total}</Text></View></View>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>🔄 Reorder</Text></TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: C.grayLight, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>🧾 Receipt</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  if (sub === "cards") return (
    <View style={{ flex: 1, backgroundColor: C.bg }}><TopSpacer /><SubHeader title="Saved Cards" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {savedCards.map(c => (
          <View key={c.id} style={{ backgroundColor: C.white, borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: c.isDefault ? 2 : 1, borderColor: c.isDefault ? C.gold : "#eee" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center" }}><Text style={{ color: C.white, fontSize: 11, fontWeight: "700" }}>{c.type}</Text></View>
                <View><Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{c.name}</Text><Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>•••• {c.last4} · Exp {c.exp}</Text></View>
              </View>
              {c.isDefault && <View style={{ backgroundColor: C.goldBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}><Text style={{ fontSize: 10, color: C.gold, fontWeight: "700" }}>DEFAULT</Text></View>}
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              {!c.isDefault && <TouchableOpacity onPress={() => setSavedCards(savedCards.map(card => ({ ...card, isDefault: card.id === c.id })))} style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}><Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>Set as Default</Text></TouchableOpacity>}
              <TouchableOpacity onPress={() => setSavedCards(savedCards.filter(card => card.id !== c.id))} style={{ flex: 1, backgroundColor: "#fff5f5", borderRadius: 8, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "#ffcdd2" }}><Text style={{ color: C.red, fontWeight: "600", fontSize: 12 }}>Remove</Text></TouchableOpacity>
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
    <View style={{ flex: 1, backgroundColor: C.bg }}><TopSpacer /><SubHeader title="Travel Preferences" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Home Airport</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          {["ONT", "LAX", "SNA", "BUR", "LGB"].map((a, i) => (
            <TouchableOpacity key={a} onPress={() => setHomeAirport(a)} style={{ padding: 14, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
              <Text style={{ fontSize: 14, color: C.navy, fontWeight: homeAirport === a ? "700" : "400" }}>{a === "ONT" ? "Ontario (ONT)" : a === "LAX" ? "Los Angeles (LAX)" : a === "SNA" ? "John Wayne (SNA)" : a === "BUR" ? "Burbank (BUR)" : "Long Beach (LGB)"}</Text>
              {homeAirport === a && <Text style={{ color: C.gold, fontSize: 16 }}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Preferred Airline</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          {["Southwest", "United", "Delta", "American", "JetBlue", "Alaska"].map((al, i) => (
            <TouchableOpacity key={al} onPress={() => setPrefAirline(al)} style={{ padding: 14, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
              <Text style={{ fontSize: 14, color: C.navy, fontWeight: prefAirline === al ? "700" : "400" }}>{al}</Text>
              {prefAirline === al && <Text style={{ color: C.gold, fontSize: 16 }}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Frequent Flyer Numbers</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          {ffNumbers.map((ff, i) => (
            <View key={i} style={{ padding: 14, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
              <View><Text style={{ fontSize: 14, fontWeight: "600", color: C.navy }}>{ff.airline}</Text><Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{ff.number}</Text></View>
              <TouchableOpacity onPress={() => setFfNumbers(ffNumbers.filter((_, idx) => idx !== i))}><Text style={{ color: C.red, fontSize: 12 }}>Remove</Text></TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={() => setFfNumbers([...ffNumbers, { airline: "United", number: "MP-" + Math.floor(Math.random() * 90000000 + 10000000) }])} style={{ padding: 14, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 8, borderTopWidth: ffNumbers.length > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
            <Text style={{ color: C.gold, fontSize: 16 }}>+</Text><Text style={{ color: C.gold, fontSize: 14, fontWeight: "600" }}>Add Frequent Flyer Number</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Traveler Programs</Text>
        <View style={{ backgroundColor: C.white, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
          {programs.map((p, i) => (
            <View key={i} style={{ padding: 14, paddingHorizontal: 16, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View><Text style={{ fontSize: 14, fontWeight: "600", color: C.navy }}>{p.name}</Text><Text style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{p.id}</Text></View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  {p.verified && <View style={{ backgroundColor: "#e8f5e9", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}><Text style={{ fontSize: 10, color: C.green, fontWeight: "700" }}>✓ VERIFIED</Text></View>}
                  <TouchableOpacity onPress={() => setPrograms(programs.filter((_, idx) => idx !== i))}><Text style={{ color: C.red, fontSize: 12 }}>Remove</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <View style={{ padding: 14, paddingHorizontal: 16, borderTopWidth: programs.length > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
            <Text style={{ color: C.gold, fontSize: 14, fontWeight: "600", marginBottom: 10 }}>+ Add Program</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["Global Entry", "CLEAR", "NEXUS", "SENTRI", "FAST"].filter(name => !programs.find(p => p.name === name)).map(name => (
                <TouchableOpacity key={name} onPress={() => setPrograms([...programs, { name, id: `${name === "CLEAR" ? "CLEAR-" : "ID-"}${Math.floor(Math.random() * 900000 + 100000)}`, verified: false }])} style={{ backgroundColor: C.grayLight, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 }}>
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
    <View style={{ flex: 1, backgroundColor: C.bg }}><TopSpacer /><SubHeader title="Settings" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {[{ section: "Account", items: ["Edit profile", "Change password", "Linked accounts"] }, { section: "Notifications", items: ["Push notifications", "Gate change alerts", "TSA wait spikes", "Promotions & deals", "Parking expiry"] }, { section: "App Preferences", items: ["Language", "Distance units", "Map theme"] }, { section: "Privacy & Data", items: ["Privacy policy", "Terms of service", "Clear cache", "Delete account"] }].map(s => (
          <View key={s.section} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: C.gray, fontWeight: "600", marginBottom: 8, marginLeft: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.section}</Text>
            <View style={{ backgroundColor: C.white, borderRadius: 12, overflow: "hidden" }}>
              {s.items.map((item, i) => (
                <View key={item} style={{ padding: 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: i > 0 ? 1 : 0, borderTopColor: "#f0f0f0" }}>
                  <Text style={{ fontSize: 14, color: item === "Delete account" ? C.red : C.navy }}>{item}</Text>
                  {s.section === "Notifications" ? <View style={{ width: 40, height: 22, borderRadius: 11, backgroundColor: C.gold, padding: 2, justifyContent: "center" }}><View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: C.white, alignSelf: "flex-end" }} /></View> : <Text style={{ color: C.gray }}>›</Text>}
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
        <TouchableOpacity onPress={() => setScreen("home")}><Text style={{ color: C.gold, fontSize: 18 }}>←</Text></TouchableOpacity>
        <Text style={{ color: C.white, fontSize: 18, fontWeight: "700" }}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 0 }}>
        <View style={{ backgroundColor: C.navy, paddingVertical: 20, paddingHorizontal: 16, alignItems: "center" }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: C.gold, marginBottom: 10 }}><Text style={{ fontSize: 28 }}>👤</Text></View>
          <Text style={{ color: C.white, fontSize: 18, fontWeight: "700" }}>Alex Rivera</Text>
          <Text style={{ color: C.gray, fontSize: 13, marginTop: 2 }}>alex.rivera@email.com</Text>
        </View>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
            {stats.map(s => (
              <View key={s.l} style={{ flex: 1, backgroundColor: C.white, borderRadius: 14, padding: 14, alignItems: "center" }}><Text style={{ fontSize: 20 }}>{s.icon}</Text><Text style={{ fontSize: 20, fontWeight: "800", color: C.navy, marginTop: 4 }}>{s.v}</Text><Text style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.l}</Text></View>
            ))}
          </View>
          {menuItems.map(m => (
            <TouchableOpacity key={m.key} onPress={() => setSub(m.key)} style={{ backgroundColor: C.white, borderRadius: 12, padding: 14, paddingHorizontal: 16, marginBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}><Text style={{ fontSize: 18 }}>{m.icon}</Text><Text style={{ fontSize: 14, fontWeight: "600", color: C.navy }}>{m.label}</Text></View>
              <Text style={{ color: C.gray }}>›</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={{ marginTop: 8, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#ffcdd2", backgroundColor: "#fff5f5", alignItems: "center" }}><Text style={{ color: C.red, fontSize: 14, fontWeight: "600" }}>Sign Out</Text></TouchableOpacity>
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </View>
  );
}

// ============ MAIN APP (FIX #2: Profile → Ticket in tab bar) ============
export default function App() {
  const [sc, setSc] = useState("welcome");
  const [myFlight, setMyFlight] = useState(null);

  const tabs = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "map", label: "Map", icon: "🗺️" },
    { key: "flights", label: "Flights", icon: "✈️" },
    { key: "ticket", label: "Ticket", icon: "🎫" },
  ];

  if (sc === "welcome") return (
    <View style={{ flex: 1, backgroundColor: C.navy }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Welcome onLogin={() => setSc("home")} />
    </View>
  );

  const goHome = () => setSc("home");

  const renderScreen = () => {
    switch (sc) {
      case "home": return <Home setScreen={setSc} />;
      case "map": return <MapScreen myFlight={myFlight} goHome={goHome} />;
      case "flights": return <Flights myFlight={myFlight} setMyFlight={setMyFlight} goHome={goHome} />;
      case "tsa": return <TSA goHome={goHome} />;
      case "wallet": return <Wallet goHome={goHome} />;
      case "dutyfree": return <DutyFree goHome={goHome} />;
      case "parking": return <Parking goHome={goHome} />;
      case "ticket": return <TicketScreen myFlight={myFlight} setMyFlight={setMyFlight} goHome={goHome} />;
      case "profile": return <Profile setScreen={setSc} />;
      default: return <Home setScreen={setSc} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.navy }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      {/* Bottom Tab Bar */}
      <View style={{ backgroundColor: C.navy, paddingTop: 8, paddingBottom: 20, flexDirection: "row", justifyContent: "space-around", borderTopWidth: 1, borderTopColor: C.navyLight }}>
        {tabs.map(t => {
          const isActive = sc === t.key || (t.key === "home" && ["tsa", "wallet", "dutyfree", "profile"].includes(sc));
          return (
            <TouchableOpacity key={t.key} onPress={() => setSc(t.key)} style={{ alignItems: "center", paddingHorizontal: 12, paddingVertical: 4 }}>
              <Text style={{ fontSize: 20, opacity: isActive ? 1 : 0.5 }}>{t.icon}</Text>
              <Text style={{ fontSize: 10, fontWeight: "600", color: isActive ? C.gold : C.gray, marginTop: 2 }}>{t.label}</Text>
              {isActive && <View style={{ width: 20, height: 3, borderRadius: 2, backgroundColor: C.gold, marginTop: 3 }} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}