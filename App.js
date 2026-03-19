import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Dimensions, FlatList } from "react-native";

const C = { navy: "#0c1b2e", navyLight: "#1a2d47", gold: "#c9a84c", goldLight: "#f5e6b8", goldBg: "#fdf8ec", white: "#fff", gray: "#8899aa", grayLight: "#e8ecf0", bg: "#f4f5f7" };
const { width: SW } = Dimensions.get("window");

// ==================== DATA ====================
const PROMOS = [
  { id: 1, title: "Art of the Inland Empire", sub: "New exhibit \u00b7 Terminal 2 Gallery", bg: C.navyLight, accent: C.gold },
  { id: 2, title: "Holiday Travel Deals", sub: "Up to 30% off at ONT shops", bg: "#6b2a3a", accent: "#f5c6d0" },
  { id: 3, title: "Live Music Fridays", sub: "Jazz in Terminal 4 \u00b7 5\u20138 PM", bg: "#2a1a47", accent: "#d4b8f5" },
  { id: 4, title: "New: Mobile Parking", sub: "Pre-book & pay from your phone", bg: "#1a3a2a", accent: "#b8f5d4" },
];

const HOME_FEATURES = [
  { id: "map", icon: "\ud83d\uddfa", label: "Map" },
  { id: "flights", icon: "\ud83d\udccb", label: "Flights" },
  { id: "tsa", icon: "\ud83d\udee1", label: "TSA times" },
  { id: "parking", icon: "\ud83c\udd7f\ufe0f", label: "Parking" },
  { id: "wallet", icon: "\ud83d\udcb3", label: "My wallet" },
  { id: "dutyfree", icon: "\ud83d\udecd", label: "Duty-free" },
];

const ADS = [
  { id: 1, name: "Escape Lounge", tag: "Premium Lounge", desc: "Complimentary drinks, hot meals & shower suites.", icon: "\ud83d\udecb", color: "#7c6bc4" },
  { id: 2, name: "Starbucks", tag: "Coffee \u00b7 Terminal 2", desc: "Mobile order ahead and skip the line.", icon: "\u2615", color: "#1e7e34" },
  { id: 3, name: "El Pollo Loco", tag: "Dining \u00b7 Terminal 2", desc: "Fresh grilled chicken combos before your flight.", icon: "\ud83c\udf57", color: "#d4693e" },
  { id: 4, name: "Hudson News", tag: "Retail \u00b7 Terminal 2", desc: "Travel essentials, bestselling books & gifts.", icon: "\ud83d\udecd", color: "#c45488" },
];

const POIS = [
  { id: 1, name: "Gate A1", cat: "Gate", floor: 2, icon: "\u2708" },
  { id: 2, name: "Gate A2", cat: "Gate", floor: 2, icon: "\u2708" },
  { id: 3, name: "Gate A3", cat: "Gate", floor: 2, icon: "\u2708" },
  { id: 4, name: "Gate B1", cat: "Gate", floor: 2, icon: "\u2708" },
  { id: 5, name: "Gate B2", cat: "Gate", floor: 2, icon: "\u2708" },
  { id: 6, name: "Escape Lounge", cat: "Lounge", floor: 3, icon: "\ud83d\udecb", rating: 4.6, hours: "5:00 AM \u2013 9:00 PM", amenities: ["Wi-Fi", "Premium Bar", "Hot Food", "Showers"] },
  { id: 7, name: "USO Lounge", cat: "Lounge", floor: 3, icon: "\ud83d\udecb", rating: 4.8, hours: "6:00 AM \u2013 10:00 PM", amenities: ["Wi-Fi", "Snacks", "TV"] },
  { id: 8, name: "Starbucks", cat: "Coffee", floor: 2, icon: "\u2615", rating: 4.2, hours: "4:30 AM \u2013 8:00 PM", amenities: ["Wi-Fi", "Mobile Order"] },
  { id: 9, name: "McDonald's", cat: "Dining", floor: 2, icon: "\ud83c\udf54", rating: 3.8, hours: "5:00 AM \u2013 9:00 PM", amenities: ["Wi-Fi", "Quick Service"] },
  { id: 10, name: "El Pollo Loco", cat: "Dining", floor: 2, icon: "\ud83c\udf57", rating: 4.0, hours: "5:30 AM \u2013 8:30 PM", amenities: ["Quick Service"] },
  { id: 11, name: "Hudson News", cat: "Retail", floor: 2, icon: "\ud83d\udecd", rating: 3.9, hours: "5:00 AM \u2013 9:00 PM", amenities: ["Snacks", "Magazines"] },
  { id: 12, name: "Baggage Claim A", cat: "Service", floor: 1, icon: "\ud83e\uddf3" },
  { id: 13, name: "Baggage Claim B", cat: "Service", floor: 1, icon: "\ud83e\uddf3" },
  { id: 14, name: "Ground Transport", cat: "Service", floor: 1, icon: "\ud83d\ude8c" },
  { id: 15, name: "TSA Checkpoint A", cat: "TSA", floor: 2, icon: "\ud83d\udee1", wait: 12, amenities: ["PreCheck", "Standard"] },
  { id: 16, name: "TSA Checkpoint B", cat: "TSA", floor: 2, icon: "\ud83d\udee1", wait: 22, amenities: ["PreCheck", "Standard", "CLEAR"] },
];

