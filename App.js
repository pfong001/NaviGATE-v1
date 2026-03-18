import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Dimensions } from "react-native";

const T = { primary: "#0e9e8e", dark: "#0a2e3c", bright: "#14c8b0", light: "#e6faf7" };

const FLOORS = [
  { id: 1, label: "1", subtitle: "Arrivals" },
  { id: 2, label: "2", subtitle: "Departures" },
  { id: 3, label: "3", subtitle: "Lounges" },
];

const POIS = [
  { id: 1, name: "Gate A1", cat: "Gate", floor: 2, icon: "✈", rating: null, hours: null, amenities: [] },
  { id: 2, name: "Gate A2", cat: "Gate", floor: 2, icon: "✈", rating: null, hours: null, amenities: [] },
  { id: 3, name: "Gate A3", cat: "Gate", floor: 2, icon: "✈", rating: null, hours: null, amenities: [] },
  { id: 4, name: "Gate B1", cat: "Gate", floor: 2, icon: "✈", rating: null, hours: null, amenities: [] },
  { id: 5, name: "Gate B2", cat: "Gate", floor: 2, icon: "✈", rating: null, hours: null, amenities: [] },
  { id: 6, name: "Escape Lounge", cat: "Lounge", floor: 3, icon: "🛋", rating: 4.6, hours: "5:00 AM - 9:00 PM", amenities: ["Wi-Fi", "Premium Bar", "Hot Food", "Showers"] },
  { id: 7, name: "USO Lounge", cat: "Lounge", floor: 3, icon: "🛋", rating: 4.8, hours: "6:00 AM - 10:00 PM", amenities: ["Wi-Fi", "Snacks", "TV", "Quiet Zone"] },
  { id: 8, name: "Starbucks", cat: "Coffee", floor: 2, icon: "☕", rating: 4.2, hours: "4:30 AM - 8:00 PM", amenities: ["Wi-Fi", "Mobile Order"] },
  { id: 9, name: "McDonald's", cat: "Dining", floor: 2, icon: "🍔", rating: 3.8, hours: "5:00 AM - 9:00 PM", amenities: ["Wi-Fi", "Quick Service"] },
  { id: 10, name: "El Pollo Loco", cat: "Dining", floor: 2, icon: "🍗", rating: 4.0, hours: "5:30 AM - 8:30 PM", amenities: ["Quick Service"] },
  { id: 11, name: "Hudson News", cat: "Retail", floor: 2, icon: "🛍", rating: 3.9, hours: "5:00 AM - 9:00 PM", amenities: ["Snacks", "Magazines", "Travel Gear"] },
  { id: 12, name: "Baggage Claim A", cat: "Service", floor: 1, icon: "🧳", rating: null, hours: "24/7", amenities: ["Carousel A1", "Carousel A2"] },
  { id: 13, name: "Baggage Claim B", cat: "Service", floor: 1, icon: "🧳", rating: null, hours: "24/7", amenities: ["Carousel B1", "Carousel B2"] },
  { id: 14, name: "Ground Transport", cat: "Service", floor: 1, icon: "🚌", rating: null, hours: "24/7", amenities: ["Rideshare", "Taxi", "Shuttle"] },
  { id: 15, name: "Information Desk", cat: "Service", floor: 1, icon: "ℹ️", rating: null, hours: "6:00 AM - 10:00 PM", amenities: ["Directions", "Lost & Found"] },
];

const CAT_COLORS = { Gate: "#0e9e8e", Lounge: "#7c6bc4", Coffee: "#c8850f", Dining: "#d4693e", Retail: "#c45488", Service: "#3a8fd4" };

const CARDS = { "Amex Platinum": ["Escape Lounge"], "Chase Sapphire Reserve": ["Escape Lounge"], "Capital One Venture X": ["Escape Lounge"] };

const FILTERS = ["Gates", "Dining", "Coffee", "Lounges", "Retail"];

