import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { Svg, Circle, Path } from "react-native-svg";

export default function WelcomeScreen({ onComplete }) {
  const [screen, setScreen] = useState("welcome");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (screen === "signup") return (
    <View style={s.formBg}>
      <StatusBar barStyle="dark-content" />
      <View style={s.formInner}>
        <TouchableOpacity onPress={() => setScreen("welcome")}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.formTitle}>Create account</Text>
        <Text style={s.formSub}>Start navigating ONT like a pro.</Text>
        <Text style={s.label}>Full name</Text>
        <TextInput style={s.input} placeholder="e.g. Alex Rivera" value={name} onChangeText={setName} />
        <Text style={s.label}>Email</Text>
        <TextInput style={s.input} placeholder="you@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={s.label}>Password</Text>
        <TextInput style={s.input} placeholder="6+ characters" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={s.primaryBtn} onPress={() => setScreen("ready")}>
          <Text style={s.primaryBtnText}>Create account</Text>
        </TouchableOpacity>
        <Text style={s.switchText}>
          Already have an account?{" "}
          <Text style={s.switchLink} onPress={() => setScreen("login")}>Log in</Text>
        </Text>
      </View>
    </View>
  );

  if (screen === "login") return (
    <View style={s.formBg}>
      <StatusBar barStyle="dark-content" />
      <View style={s.formInner}>
        <TouchableOpacity onPress={() => setScreen("welcome")}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.formTitle}>Welcome back</Text>
        <Text style={s.formSub}>Log in to pick up where you left off.</Text>
        <Text style={s.label}>Email</Text>
        <TextInput style={s.input} placeholder="you@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={s.label}>Password</Text>
        <TextInput style={s.input} placeholder="Your password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={s.primaryBtn} onPress={() => setScreen("ready")}>
          <Text style={s.primaryBtnText}>Log in</Text>
        </TouchableOpacity>
        <Text style={s.switchText}>
          Don't have an account?{" "}
          <Text style={s.switchLink} onPress={() => setScreen("signup")}>Sign up</Text>
        </Text>
      </View>
    </View>
  );

  if (screen === "ready") return (
    <View style={s.hero}>
      <StatusBar barStyle="light-content" />
      <View style={s.checkCircle}>
        <Text style={{ fontSize: 36, color: "#fff" }}>✓</Text>
      </View>
      <Text style={s.readyTitle}>You're all set</Text>
      <Text style={s.readySubtitle}>Your ONT Navigator is ready. Find your gate, unlock lounge perks, and never miss a flight.</Text>
      <TouchableOpacity style={s.readyBtn} onPress={onComplete}>
        <Text style={s.readyBtnText}>Open the map</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={s.hero}>
      <StatusBar barStyle="light-content" />
      <View style={s.badge}>
        <Text style={s.badgeText}>ONTARIO INTERNATIONAL AIRPORT</Text>
      </View>
      <View style={s.logoBox}>
        <Text style={{ fontSize: 28, color: "#fff" }}>✈</Text>
      </View>
      <Text style={s.title}>ONT Navigator</Text>
      <Text style={s.tagline}>Your gate. Your lounge. Your flight.{"\n"}All in one tap.</Text>
      <View style={s.btnGroup}>
        <TouchableOpacity style={s.signupBtn} onPress={() => setScreen("signup")}>
          <Text style={s.signupBtnText}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.loginBtn} onPress={() => setScreen("login")}>
          <Text style={s.loginBtnText}>I already have an account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComplete}>
          <Text style={s.guestLink}>Continue as guest →</Text>
        </TouchableOpacity>
      </View>
      <Text style={s.footer}>KONT · SoCal · Since 1923</Text>
    </View>
  );
}

const s = StyleSheet.create({
  hero: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: "#0e9e8e" },
  badge: { backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 30, paddingVertical: 6, paddingHorizontal: 16, marginBottom: 40 },
  badgeText: { fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.9)", letterSpacing: 1.5 },
  logoBox: { width: 72, height: 72, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center", marginBottom: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.18)" },
  title: { fontSize: 34, fontWeight: "800", color: "#fff", marginBottom: 12 },
  tagline: { fontSize: 16, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 24, marginBottom: 48 },
  btnGroup: { width: "100%", maxWidth: 320, alignItems: "center" },
  signupBtn: { width: "100%", paddingVertical: 15, borderRadius: 14, backgroundColor: "#fff", alignItems: "center", marginBottom: 10 },
  signupBtnText: { fontSize: 16, fontWeight: "700", color: "#0e9e8e" },
  loginBtn: { width: "100%", paddingVertical: 15, borderRadius: 14, borderWidth: 2, borderColor: "rgba(255,255,255,0.35)", alignItems: "center" },
  loginBtnText: { fontSize: 15, fontWeight: "600", color: "#fff" },
  guestLink: { fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: "500", marginTop: 20 },
  footer: { position: "absolute", bottom: 28, fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 3, fontWeight: "600" },
  formBg: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
  formInner: { padding: 32 },
  back: { fontSize: 15, color: "#0e9e8e", fontWeight: "600", marginBottom: 24 },
  formTitle: { fontSize: 24, fontWeight: "700", color: "#0a2e3c", marginBottom: 4 },
  formSub: { fontSize: 14, color: "#666", marginBottom: 28 },
  label: { fontSize: 13, fontWeight: "600", color: "#444", marginBottom: 6, marginTop: 16 },
  input: { width: "100%", paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1.5, borderColor: "#ddd", fontSize: 15, backgroundColor: "#fafafa" },
  primaryBtn: { width: "100%", paddingVertical: 14, borderRadius: 14, backgroundColor: "#0e9e8e", alignItems: "center", marginTop: 24 },
  primaryBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  switchText: { textAlign: "center", marginTop: 16, fontSize: 13, color: "#888" },
  switchLink: { color: "#12b8a4", fontWeight: "600" },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  readyTitle: { fontSize: 26, fontWeight: "700", color: "#fff", marginBottom: 8 },
  readySubtitle: { fontSize: 15, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 22, marginBottom: 32, maxWidth: 280 },
  readyBtn: { backgroundColor: "#fff", paddingVertical: 14, paddingHorizontal: 48, borderRadius: 14 },
  readyBtnText: { fontSize: 16, fontWeight: "700", color: "#0e9e8e" },
});