const FLIGHTS_DATA = [
  { fn: "SW 1423", airline: "Southwest", dest: "Los Angeles (LAX)", gate: "A2", time: "10:15 AM", status: "Boarding", type: "dep" },
  { fn: "UA 892", airline: "United", dest: "San Francisco (SFO)", gate: "B1", time: "10:30 AM", status: "Boarding", type: "dep" },
  { fn: "DL 345", airline: "Delta", dest: "Atlanta (ATL)", gate: "A3", time: "11:45 AM", status: "On time", type: "dep" },
  { fn: "AA 1102", airline: "American", dest: "Dallas (DFW)", gate: "B2", time: "12:20 PM", status: "Delayed", type: "dep" },
  { fn: "SW 2281", airline: "Southwest", dest: "Denver (DEN)", gate: "A1", time: "1:05 PM", status: "On time", type: "dep" },
  { fn: "UA 1547", airline: "United", dest: "Houston (IAH)", gate: "B1", time: "2:30 PM", status: "On time", type: "dep" },
  { fn: "AA 455", airline: "American", dest: "Chicago (ORD)", gate: "B2", time: "4:00 PM", status: "Cancelled", type: "dep" },
  { fn: "SW 734", airline: "Southwest", from: "Phoenix (PHX)", gate: "A1", time: "9:45 AM", status: "Arrived", type: "arr" },
  { fn: "UA 321", airline: "United", from: "Denver (DEN)", gate: "B1", time: "10:50 AM", status: "On time", type: "arr" },
  { fn: "DL 612", airline: "Delta", from: "Minneapolis (MSP)", gate: "A2", time: "11:30 AM", status: "On time", type: "arr" },
  { fn: "AA 998", airline: "American", from: "Miami (MIA)", gate: "B2", time: "1:15 PM", status: "Delayed", type: "arr" },
];

const TSA_CHECKPOINTS = [
  { id: 1, name: "TSA Checkpoint A", location: "Terminal 2 \u00b7 Near Gate A1", hours: "4:00 AM \u2013 10:00 PM", lanes: ["PreCheck", "Standard"], wait: 12, reports: 14, lastReport: "2 min ago", trend: "steady" },
  { id: 2, name: "TSA Checkpoint B", location: "Terminal 2 \u00b7 Near Gate B1", hours: "4:00 AM \u2013 10:00 PM", lanes: ["PreCheck", "Standard", "CLEAR"], wait: 22, reports: 9, lastReport: "5 min ago", trend: "increasing" },
];

const STATUS_COLORS = {
  "Boarding": { bg: "#fdf8ec", color: "#8b6914", dot: "#c9a84c" },
  "On time": { bg: "#e6f9f0", color: "#0a7c4f", dot: "#0a7c4f" },
  "Delayed": { bg: "#fce8e8", color: "#c0392b", dot: "#c0392b" },
  "Cancelled": { bg: "#f5f0f0", color: "#888", dot: "#888" },
  "Arrived": { bg: "#e6f1fb", color: "#185fa5", dot: "#185fa5" },
};

function waitColor(w) { return w <= 15 ? "#0a7c4f" : w <= 25 ? "#b8860b" : "#c0392b"; }
function waitBg(w) { return w <= 15 ? "#e6f9f0" : w <= 25 ? "#fff8e6" : "#fce8e8"; }
function waitLabel(w) { return w <= 15 ? "Short wait" : w <= 25 ? "Moderate wait" : "Long wait"; }
function trendIcon(t) { return t === "increasing" ? "\u2191" : t === "decreasing" ? "\u2193" : "\u2192"; }
function trendColor(t) { return t === "increasing" ? "#c0392b" : t === "decreasing" ? "#0a7c4f" : C.gray; }