// ========== WELCOME SCREEN ==========
function WelcomeScreen({ onComplete }) {
  const [screen, setScreen] = useState("welcome");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (screen === "signup") return (
    <View style={w.formBg}>
      <StatusBar barStyle="dark-content" />
      <View style={w.formInner}>
        <TouchableOpacity onPress={() => setScreen("welcome")}><Text style={w.back}>← Back</Text></TouchableOpacity>
        <Text style={w.formTitle}>Create account</Text>
        <Text style={w.formSub}>Start navigating ONT like a pro.</Text>
        <Text style={w.label}>Full name</Text>
        <TextInput style={w.input} placeholder="e.g. Alex Rivera" value={name} onChangeText={setName} />
        <Text style={w.label}>Email</Text>
        <TextInput style={w.input} placeholder="you@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={w.label}>Password</Text>
        <TextInput style={w.input} placeholder="6+ characters" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={w.primaryBtn} onPress={() => setScreen("ready")}><Text style={w.primaryBtnText}>Create account</Text></TouchableOpacity>
        <Text style={w.switchText}>Already have an account? <Text style={w.switchLink} onPress={() => setScreen("login")}>Log in</Text></Text>
      </View>
    </View>
  );

  if (screen === "login") return (
    <View style={w.formBg}>
      <StatusBar barStyle="dark-content" />
      <View style={w.formInner}>
        <TouchableOpacity onPress={() => setScreen("welcome")}><Text style={w.back}>← Back</Text></TouchableOpacity>
        <Text style={w.formTitle}>Welcome back</Text>
        <Text style={w.formSub}>Log in to pick up where you left off.</Text>
        <Text style={w.label}>Email</Text>
        <TextInput style={w.input} placeholder="you@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={w.label}>Password</Text>
        <TextInput style={w.input} placeholder="Your password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={w.primaryBtn} onPress={() => setScreen("ready")}><Text style={w.primaryBtnText}>Log in</Text></TouchableOpacity>
        <Text style={w.switchText}>Don't have an account? <Text style={w.switchLink} onPress={() => setScreen("signup")}>Sign up</Text></Text>
      </View>
    </View>
  );

  if (screen === "ready") return (
    <View style={w.hero}>
      <StatusBar barStyle="light-content" />
      <View style={w.checkCircle}><Text style={{ fontSize: 36, color: "#fff" }}>✓</Text></View>
      <Text style={w.readyTitle}>You're all set</Text>
      <Text style={w.readySubtitle}>Your ONT Navigator is ready. Find your gate, unlock lounge perks, and never miss a flight.</Text>
      <TouchableOpacity style={w.readyBtn} onPress={onComplete}><Text style={w.readyBtnText}>Open the map</Text></TouchableOpacity>
    </View>
  );

  return (
    <View style={w.hero}>
      <StatusBar barStyle="light-content" />
      <View style={w.badge}><Text style={w.badgeText}>ONTARIO INTERNATIONAL AIRPORT</Text></View>
      <View style={w.logoBox}><Text style={{ fontSize: 28, color: "#fff" }}>✈</Text></View>
      <Text style={w.title}>ONT Navigator</Text>
      <Text style={w.tagline}>{"Your gate. Your lounge. Your flight.\nAll in one tap."}</Text>
      <View style={w.btnGroup}>
        <TouchableOpacity style={w.signupBtn} onPress={() => setScreen("signup")}><Text style={w.signupBtnText}>Get started</Text></TouchableOpacity>
        <TouchableOpacity style={w.loginBtn} onPress={() => setScreen("login")}><Text style={w.loginBtnText}>I already have an account</Text></TouchableOpacity>
        <TouchableOpacity onPress={onComplete}><Text style={w.guestLink}>Continue as guest →</Text></TouchableOpacity>
      </View>
      <Text style={w.footer}>KONT · SoCal · Since 1923</Text>
    </View>
  );
}

