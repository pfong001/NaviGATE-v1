import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Dimensions, Animated } from "react-native";

const C = { navy: "#0c1b2e", navyLight: "#1a2d47", gold: "#c9a84c", goldLight: "#f5e6b8", goldBg: "#fdf8ec", white: "#fff", gray: "#8899aa", grayLight: "#e8ecf0", bg: "#f4f5f7" };
const { width: SCREEN_W } = Dimensions.get("window");

// ==================== DATA ====================
const PROMOS = [
  { id: 1, title: "Art of the Inland Empire", sub: "New exhibit \u00b7 Terminal 2 Gallery", bg: C.navyLight, accent: C.gold },
  { id: 2, title: "Holiday Travel Deals", sub: "Up to 30% off at ONT shops", bg: "#6b2a3a", accent: "#f5c6d0" },
  { id: 3, title: "Live Music Fridays", sub: "Jazz in Terminal 4 \u00b7 5\u20138 PM", bg: "#2a1a47", accent: "#d4b8f5" },
  { id: 4, title: "New: Mobile Parking", sub: "Pre-book & pay from your phone", bg: "#1a3a2a", accent: "#b8f5d4" },
];

const FEATURES = [
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

// ==================== WELCOME SCREEN ====================
function WelcomeScreen({ onComplete }) {
  const [screen, setScreen] = useState("welcome");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (screen === "signup") return (
    <View style={w.formBg}>
      <StatusBar barStyle="dark-content" />
      <View style={w.formInner}>
        <TouchableOpacity onPress={() => setScreen("welcome")}><Text style={w.back}>\u2190 Back</Text></TouchableOpacity>
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
        <TouchableOpacity onPress={() => setScreen("welcome")}><Text style={w.back}>\u2190 Back</Text></TouchableOpacity>
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
      <View style={w.checkCircle}><Text style={{ fontSize: 36, color: C.gold }}>\u2713</Text></View>
      <Text style={w.readyTitle}>You're all set</Text>
      <Text style={w.readySubtitle}>Your ONT Navigator is ready. Find your gate, unlock lounge perks, and never miss a flight.</Text>
      <TouchableOpacity style={w.readyBtn} onPress={onComplete}><Text style={w.readyBtnText}>Open the app</Text></TouchableOpacity>
    </View>
  );

  return (
    <View style={w.hero}>
      <StatusBar barStyle="light-content" />
      <View style={w.badge}><Text style={w.badgeText}>ONTARIO INTERNATIONAL AIRPORT</Text></View>
      <View style={w.logoBox}><Text style={{ fontSize: 28, color: C.gold }}>\u2708</Text></View>
      <Text style={w.title}>ONT Navigator</Text>
      <Text style={w.tagline}>{"Your gate. Your lounge. Your flight.\nAll in one tap."}</Text>
      <View style={w.btnGroup}>
        <TouchableOpacity style={w.signupBtn} onPress={() => setScreen("signup")}><Text style={w.signupBtnText}>Get started</Text></TouchableOpacity>
        <TouchableOpacity style={w.loginBtn} onPress={() => setScreen("login")}><Text style={w.loginBtnText}>I already have an account</Text></TouchableOpacity>
        <TouchableOpacity onPress={onComplete}><Text style={w.guestLink}>Continue as guest \u2192</Text></TouchableOpacity>
      </View>
      <Text style={w.footer}>KONT \u00b7 SoCal \u00b7 Since 1923</Text>
    </View>
  );
}

// ==================== HOME SCREEN ====================
function HomeScreen() {
  const [activePromo, setActivePromo] = useState(0);
  const scrollRef = useRef(null);

  // Auto-rotate promos every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromo(prev => {
        const next = (prev + 1) % PROMOS.length;
        scrollRef.current?.scrollTo({ x: next * (SCREEN_W - 40), animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function onPromoScroll(e) {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_W - 40));
    if (idx >= 0 && idx < PROMOS.length) setActivePromo(idx);
  }

  return (
    <View style={h.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={h.header}>
        <View>
          <Text style={h.headerSub}>ONTARIO INTERNATIONAL</Text>
          <Text style={h.headerTitle}>Good morning \u2708</Text>
        </View>
        <TouchableOpacity style={h.profileBtn}>
          <Text style={{ fontSize: 16 }}>\ud83d\udc64</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={h.scroll} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={h.searchWrap}>
          <Text style={{ fontSize: 14, color: C.gray }}>\ud83d\udd0d</Text>
          <TextInput style={h.searchInput} placeholder="Search gates, food, lounges, shops..." placeholderTextColor={C.gray} />
        </View>

        {/* Promo Carousel */}
        <View style={{ marginTop: 20 }}>
          <View style={h.sectionHeader}>
            <Text style={h.sectionTitle}>What's happening at ONT</Text>
            <Text style={h.sectionLink}>See all</Text>
          </View>
          <ScrollView ref={scrollRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onPromoScroll}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            decelerationRate="fast" snapToInterval={SCREEN_W - 40} snapToAlignment="start">
            {PROMOS.map(p => (
              <View key={p.id} style={[h.promoCard, { backgroundColor: p.bg, width: SCREEN_W - 40 }]}>  
                <Text style={h.promoTitle}>{p.title}</Text>
                <Text style={[h.promoSub, { color: p.accent }]}>{p.sub}</Text>
                <View style={h.promoBtn}><Text style={h.promoBtnText}>Learn more</Text></View>
              </View>
            ))}
          </ScrollView>
          <View style={h.dots}>
            {PROMOS.map((_, i) => (
              <View key={i} style={[h.dot, { width: i === activePromo ? 18 : 6, backgroundColor: i === activePromo ? C.gold : C.grayLight }]} />
            ))}
          </View>
        </View>

        {/* Feature Icons */}
        <View style={h.section}>
          <Text style={h.sectionTitle}>Quick access</Text>
          <View style={h.featureGrid}>
            {FEATURES.map(f => (
              <TouchableOpacity key={f.id} style={h.featureItem}>
                <View style={h.featureIcon}><Text style={{ fontSize: 22 }}>{f.icon}</Text></View>
                <Text style={h.featureLabel}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Business Ads */}
        <View style={[h.section, { paddingBottom: 30 }]}>
          <View style={h.sectionHeader}>
            <Text style={h.sectionTitle}>Explore ONT businesses</Text>
            <Text style={h.sectionLink}>View all</Text>
          </View>
          {ADS.map(ad => (
            <View key={ad.id} style={h.adCard}>
              <View style={{ flexDirection: "row", gap: 14 }}>
                <View style={[h.adIcon, { backgroundColor: ad.color + "18" }]}><Text style={{ fontSize: 26 }}>{ad.icon}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={h.adName}>{ad.name}</Text>
                  <Text style={h.adTag}>{ad.tag}</Text>
                  <Text style={h.adDesc}>{ad.desc}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                <TouchableOpacity style={h.adBtnOut}><Text style={h.adBtnOutText}>View details</Text></TouchableOpacity>
                <TouchableOpacity style={h.adBtnFill}><Text style={h.adBtnFillText}>Navigate</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={h.tabBar}>
        {[
          { icon: "\ud83c\udfe0", label: "Home", active: true },
          { icon: "\ud83d\uddfa", label: "Map", active: false },
          { icon: "\u2708", label: "My flight", active: false },
          { icon: "\ud83d\udc64", label: "Profile", active: false },
        ].map(tab => (
          <TouchableOpacity key={tab.label} style={h.tab}>
            <Text style={{ fontSize: 20 }}>{tab.icon}</Text>
            <Text style={[h.tabLabel, tab.active && { color: C.gold, fontWeight: "700" }]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ==================== APP ROOT ====================
export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  if (showWelcome) return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  return <HomeScreen />;
}

// ==================== WELCOME STYLES ====================
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

// ==================== HOME STYLES ====================
const h = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { backgroundColor: C.navy, paddingHorizontal: 20, paddingTop: 50, paddingBottom: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerSub: { fontSize: 11, color: C.gold, fontWeight: "600", letterSpacing: 1.5, marginBottom: 4 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: C.white },
  profileBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "rgba(201,168,76,0.3)" },
  scroll: { flex: 1 },
  searchWrap: { marginHorizontal: 20, marginTop: -18, backgroundColor: C.white, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 10, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 4, zIndex: 5 },
  searchInput: { flex: 1, fontSize: 15, color: C.navy },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: C.navy },
  sectionLink: { fontSize: 12, color: C.gold, fontWeight: "600" },
  section: { marginHorizontal: 20, marginTop: 24 },
  promoCard: { height: 140, borderRadius: 18, padding: 18, marginRight: 0, justifyContent: "center" },
  promoTitle: { fontSize: 18, fontWeight: "800", color: C.white, marginBottom: 6, lineHeight: 24 },
  promoSub: { fontSize: 12, fontWeight: "600" },
  promoBtn: { marginTop: 10, backgroundColor: "rgba(255,255,255,0.15)", alignSelf: "flex-start", paddingVertical: 5, paddingHorizontal: 14, borderRadius: 20 },
  promoBtnText: { fontSize: 11, fontWeight: "600", color: C.white },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 10 },
  dot: { height: 6, borderRadius: 3 },
  featureGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 2 },
  featureItem: { width: (SCREEN_W - 64) / 3, alignItems: "center", gap: 8, paddingVertical: 16, backgroundColor: C.white, borderRadius: 16, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
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
  tabBar: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10, paddingBottom: 20, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.grayLight },
  tab: { alignItems: "center", gap: 2 },
  tabLabel: { fontSize: 10, fontWeight: "500", color: C.gray },
});