// ==================== WELCOME SCREEN ====================
function WelcomeScreen({ onComplete }) {
  const [screen, setScreen] = useState("welcome");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (screen === "signup") return (
    <View style={w.formBg}><StatusBar barStyle="dark-content" /><View style={w.formInner}>
      <TouchableOpacity onPress={() => setScreen("welcome")}><Text style={w.back}>{"\u2190 Back"}</Text></TouchableOpacity>
      <Text style={w.formTitle}>Create account</Text><Text style={w.formSub}>Start navigating ONT like a pro.</Text>
      <Text style={w.label}>Full name</Text><TextInput style={w.input} placeholder="e.g. Alex Rivera" value={name} onChangeText={setName} />
      <Text style={w.label}>Email</Text><TextInput style={w.input} placeholder="you@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text style={w.label}>Password</Text><TextInput style={w.input} placeholder="6+ characters" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={w.primaryBtn} onPress={() => setScreen("ready")}><Text style={w.primaryBtnText}>Create account</Text></TouchableOpacity>
      <Text style={w.switchText}>Already have an account? <Text style={w.switchLink} onPress={() => setScreen("login")}>Log in</Text></Text>
    </View></View>
  );

  if (screen === "login") return (
    <View style={w.formBg}><StatusBar barStyle="dark-content" /><View style={w.formInner}>
      <TouchableOpacity onPress={() => setScreen("welcome")}><Text style={w.back}>{"\u2190 Back"}</Text></TouchableOpacity>
      <Text style={w.formTitle}>Welcome back</Text><Text style={w.formSub}>Log in to pick up where you left off.</Text>
      <Text style={w.label}>Email</Text><TextInput style={w.input} placeholder="you@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text style={w.label}>Password</Text><TextInput style={w.input} placeholder="Your password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={w.primaryBtn} onPress={() => setScreen("ready")}><Text style={w.primaryBtnText}>Log in</Text></TouchableOpacity>
      <Text style={w.switchText}>Don't have an account? <Text style={w.switchLink} onPress={() => setScreen("signup")}>Sign up</Text></Text>
    </View></View>
  );

  if (screen === "ready") return (
    <View style={w.hero}><StatusBar barStyle="light-content" />
      <View style={w.checkCircle}><Text style={{ fontSize: 36, color: C.gold }}>{"\u2713"}</Text></View>
      <Text style={w.readyTitle}>You're all set</Text>
      <Text style={w.readySubtitle}>Your ONT Navigator is ready. Find your gate, unlock lounge perks, and never miss a flight.</Text>
      <TouchableOpacity style={w.readyBtn} onPress={onComplete}><Text style={w.readyBtnText}>Open the app</Text></TouchableOpacity>
    </View>
  );

  return (
    <View style={w.hero}><StatusBar barStyle="light-content" />
      <View style={w.badge}><Text style={w.badgeText}>ONTARIO INTERNATIONAL AIRPORT</Text></View>
      <View style={w.logoBox}><Text style={{ fontSize: 28, color: C.gold }}>{"\u2708"}</Text></View>
      <Text style={w.title}>ONT Navigator</Text>
      <Text style={w.tagline}>{"Your gate. Your lounge. Your flight.\nAll in one tap."}</Text>
      <View style={w.btnGroup}>
        <TouchableOpacity style={w.signupBtn} onPress={() => setScreen("signup")}><Text style={w.signupBtnText}>Get started</Text></TouchableOpacity>
        <TouchableOpacity style={w.loginBtn} onPress={() => setScreen("login")}><Text style={w.loginBtnText}>I already have an account</Text></TouchableOpacity>
        <TouchableOpacity onPress={onComplete}><Text style={w.guestLink}>{"Continue as guest \u2192"}</Text></TouchableOpacity>
      </View>
      <Text style={w.footer}>{"KONT \u00b7 SoCal \u00b7 Since 1923"}</Text>
    </View>
  );
}