// ========== HOME SCREEN ==========
function HomeScreen() {
  const [floor, setFloor] = useState(2);
  const [search, setSearch] = useState("");
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [route, setRoute] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wallet, setWallet] = useState([]);
  const [walletOpen, setWalletOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [flightSet, setFlightSet] = useState(false);
  const [flightExpanded, setFlightExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredPois = POIS.filter(p => {
    if (search.length > 0) return p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase());
    if (activeFilter) {
      const catMap = { Gates: "Gate", Lounges: "Lounge", Dining: "Dining", Coffee: "Coffee", Retail: "Retail" };
      return p.floor === floor && p.cat === catMap[activeFilter];
    }
    return p.floor === floor;
  });

  function selectPoi(poi) { setSelectedPoi(poi); setSearch(""); setActiveFilter(null); if (poi.floor !== floor) setFloor(poi.floor); }
  function hasAccess(name) { return wallet.some(c => (CARDS[c] || []).includes(name)); }
  function toggleCard(card) { setWallet(prev => prev.includes(card) ? prev.filter(c => c !== card) : [...prev, card]); }
  function setFlight() { setFlightSet(true); setScannerOpen(false); setFlightExpanded(true); }
  function toggleFilter(f) { setActiveFilter(prev => prev === f ? null : f); setSelectedPoi(null); }

  // ----- WALLET SCREEN -----
  if (walletOpen) return (
    <View style={h.overlay}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => setWalletOpen(false)}><Text style={h.backBtn}>← Back to map</Text></TouchableOpacity>
      <Text style={h.overlayTitle}>My wallet</Text>
      <Text style={h.overlaySub}>Select your credit cards to unlock lounge access badges on the map.</Text>
      {Object.keys(CARDS).map(card => (
        <TouchableOpacity key={card} style={[h.cardOption, wallet.includes(card) && h.cardOptionActive]} onPress={() => toggleCard(card)}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={[h.cardIcon, wallet.includes(card) && { backgroundColor: T.light }]}><Text style={{ fontSize: 16 }}>💳</Text></View>
            <View><Text style={h.cardName}>{card}</Text><Text style={h.cardSub}>Lounge access card</Text></View>
          </View>
          {wallet.includes(card) && <Text style={{ color: T.primary, fontWeight: "700", fontSize: 18 }}>✓</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );

  // ----- FLIGHT SCANNER -----
  if (scannerOpen) return (
    <View style={h.overlay}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => setScannerOpen(false)}><Text style={h.backBtn}>← Back to map</Text></TouchableOpacity>
      <Text style={h.overlayTitle}>Flight scanner</Text>
      <Text style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>KONT departures · Today</Text>
      <TextInput style={h.searchInput} placeholder="Search flight, airline, city..." />
      <Text style={h.sectionLabel}>Boarding</Text>
      {[{ fn: "SW 1423", dest: "Los Angeles (LAX)", gate: "A2", time: "10:15 AM", status: "On time" },
        { fn: "UA 892", dest: "San Francisco (SFO)", gate: "B1", time: "10:30 AM", status: "On time" }].map(f => (
        <TouchableOpacity key={f.fn} style={h.flightRow} onPress={() => setFlight()}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={h.flightNum}>{f.fn}</Text>
            <View style={[h.statusBadge, { backgroundColor: "#e6f9f0" }]}><Text style={[h.statusText, { color: "#0a7c4f" }]}>{f.status}</Text></View>
          </View>
          <Text style={h.flightDest}>{f.dest} · Gate {f.gate} · {f.time}</Text>
        </TouchableOpacity>
      ))}
      <Text style={h.sectionLabel}>Upcoming</Text>
      {[{ fn: "DL 345", dest: "Atlanta (ATL)", gate: "A3", time: "11:45 AM", status: "On time" },
        { fn: "AA 1102", dest: "Dallas (DFW)", gate: "B2", time: "12:20 PM", status: "Delayed" },
        { fn: "SW 2281", dest: "Denver (DEN)", gate: "A1", time: "1:05 PM", status: "On time" }].map(f => (
        <TouchableOpacity key={f.fn} style={h.flightRow} onPress={() => setFlight()}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={h.flightNum}>{f.fn}</Text>
            <View style={[h.statusBadge, { backgroundColor: f.status === "Delayed" ? "#fce8e8" : "#e6f9f0" }]}>
              <Text style={[h.statusText, { color: f.status === "Delayed" ? "#c0392b" : "#0a7c4f" }]}>{f.status}</Text>
            </View>
          </View>
          <Text style={h.flightDest}>{f.dest} · Gate {f.gate} · {f.time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // ----- MENU -----
  if (menuOpen) return (
    <View style={h.menuOverlay}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity style={h.menuBackdrop} onPress={() => setMenuOpen(false)} activeOpacity={1} />
      <View style={h.menuPanel}>
        <Text style={h.menuTitle}>ONT Navigator</Text>
        <Text style={h.menuSub}>ONTARIO INTERNATIONAL</Text>
        {[{ icon: "🗺", label: "Map", action: () => setMenuOpen(false) },
          { icon: "📋", label: "Flight scanner", action: () => { setMenuOpen(false); setScannerOpen(true); } },
          { icon: "💳", label: "My wallet", action: () => { setMenuOpen(false); setWalletOpen(true); } },
          { icon: "👤", label: "Profile", action: () => setMenuOpen(false) }].map(item => (
          <TouchableOpacity key={item.label} style={h.menuItem} onPress={item.action}>
            <Text style={{ fontSize: 18 }}>{item.icon}</Text><Text style={h.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // ----- MAIN MAP SCREEN -----
  return (
    <View style={h.container}>
      <StatusBar barStyle="dark-content" />

      {/* Map area */}
      <TouchableOpacity style={h.mapArea} activeOpacity={1} onPress={() => { if (!route) setSelectedPoi(null); }}>
        <View style={h.terminalBox}>
          <Text style={h.terminalLabel}>ONT Terminal · {floor === 1 ? "Arrivals" : floor === 2 ? "Departures" : "Lounges"}</Text>
        </View>
        {/* POI grid */}
        <View style={h.poiGrid}>
          {filteredPois.map(p => (
            <TouchableOpacity key={p.id} style={h.poiItem} onPress={() => selectPoi(p)}>
              <View style={[h.poiDot, { backgroundColor: CAT_COLORS[p.cat] || "#888" }]}><Text style={h.poiIcon}>{p.icon}</Text></View>
              <Text style={h.poiName} numberOfLines={1}>{p.name}</Text>
            </TouchableOpacity>
          ))}
          {filteredPois.length === 0 && <Text style={{ color: "#aaa", fontSize: 14, padding: 20 }}>No results on this floor</Text>}
        </View>
        {route && (
          <View style={h.routeBanner}>
            <Text style={h.routeText}>Navigating to {route.name}...</Text>
            <TouchableOpacity onPress={() => setRoute(null)}><Text style={h.routeEnd}>End</Text></TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>

      {/* Header */}
      <View style={h.header}>
        <View style={h.headerTop}>
          <Text style={h.headerTitle}>ONT Navigator</Text>
          <TouchableOpacity style={h.hamburger} onPress={() => setMenuOpen(true)}>
            <Text style={{ fontSize: 20, color: T.dark }}>☰</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={h.searchInput} placeholder="Search gates, food, lounges..." value={search} onChangeText={v => { setSearch(v); setActiveFilter(null); setSelectedPoi(null); }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          {FILTERS.map(f => (
            <TouchableOpacity key={f} style={[h.filterPill, activeFilter === f && h.filterPillActive]} onPress={() => toggleFilter(f)}>
              <Text style={[h.filterText, activeFilter === f && h.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Floor switcher */}
      <View style={h.floorSwitcher}>
        {FLOORS.map(f => (
          <TouchableOpacity key={f.id} style={[h.floorBtn, floor === f.id && h.floorBtnActive]} onPress={() => { setFloor(f.id); setSelectedPoi(null); setActiveFilter(null); }}>
            <Text style={[h.floorBtnText, floor === f.id && h.floorBtnTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Detail Card */}
      {selectedPoi && !route && (
        <View style={h.detailCard}>
          <View style={h.cardHandle} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Text style={h.cardTitle}>{selectedPoi.name}</Text>
              <Text style={h.cardCat}>{selectedPoi.cat} · Level {selectedPoi.floor}</Text>
            </View>
            <View style={[h.cardIconBox, { backgroundColor: (CAT_COLORS[selectedPoi.cat] || "#888") + "18" }]}>
              <Text style={{ fontSize: 22 }}>{selectedPoi.icon}</Text>
            </View>
          </View>
          {selectedPoi.rating && (
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 8 }}>
              <Text style={{ color: "#f5a623", fontSize: 15 }}>★</Text>
              <Text style={{ fontWeight: "600" }}>{selectedPoi.rating}</Text>
              {selectedPoi.hours && <Text style={{ color: "#888", fontSize: 13 }}>· {selectedPoi.hours}</Text>}
            </View>
          )}
          {selectedPoi.cat === "Lounge" && (
            <View style={[h.accessBadge, hasAccess(selectedPoi.name) ? h.accessGranted : h.accessDenied]}>
              <Text style={[h.accessText, { color: hasAccess(selectedPoi.name) ? "#0a7c4f" : "#c0392b" }]}>
                {hasAccess(selectedPoi.name) ? "✓ Access granted" : wallet.length === 0 ? "Add cards in Wallet to check access" : "Requires: eligible card"}
              </Text>
            </View>
          )}
          {selectedPoi.amenities.length > 0 && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}>
              {selectedPoi.amenities.map(a => <View key={a} style={h.pill}><Text style={h.pillText}>{a}</Text></View>)}
            </View>
          )}
          <TouchableOpacity style={h.navBtn} onPress={() => { setRoute(selectedPoi); setSelectedPoi(null); }}>
            <Text style={h.navBtnText}>Navigate here</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Flight Widget */}
      {flightSet && !selectedPoi && !route && (
        <View style={h.flightWidget}>
          {flightExpanded ? (
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <View style={h.flightIconBox}><Text style={{ fontSize: 16 }}>✈</Text></View>
                  <View><Text style={h.flightWidgetNum}>SW 1423</Text><Text style={{ fontSize: 12, color: "#888" }}>ONT → LAX</Text></View>
                </View>
                <View style={[h.statusBadge, { backgroundColor: "#e6f9f0" }]}><Text style={[h.statusText, { color: "#0a7c4f" }]}>On time</Text></View>
              </View>
              <View style={h.flightDetails}>
                <View style={{ alignItems: "center" }}><Text style={h.flightDetailLabel}>Gate</Text><Text style={h.flightDetailVal}>A2</Text></View>
                <View style={{ alignItems: "center" }}><Text style={h.flightDetailLabel}>Boards</Text><Text style={h.flightDetailVal}>10:15 AM</Text></View>
                <View style={{ alignItems: "center" }}><Text style={h.flightDetailLabel}>Seat</Text><Text style={h.flightDetailVal}>14C</Text></View>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity style={h.widgetBtnOut} onPress={() => { const g = POIS.find(p => p.name === "Gate A2"); if (g) selectPoi(g); }}>
                  <Text style={h.widgetBtnOutText}>Navigate to gate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={h.widgetBtnFill}><Text style={h.widgetBtnFillText}>Boarding pass</Text></TouchableOpacity>
              </View>
              <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }} onPress={() => setFlightExpanded(false)}>
                <Text style={{ fontSize: 12, color: "#aaa" }}>— Collapse</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={h.flightPill} onPress={() => setFlightExpanded(true)}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 14, color: T.primary }}>✈</Text>
                <Text style={{ fontWeight: "700", fontSize: 14, color: T.dark }}>SW 1423</Text>
                <Text style={{ fontSize: 12, color: "#888" }}>Gate A2 · 10:15 AM</Text>
              </View>
              <Text style={{ fontSize: 12, color: "#0a7c4f", fontWeight: "600" }}>On time</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

// ========== APP ROOT ==========
export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  if (showWelcome) return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  return <HomeScreen />;
}

// ========== WELCOME STYLES ==========
const w = StyleSheet.create({
  hero: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: T.primary },
  badge: { backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 30, paddingVertical: 6, paddingHorizontal: 16, marginBottom: 40 },
  badgeText: { fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.9)", letterSpacing: 1.5 },
  logoBox: { width: 72, height: 72, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center", marginBottom: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.18)" },
  title: { fontSize: 34, fontWeight: "800", color: "#fff", marginBottom: 12 },
  tagline: { fontSize: 16, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 24, marginBottom: 48 },
  btnGroup: { width: "100%", maxWidth: 320, alignItems: "center" },
  signupBtn: { width: "100%", paddingVertical: 15, borderRadius: 14, backgroundColor: "#fff", alignItems: "center", marginBottom: 10 },
  signupBtnText: { fontSize: 16, fontWeight: "700", color: T.primary },
  loginBtn: { width: "100%", paddingVertical: 15, borderRadius: 14, borderWidth: 2, borderColor: "rgba(255,255,255,0.35)", alignItems: "center" },
  loginBtnText: { fontSize: 15, fontWeight: "600", color: "#fff" },
  guestLink: { fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: "500", marginTop: 20 },
  footer: { position: "absolute", bottom: 28, fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 3, fontWeight: "600" },
  formBg: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
  formInner: { padding: 32 },
  back: { fontSize: 15, color: T.primary, fontWeight: "600", marginBottom: 24 },
  formTitle: { fontSize: 24, fontWeight: "700", color: T.dark, marginBottom: 4 },
  formSub: { fontSize: 14, color: "#666", marginBottom: 28 },
  label: { fontSize: 13, fontWeight: "600", color: "#444", marginBottom: 6, marginTop: 16 },
  input: { width: "100%", paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1.5, borderColor: "#ddd", fontSize: 15, backgroundColor: "#fafafa" },
  primaryBtn: { width: "100%", paddingVertical: 14, borderRadius: 14, backgroundColor: T.primary, alignItems: "center", marginTop: 24 },
  primaryBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  switchText: { textAlign: "center", marginTop: 16, fontSize: 13, color: "#888" },
  switchLink: { color: "#12b8a4", fontWeight: "600" },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  readyTitle: { fontSize: 26, fontWeight: "700", color: "#fff", marginBottom: 8 },
  readySubtitle: { fontSize: 15, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 22, marginBottom: 32, maxWidth: 280 },
  readyBtn: { backgroundColor: "#fff", paddingVertical: 14, paddingHorizontal: 48, borderRadius: 14 },
  readyBtnText: { fontSize: 16, fontWeight: "700", color: T.primary },
});

// ========== HOME STYLES ==========
const h = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8e6de" },
  header: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, padding: 16, paddingTop: 50, backgroundColor: "rgba(232,230,222,0.95)" },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: T.dark },
  hamburger: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#ddd", alignItems: "center", justifyContent: "center" },
  searchInput: { width: "100%", paddingVertical: 11, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1.5, borderColor: "#ddd", fontSize: 15, backgroundColor: "#fff" },
  filterPill: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1.5, borderColor: "#ddd", backgroundColor: "#fff", marginRight: 6 },
  filterPillActive: { backgroundColor: T.primary, borderColor: T.primary },
  filterText: { fontSize: 13, fontWeight: "500", color: "#555" },
  filterTextActive: { color: "#fff" },
  mapArea: { flex: 1, paddingTop: 170, alignItems: "center" },
  terminalBox: { width: "85%", height: "55%", borderRadius: 16, borderWidth: 2, borderColor: "#c5c3bb", backgroundColor: "#f5f4ef", alignItems: "center", justifyContent: "center" },
  terminalLabel: { fontSize: 13, color: "#aaa", fontWeight: "600", letterSpacing: 2, textTransform: "uppercase" },
  poiGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 8, gap: 8, position: "absolute", top: 180, left: 10, right: 10 },
  poiItem: { alignItems: "center", width: 72, marginBottom: 4 },
  poiDot: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: 2.5, borderColor: "#fff" },
  poiIcon: { fontSize: 16, color: "#fff" },
  poiName: { fontSize: 10, fontWeight: "600", color: "#333", marginTop: 3, textAlign: "center", backgroundColor: "rgba(255,255,255,0.9)", paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4, overflow: "hidden" },
  floorSwitcher: { position: "absolute", right: 12, top: "50%", zIndex: 10, backgroundColor: "#fff", borderRadius: 14, padding: 4, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  floorBtn: { width: 42, height: 42, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  floorBtnActive: { backgroundColor: T.primary },
  floorBtnText: { fontWeight: "700", fontSize: 14, color: "#666" },
  floorBtnTextActive: { color: "#fff" },
  detailCard: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 20, paddingBottom: 32, zIndex: 25, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 16, elevation: 8 },
  cardHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: "#ddd", alignSelf: "center", marginBottom: 14 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: T.dark },
  cardCat: { fontSize: 13, color: "#888", marginTop: 2 },
  cardIconBox: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  accessBadge: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 10, marginTop: 10, alignSelf: "flex-start" },
  accessGranted: { backgroundColor: "#e6f9f0" },
  accessDenied: { backgroundColor: "#fce8e8" },
  accessText: { fontSize: 12, fontWeight: "600" },
  pill: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20, backgroundColor: "#f2f2f0", marginRight: 6, marginBottom: 6 },
  pillText: { fontSize: 12, color: "#555", fontWeight: "500" },
  navBtn: { paddingVertical: 12, backgroundColor: T.primary, borderRadius: 14, alignItems: "center", marginTop: 14 },
  navBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  routeBanner: { position: "absolute", bottom: 32, left: 16, right: 16, backgroundColor: T.primary, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  routeText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  routeEnd: { color: "#fff", fontWeight: "700", fontSize: 14, backgroundColor: "rgba(255,255,255,0.2)", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10 },
  flightWidget: { position: "absolute", bottom: 16, left: 16, right: 16, zIndex: 24, backgroundColor: "#fff", borderRadius: 18, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 12, elevation: 6 },
  flightPill: { paddingVertical: 11, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  flightIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: T.light, alignItems: "center", justifyContent: "center" },
  flightWidgetNum: { fontSize: 16, fontWeight: "700", color: T.dark },
  flightDetails: { flexDirection: "row", justifyContent: "space-around", marginTop: 14, paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#f0f0f0" },
  flightDetailLabel: { fontSize: 11, color: "#888" },
  flightDetailVal: { fontSize: 15, fontWeight: "700", color: T.dark, marginTop: 2 },
  widgetBtnOut: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, borderColor: "#ddd", alignItems: "center", marginTop: 12 },
  widgetBtnOutText: { fontSize: 13, fontWeight: "600", color: T.dark },
  widgetBtnFill: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: T.primary, alignItems: "center", marginTop: 12 },
  widgetBtnFillText: { fontSize: 13, fontWeight: "700", color: "#fff" },
  statusBadge: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: "600" },
  overlay: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 56 },
  backBtn: { fontSize: 15, color: T.primary, fontWeight: "600", marginBottom: 16 },
  overlayTitle: { fontSize: 22, fontWeight: "800", color: T.dark, marginBottom: 4 },
  overlaySub: { fontSize: 14, color: "#888", marginBottom: 24 },
  cardOption: { padding: 14, borderRadius: 14, borderWidth: 1.5, borderColor: "#e8e8e8", backgroundColor: "#fff", marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardOptionActive: { borderColor: T.primary, backgroundColor: "#f0fdfb" },
  cardIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#f5f5f5", alignItems: "center", justifyContent: "center" },
  cardName: { fontWeight: "600", fontSize: 15, color: T.dark },
  cardSub: { fontSize: 12, color: "#888" },
  sectionLabel: { fontSize: 12, fontWeight: "700", color: "#aaa", textTransform: "uppercase", marginBottom: 8, marginTop: 8, letterSpacing: 1.2 },
  flightRow: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  flightNum: { fontWeight: "700", fontSize: 15, color: T.dark },
  flightDest: { fontSize: 13, color: "#888", marginTop: 3 },
  menuOverlay: { flex: 1, flexDirection: "row" },
  menuBackdrop: { flex: 1, backgroundColor: "rgba(10,46,60,0.4)" },
  menuPanel: { width: 270, backgroundColor: "#fff", padding: 24, paddingTop: 56 },
  menuTitle: { fontSize: 22, fontWeight: "800", color: T.dark, marginBottom: 8 },
  menuSub: { fontSize: 12, color: T.primary, fontWeight: "600", marginBottom: 28, letterSpacing: 1 },
  menuItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#f0f0f0", flexDirection: "row", alignItems: "center", gap: 14 },
  menuItemText: { fontSize: 16, fontWeight: "500", color: T.dark },
});