// ==================== HOME SCREEN ====================
function HomeScreen({ onNavigate }) {
  const [activePromo, setActivePromo] = useState(0);
  const promoRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromo(prev => {
        const next = (prev + 1) % PROMOS.length;
        promoRef.current?.scrollTo({ x: next * (SW - 40), animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={h.container}><StatusBar barStyle="light-content" />
      <View style={h.header}>
        <View><Text style={h.headerSub}>ONTARIO INTERNATIONAL</Text><Text style={h.headerTitle}>{"Good morning \u2708"}</Text></View>
        <TouchableOpacity style={h.profileBtn}><Text style={{ fontSize: 16 }}>{"\ud83d\udc64"}</Text></TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={h.searchWrap}><Text style={{ fontSize: 14, color: C.gray }}>{"\ud83d\udd0d"}</Text><TextInput style={h.searchInput} placeholder="Search gates, food, lounges, shops..." placeholderTextColor={C.gray} /></View>
        <View style={{ marginTop: 20 }}>
          <View style={h.sectionHeader}><Text style={h.sectionTitle}>What's happening at ONT</Text><Text style={h.sectionLink}>See all</Text></View>
          <ScrollView ref={promoRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }} decelerationRate="fast" snapToInterval={SW - 40} snapToAlignment="start"
            onMomentumScrollEnd={e => { const idx = Math.round(e.nativeEvent.contentOffset.x / (SW - 40)); if (idx >= 0 && idx < PROMOS.length) setActivePromo(idx); }}>
            {PROMOS.map(p => (
              <View key={p.id} style={[h.promoCard, { backgroundColor: p.bg, width: SW - 40 }]}>
                <Text style={h.promoTitle}>{p.title}</Text><Text style={[h.promoSub, { color: p.accent }]}>{p.sub}</Text>
                <View style={h.promoBtn}><Text style={h.promoBtnText}>Learn more</Text></View>
              </View>
            ))}
          </ScrollView>
          <View style={h.dots}>{PROMOS.map((_, i) => <View key={i} style={[h.dot, { width: i === activePromo ? 18 : 6, backgroundColor: i === activePromo ? C.gold : C.grayLight }]} />)}</View>
        </View>
        <View style={h.section}>
          <Text style={h.sectionTitle}>Quick access</Text>
          <View style={h.featureGrid}>
            {HOME_FEATURES.map(f => (
              <TouchableOpacity key={f.id} style={h.featureItem} onPress={() => onNavigate(f.id)}>
                <View style={h.featureIcon}><Text style={{ fontSize: 22 }}>{f.icon}</Text></View>
                <Text style={h.featureLabel}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[h.section, { paddingBottom: 30 }]}>
          <View style={h.sectionHeader}><Text style={h.sectionTitle}>Explore ONT businesses</Text><Text style={h.sectionLink}>View all</Text></View>
          {ADS.map(ad => (
            <View key={ad.id} style={h.adCard}>
              <View style={{ flexDirection: "row", gap: 14 }}>
                <View style={[h.adIcon, { backgroundColor: ad.color + "18" }]}><Text style={{ fontSize: 26 }}>{ad.icon}</Text></View>
                <View style={{ flex: 1 }}><Text style={h.adName}>{ad.name}</Text><Text style={h.adTag}>{ad.tag}</Text><Text style={h.adDesc}>{ad.desc}</Text></View>
              </View>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                <TouchableOpacity style={h.adBtnOut}><Text style={h.adBtnOutText}>View details</Text></TouchableOpacity>
                <TouchableOpacity style={h.adBtnFill} onPress={() => onNavigate("map")}><Text style={h.adBtnFillText}>Navigate</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomTab active="home" onNavigate={onNavigate} />
    </View>
  );
}

// ==================== FLIGHT SCANNER ====================
function FlightScanner({ onNavigate }) {
  const [tab, setTab] = useState("dep");
  const [search, setSearch] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [myFlight, setMyFlight] = useState(null);

  const flights = FLIGHTS_DATA.filter(f => f.type === tab && (search.length === 0 || f.fn.toLowerCase().includes(search.toLowerCase()) || f.airline.toLowerCase().includes(search.toLowerCase()) || (f.dest || "").toLowerCase().includes(search.toLowerCase()) || (f.from || "").toLowerCase().includes(search.toLowerCase())));

  const groups = [
    { label: "Boarding now", data: flights.filter(f => f.status === "Boarding" && f.fn !== myFlight) },
    { label: tab === "dep" ? "Upcoming" : "Arriving", data: flights.filter(f => f.status === "On time" && f.fn !== myFlight) },
    { label: "Delayed", data: flights.filter(f => f.status === "Delayed" && f.fn !== myFlight) },
    { label: "Other", data: flights.filter(f => !["Boarding", "On time", "Delayed"].includes(f.status) && f.fn !== myFlight) },
  ].filter(g => g.data.length > 0);

  const pinned = myFlight ? FLIGHTS_DATA.find(f => f.fn === myFlight) : null;

  function FlightRow({ f }) {
    const sc = STATUS_COLORS[f.status] || STATUS_COLORS["On time"];
    return (
      <TouchableOpacity style={fl.row} onPress={() => setSelectedFlight(f)}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={fl.airIcon}><Text style={{ fontSize: 14, fontWeight: "700", color: C.gold }}>{f.airline[0]}</Text></View>
            <View><Text style={{ fontSize: 15, fontWeight: "700", color: C.navy }}>{f.fn}</Text><Text style={{ fontSize: 12, color: C.gray }}>{f.airline}</Text></View>
          </View>
          <View style={[fl.badge, { backgroundColor: sc.bg }]}><View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: sc.dot }} /><Text style={{ fontSize: 11, fontWeight: "600", color: sc.color }}>{f.status}</Text></View>
        </View>
        <View style={fl.meta}>
          <View><Text style={fl.metaL}>{tab === "dep" ? "To" : "From"}</Text><Text style={fl.metaV}>{f.dest || f.from}</Text></View>
          <View><Text style={fl.metaL}>Gate</Text><Text style={fl.metaV}>{f.gate}</Text></View>
          <View><Text style={fl.metaL}>Time</Text><Text style={fl.metaV}>{f.time}</Text></View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={fl.container}><StatusBar barStyle="light-content" />
      <View style={fl.header}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4, paddingTop: 4 }}>
          <TouchableOpacity style={fl.backBtn} onPress={() => onNavigate("home")}><Text style={{ fontSize: 16, color: C.white }}>{"\u2190"}</Text></TouchableOpacity>
          <Text style={{ fontSize: 17, fontWeight: "700", color: C.white }}>Flight scanner</Text>
          <View style={{ width: 36 }} />
        </View>
        <Text style={{ fontSize: 12, color: C.gold, fontWeight: "600", letterSpacing: 1, textAlign: "center", marginBottom: 12 }}>{"KONT \u00b7 TODAY"}</Text>
        <View style={fl.toggleRow}>
          <TouchableOpacity style={[fl.toggleBtn, tab === "dep" && fl.toggleActive]} onPress={() => { setTab("dep"); setSearch(""); }}><Text style={[fl.toggleText, tab === "dep" && fl.toggleActiveText]}>Departures</Text></TouchableOpacity>
          <TouchableOpacity style={[fl.toggleBtn, tab === "arr" && fl.toggleActive]} onPress={() => { setTab("arr"); setSearch(""); }}><Text style={[fl.toggleText, tab === "arr" && fl.toggleActiveText]}>Arrivals</Text></TouchableOpacity>
        </View>
        <View style={fl.searchWrap}><Text style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{"\ud83d\udd0d"}</Text><TextInput style={fl.searchInput} placeholder="Search flight, airline, city..." placeholderTextColor="rgba(255,255,255,0.3)" value={search} onChangeText={setSearch} /></View>
      </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {pinned && !search && (
          <View style={[fl.row, { borderLeftWidth: 3, borderLeftColor: C.gold, backgroundColor: C.goldBg, marginTop: 14 }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={fl.airIcon}><Text style={{ fontSize: 14, fontWeight: "700", color: C.gold }}>{pinned.airline[0]}</Text></View>
                <View><View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}><Text style={{ fontSize: 15, fontWeight: "700", color: C.navy }}>{pinned.fn}</Text><View style={{ backgroundColor: C.white, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}><Text style={{ fontSize: 9, fontWeight: "700", color: C.gold }}>MY FLIGHT</Text></View></View><Text style={{ fontSize: 12, color: C.gray }}>{pinned.airline}</Text></View>
              </View>
              <View style={[fl.badge, { backgroundColor: (STATUS_COLORS[pinned.status] || STATUS_COLORS["On time"]).bg }]}><View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: (STATUS_COLORS[pinned.status] || STATUS_COLORS["On time"]).dot }} /><Text style={{ fontSize: 11, fontWeight: "600", color: (STATUS_COLORS[pinned.status] || STATUS_COLORS["On time"]).color }}>{pinned.status}</Text></View>
            </View>
            <View style={fl.meta}>
              <View><Text style={fl.metaL}>{pinned.type === "dep" ? "To" : "From"}</Text><Text style={fl.metaV}>{pinned.dest || pinned.from}</Text></View>
              <View><Text style={fl.metaL}>Gate</Text><Text style={fl.metaV}>{pinned.gate}</Text></View>
              <View><Text style={fl.metaL}>Time</Text><Text style={fl.metaV}>{pinned.time}</Text></View>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <TouchableOpacity style={[fl.actBtn, { backgroundColor: C.navy }]}><Text style={{ fontSize: 11, fontWeight: "700", color: C.gold }}>Navigate to gate</Text></TouchableOpacity>
              <TouchableOpacity style={[fl.actBtn, { borderWidth: 1, borderColor: C.grayLight }]} onPress={() => setMyFlight(null)}><Text style={{ fontSize: 11, fontWeight: "600", color: C.navy }}>Remove</Text></TouchableOpacity>
            </View>
          </View>
        )}
        {groups.map(g => (
          <View key={g.label}><Text style={fl.secLabel}>{g.label}</Text>{g.data.map(f => <FlightRow key={f.fn} f={f} />)}</View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
      {selectedFlight && (
        <TouchableOpacity style={fl.overlay} activeOpacity={1} onPress={() => setSelectedFlight(null)}>
          <View style={fl.sheet}>
            <View style={fl.handle} />
            <Text style={{ fontSize: 22, fontWeight: "800", color: C.navy }}>{selectedFlight.fn}</Text>
            <Text style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>{selectedFlight.airline}</Text>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
              <View style={fl.detailBox}><Text style={fl.detailL}>{tab === "dep" ? "Destination" : "Origin"}</Text><Text style={fl.detailV}>{selectedFlight.dest || selectedFlight.from}</Text></View>
              <View style={fl.detailBox}><Text style={fl.detailL}>Gate</Text><Text style={[fl.detailV, { fontSize: 20 }]}>{selectedFlight.gate}</Text></View>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
              <View style={fl.detailBox}><Text style={fl.detailL}>{tab === "dep" ? "Departs" : "Arrives"}</Text><Text style={[fl.detailV, { fontSize: 20 }]}>{selectedFlight.time}</Text></View>
              <View style={fl.detailBox}><Text style={fl.detailL}>Terminal</Text><Text style={[fl.detailV, { fontSize: 20 }]}>2</Text></View>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity style={{ flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: C.navy, alignItems: "center" }} onPress={() => { setMyFlight(selectedFlight.fn); setSelectedFlight(null); }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: C.gold }}>{myFlight === selectedFlight.fn ? "Remove my flight" : "Set as my flight"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1.5, borderColor: C.grayLight, alignItems: "center" }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: C.navy }}>Navigate to gate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <BottomTab active="flights" onNavigate={onNavigate} />
    </View>
  );
}

// ==================== TSA WAIT TIMES ====================
function TSAScreen({ onNavigate }) {
  const [expandedCp, setExpandedCp] = useState(null);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [reportCp, setReportCp] = useState(null);
  const [reportVal, setReportVal] = useState(15);
  const [submitted, setSubmitted] = useState(false);

  function submitReport() { setSubmitted(true); setTimeout(() => { setSubmitted(false); setReportCp(null); setReportVal(15); }, 1500); }

  return (
    <View style={t.container}><StatusBar barStyle="light-content" />
      <View style={t.header}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6, paddingTop: 4 }}>
          <TouchableOpacity style={t.backBtn} onPress={() => onNavigate("home")}><Text style={{ fontSize: 16, color: C.white }}>{"\u2190"}</Text></TouchableOpacity>
          <Text style={{ fontSize: 17, fontWeight: "700", color: C.white }}>TSA wait times</Text>
          <View style={{ width: 36 }} />
        </View>
        <Text style={{ fontSize: 12, color: C.gold, fontWeight: "600", letterSpacing: 1, textAlign: "center", marginBottom: 6 }}>{"KONT \u00b7 LIVE ESTIMATES"}</Text>
        <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Crowd-sourced by ONT travelers</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity style={t.tipsHeader} onPress={() => setTipsOpen(!tipsOpen)}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={t.tipIcon}><Text style={{ fontSize: 14 }}>{"\ud83d\udca1"}</Text></View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: C.navy }}>Tips for faster screening</Text>
          </View>
          <Text style={{ fontSize: 16, color: C.gray }}>{tipsOpen ? "\u25b4" : "\u25be"}</Text>
        </TouchableOpacity>
        {tipsOpen && <View style={t.tipsBody}>
          {["Have your boarding pass and ID ready", "Remove laptops and liquids from bags", "Wear easy-to-remove shoes and belts", "Consider TSA PreCheck for expedited screening"].map((tip, i) => (
            <View key={i} style={t.tipRow}><View style={t.tipBullet}><Text style={{ fontSize: 11, fontWeight: "700", color: "#8b6914" }}>{i + 1}</Text></View><Text style={t.tipText}>{tip}</Text></View>
          ))}
        </View>}
        <View style={t.summaryBar}>
          <View style={t.sumItem}><Text style={t.sumLabel}>Avg. wait</Text><Text style={t.sumVal}>{Math.round(TSA_CHECKPOINTS.reduce((a, c) => a + c.wait, 0) / TSA_CHECKPOINTS.length)} min</Text></View>
          <View style={t.divider} /><View style={t.sumItem}><Text style={t.sumLabel}>Reports</Text><Text style={t.sumVal}>{TSA_CHECKPOINTS.reduce((a, c) => a + c.reports, 0)}</Text></View>
          <View style={t.divider} /><View style={t.sumItem}><Text style={t.sumLabel}>Best</Text><Text style={[t.sumVal, { fontSize: 14, color: "#0a7c4f" }]}>{TSA_CHECKPOINTS.reduce((a, c) => c.wait < a.wait ? c : a).name.replace("TSA ", "")}</Text></View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={t.secLabel}>Checkpoints</Text>
          {TSA_CHECKPOINTS.map(cp => {
            const open = expandedCp === cp.id;
            return (
              <View key={cp.id} style={t.cpCard}>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} onPress={() => setExpandedCp(open ? null : cp.id)}>
                  <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                    <View style={[t.waitBadge, { backgroundColor: waitBg(cp.wait) }]}><Text style={{ fontSize: 18, fontWeight: "800", color: waitColor(cp.wait) }}>{cp.wait}</Text><Text style={{ fontSize: 9, fontWeight: "600", color: waitColor(cp.wait) }}>min</Text></View>
                    <View><Text style={{ fontSize: 15, fontWeight: "700", color: C.navy }}>{cp.name}</Text><View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 }}><Text style={{ fontSize: 12, fontWeight: "600", color: waitColor(cp.wait) }}>{waitLabel(cp.wait)}</Text><Text style={{ fontSize: 11, color: trendColor(cp.trend) }}>{trendIcon(cp.trend)} {cp.trend}</Text></View></View>
                  </View>
                  <Text style={{ fontSize: 18, color: C.gray }}>{open ? "\u25b4" : "\u25be"}</Text>
                </TouchableOpacity>
                {open && <View style={{ marginTop: 14, borderTopWidth: 1, borderTopColor: C.grayLight, paddingTop: 14 }}>
                  <Text style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>{cp.location} {"\u00b7"} {cp.hours}</Text>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <View style={t.metaChip}><Text style={{ fontSize: 10, color: C.gray }}>Reports</Text><Text style={{ fontSize: 13, fontWeight: "700", color: C.navy }}>{cp.reports}</Text></View>
                    <View style={t.metaChip}><Text style={{ fontSize: 10, color: C.gray }}>Last report</Text><Text style={{ fontSize: 13, fontWeight: "700", color: C.navy }}>{cp.lastReport}</Text></View>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6, marginTop: 10 }}>{cp.lanes.map(l => <View key={l} style={t.lanePill}><Text style={{ fontSize: 11, fontWeight: "500", color: "#8b6914" }}>{l}</Text></View>)}</View>
                  <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
                    <TouchableOpacity style={t.reportBtn} onPress={() => setReportCp(cp)}><Text style={{ fontSize: 13, fontWeight: "600", color: C.navy }}>Report wait time</Text></TouchableOpacity>
                    <TouchableOpacity style={t.navBtn}><Text style={{ fontSize: 13, fontWeight: "700", color: C.gold }}>Navigate</Text></TouchableOpacity>
                  </View>
                </View>}
              </View>
            );
          })}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
      {reportCp && (
        <TouchableOpacity style={t.overlay} activeOpacity={1} onPress={() => { setReportCp(null); setSubmitted(false); }}>
          <View style={t.sheet}>
            <View style={t.handle} />
            {submitted ? (
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: "#e6f9f0", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><Text style={{ fontSize: 24 }}>{"\u2713"}</Text></View>
                <Text style={{ fontSize: 18, fontWeight: "700", color: C.navy }}>Thanks for reporting!</Text>
                <Text style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>Your report helps fellow travelers.</Text>
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 18, fontWeight: "700", color: C.navy, marginBottom: 4 }}>Report wait time</Text>
                <Text style={{ fontSize: 13, color: C.gray, marginBottom: 20 }}>{reportCp.name}</Text>
                <Text style={{ textAlign: "center", fontSize: 48, fontWeight: "800", color: waitColor(reportVal) }}>{reportVal}<Text style={{ fontSize: 18, fontWeight: "600", color: C.gray }}> min</Text></Text>
                <View style={{ alignItems: "center", marginVertical: 12 }}><View style={{ paddingVertical: 5, paddingHorizontal: 16, borderRadius: 20, backgroundColor: waitBg(reportVal) }}><Text style={{ fontSize: 13, fontWeight: "600", color: waitColor(reportVal) }}>{waitLabel(reportVal)}</Text></View></View>
                <View style={{ flexDirection: "row", gap: 6, marginBottom: 16 }}>
                  {[5, 10, 15, 20, 30, 45].map(v => <TouchableOpacity key={v} style={[t.quickBtn, reportVal === v && { backgroundColor: C.navy, borderColor: C.navy }]} onPress={() => setReportVal(v)}><Text style={[{ fontSize: 12, fontWeight: "600", color: C.navy }, reportVal === v && { color: C.gold }]}>{v}m</Text></TouchableOpacity>)}
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TouchableOpacity style={{ flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1.5, borderColor: C.grayLight, alignItems: "center" }} onPress={() => setReportCp(null)}><Text style={{ fontSize: 14, fontWeight: "600", color: C.navy }}>Cancel</Text></TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: C.navy, alignItems: "center" }} onPress={submitReport}><Text style={{ fontSize: 14, fontWeight: "700", color: C.gold }}>Submit report</Text></TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      <BottomTab active="home" onNavigate={onNavigate} />
    </View>
  );
}

// ==================== BOTTOM TAB BAR ====================
function BottomTab({ active, onNavigate }) {
  const tabs = [
    { id: "home", icon: "\ud83c\udfe0", label: "Home" },
    { id: "map", icon: "\ud83d\uddfa", label: "Map" },
    { id: "flights", icon: "\u2708", label: "My flight" },
    { id: "profile", icon: "\ud83d\udc64", label: "Profile" },
  ];
  return (
    <View style={bt.bar}>
      {tabs.map(tab => (
        <TouchableOpacity key={tab.id} style={bt.tab} onPress={() => onNavigate(tab.id)}>
          <Text style={{ fontSize: 20 }}>{tab.icon}</Text>
          <Text style={[bt.label, active === tab.id && { color: C.gold, fontWeight: "700" }]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ==================== APP ROOT ====================
export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [screen, setScreen] = useState("home");

  if (showWelcome) return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;

  switch (screen) {
    case "home": return <HomeScreen onNavigate={setScreen} />;
    case "flights": return <FlightScanner onNavigate={setScreen} />;
    case "tsa": return <TSAScreen onNavigate={setScreen} />;
    case "map": return <HomeScreen onNavigate={setScreen} />;
    default: return <HomeScreen onNavigate={setScreen} />;
  }
}

// ==================== STYLES ====================
const w = StyleSheet.create({
  hero: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: C.navy },
  badge: { backgroundColor: "rgba(201,168,76,0.12)", borderRadius: 30, paddingVertical: 6, paddingHorizontal: 16, marginBottom: 40 },
  badgeText: { fontSize: 11, fontWeight: "600", color: C.gold, letterSpacing: 1.5 },
  logoBox: { width: 72, height: 72, borderRadius: 20, backgroundColor: "rgba(201,168,76,0.1)", alignItems: "center", justifyContent: "center", marginBottom: 20, borderWidth: 1, borderColor: "rgba(201,168,76,0.2)" },
  title: { fontSize: 34, fontWeight: "800", color: C.white, marginBottom: 12 },
  tagline: { fontSize: 16, color: "rgba(255,255,255,0.75)", textAlign: "center", lineHeight: 24, marginBottom: 48 },
  btnGroup: { width: "100%", maxWidth: 320, alignItems: "center" },
  signupBtn: { width: "100%", paddingVertical: 15, borderRadius: 14, backgroundColor: C.gold, alignItems: "center", marginBottom: 10 },
  signupBtnText: { fontSize: 16, fontWeight: "700", color: C.navy },
  loginBtn: { width: "100%", paddingVertical: 15, borderRadius: 14, borderWidth: 2, borderColor: "rgba(201,168,76,0.3)", alignItems: "center" },
  loginBtnText: { fontSize: 15, fontWeight: "600", color: C.gold },
  guestLink: { fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: "500", marginTop: 20 },
  footer: { position: "absolute", bottom: 28, fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: 3, fontWeight: "600" },
  formBg: { flex: 1, backgroundColor: C.white, justifyContent: "center" },
  formInner: { padding: 32 },
  back: { fontSize: 15, color: C.gold, fontWeight: "600", marginBottom: 24 },
  formTitle: { fontSize: 24, fontWeight: "700", color: C.navy, marginBottom: 4 },
  formSub: { fontSize: 14, color: C.gray, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: "600", color: "#444", marginBottom: 6, marginTop: 16 },
  input: { width: "100%", paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1.5, borderColor: C.grayLight, fontSize: 15, backgroundColor: "#fafafa" },
  primaryBtn: { width: "100%", paddingVertical: 14, borderRadius: 14, backgroundColor: C.navy, alignItems: "center", marginTop: 24 },
  primaryBtnText: { fontSize: 16, fontWeight: "700", color: C.gold },
  switchText: { textAlign: "center", marginTop: 16, fontSize: 13, color: C.gray },
  switchLink: { color: C.gold, fontWeight: "600" },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(201,168,76,0.12)", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  readyTitle: { fontSize: 26, fontWeight: "700", color: C.white, marginBottom: 8 },
  readySubtitle: { fontSize: 15, color: "rgba(255,255,255,0.75)", textAlign: "center", lineHeight: 22, marginBottom: 32, maxWidth: 280 },
  readyBtn: { backgroundColor: C.gold, paddingVertical: 14, paddingHorizontal: 48, borderRadius: 14 },
  readyBtnText: { fontSize: 16, fontWeight: "700", color: C.navy },
});

const h = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { backgroundColor: C.navy, paddingHorizontal: 20, paddingTop: 50, paddingBottom: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerSub: { fontSize: 11, color: C.gold, fontWeight: "600", letterSpacing: 1.5, marginBottom: 4 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: C.white },
  profileBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(201,168,76,0.3)" },
  searchWrap: { marginHorizontal: 20, marginTop: -18, backgroundColor: C.white, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 10, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, elevation: 4, zIndex: 5 },
  searchInput: { flex: 1, fontSize: 15, color: C.navy },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: C.navy },
  sectionLink: { fontSize: 12, color: C.gold, fontWeight: "600" },
  section: { marginHorizontal: 20, marginTop: 24 },
  promoCard: { height: 140, borderRadius: 18, padding: 18, justifyContent: "center" },
  promoTitle: { fontSize: 18, fontWeight: "800", color: C.white, marginBottom: 6, lineHeight: 24 },
  promoSub: { fontSize: 12, fontWeight: "600" },
  promoBtn: { marginTop: 10, backgroundColor: "rgba(255,255,255,0.15)", alignSelf: "flex-start", paddingVertical: 5, paddingHorizontal: 14, borderRadius: 20 },
  promoBtnText: { fontSize: 11, fontWeight: "600", color: C.white },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 10 },
  dot: { height: 6, borderRadius: 3 },
  featureGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 2 },
  featureItem: { width: (SW - 64) / 3, alignItems: "center", gap: 8, paddingVertical: 16, backgroundColor: C.white, borderRadius: 16, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  featureIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center" },
  featureLabel: { fontSize: 12, fontWeight: "600", color: C.navy, textAlign: "center" },
  adCard: { backgroundColor: C.white, borderRadius: 18, padding: 16, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  adIcon: { width: 56, height: 56, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  adName: { fontSize: 15, fontWeight: "700", color: C.navy },
  adTag: { fontSize: 11, color: C.gold, fontWeight: "600", marginTop: 1 },
  adDesc: { fontSize: 12, color: C.gray, marginTop: 4, lineHeight: 18 },
  adBtnOut: { flex: 1, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: C.grayLight, alignItems: "center" },
  adBtnOutText: { fontSize: 12, fontWeight: "600", color: C.navy },
  adBtnFill: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: C.navy, alignItems: "center" },
  adBtnFillText: { fontSize: 12, fontWeight: "700", color: C.gold },
});

const fl = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { backgroundColor: C.navy, padding: 16, paddingTop: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, zIndex: 10 },
  backBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  toggleRow: { flexDirection: "row", gap: 4, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 3, marginBottom: 10 },
  toggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center" },
  toggleActive: { backgroundColor: C.gold },
  toggleText: { fontSize: 13, fontWeight: "600", color: "rgba(255,255,255,0.4)" },
  toggleActiveText: { color: C.navy, fontWeight: "700" },
  searchWrap: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 12, paddingVertical: 9, paddingHorizontal: 14 },
  searchInput: { flex: 1, fontSize: 14, color: C.white },
  row: { backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 8, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  airIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: C.navyLight, alignItems: "center", justifyContent: "center" },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  meta: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: C.grayLight },
  metaL: { fontSize: 10, color: C.gray, fontWeight: "500" },
  metaV: { fontSize: 13, fontWeight: "600", color: C.navy },
  actBtn: { flex: 1, paddingVertical: 7, borderRadius: 8, alignItems: "center" },
  secLabel: { fontSize: 11, fontWeight: "700", color: C.gray, textTransform: "uppercase", letterSpacing: 1.2, marginTop: 18, marginBottom: 8 },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(12,27,46,0.5)", justifyContent: "flex-end", zIndex: 50 },
  sheet: { backgroundColor: C.white, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 20, paddingBottom: 28 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: C.grayLight, alignSelf: "center", marginBottom: 14 },
  detailBox: { flex: 1, backgroundColor: C.bg, borderRadius: 12, padding: 10 },
  detailL: { fontSize: 10, color: C.gray, fontWeight: "500", textTransform: "uppercase", letterSpacing: 0.5 },
  detailV: { fontSize: 14, fontWeight: "700", color: C.navy, marginTop: 4 },
});

const t = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { backgroundColor: C.navy, padding: 16, paddingTop: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, zIndex: 10 },
  backBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  tipsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: C.white, borderRadius: 14, padding: 12, marginHorizontal: 16, marginTop: 14, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  tipIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center" },
  tipsBody: { backgroundColor: C.white, borderBottomLeftRadius: 14, borderBottomRightRadius: 14, paddingHorizontal: 14, paddingBottom: 14, marginHorizontal: 16, marginTop: -4 },
  tipRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  tipBullet: { width: 22, height: 22, borderRadius: 11, backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center" },
  tipText: { fontSize: 13, color: C.navy, lineHeight: 18 },
  summaryBar: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: C.white, marginHorizontal: 16, marginTop: 12, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 8, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  sumItem: { alignItems: "center", gap: 2 },
  sumLabel: { fontSize: 11, color: C.gray },
  sumVal: { fontSize: 20, fontWeight: "800", color: C.navy },
  divider: { width: 1, height: 32, backgroundColor: C.grayLight },
  secLabel: { fontSize: 11, fontWeight: "700", color: C.gray, textTransform: "uppercase", letterSpacing: 1.2, marginTop: 20, marginBottom: 10 },
  cpCard: { backgroundColor: C.white, borderRadius: 18, padding: 16, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  waitBadge: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  metaChip: { flex: 1, padding: 8, backgroundColor: C.bg, borderRadius: 10, gap: 2 },
  lanePill: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20, backgroundColor: C.goldBg },
  reportBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, borderColor: C.grayLight, alignItems: "center" },
  navBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: C.navy, alignItems: "center" },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(12,27,46,0.5)", justifyContent: "flex-end", zIndex: 50 },
  sheet: { backgroundColor: C.white, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 20, paddingBottom: 28 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: C.grayLight, alignSelf: "center", marginBottom: 14 },
  quickBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: C.grayLight, alignItems: "center" },
});

const bt = StyleSheet.create({
  bar: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10, paddingBottom: 20, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.grayLight },
  tab: { alignItems: "center", gap: 2 },
  label: { fontSize: 10, fontWeight: "500", color: C.gray },
});