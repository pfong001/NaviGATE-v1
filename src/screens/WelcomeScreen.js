import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";

export default function WelcomeScreen({ onLogin }) {
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
          <Text style={ws.bigIcon}>{"\u2708\uFE0F"}</Text>
          <Text style={ws.title}>Create Account</Text>
          <Text style={ws.subtitle}>Join ONT Navigator</Text>
        </View>
        <TextInput style={ws.input} placeholder="Full name" placeholderTextColor={C.gray} value={name} onChangeText={setName} />
        <Text style={ws.hint}>e.g. Alex Rivera</Text>
        <TextInput style={ws.input} placeholder="Email address" placeholderTextColor={C.gray} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={ws.input} placeholder="Your password" placeholderTextColor={C.gray} value={password} onChangeText={setPassword} secureTextEntry />
        <Text style={ws.hint}>6+ characters</Text>
        <TouchableOpacity style={ws.btnGold} onPress={onLogin}>
          <Text style={ws.btnGoldText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={ws.switchRow}>
          <Text style={ws.switchText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => setAuthPage("login")}>
            <Text style={ws.switchLink}>Log in</Text>
          </TouchableOpacity>
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
          <Text style={ws.bigIcon}>{"\u2708\uFE0F"}</Text>
          <Text style={ws.title}>Welcome Back</Text>
          <Text style={ws.subtitle}>Log in to ONT Navigator</Text>
        </View>
        <TextInput style={ws.input} placeholder="Email address" placeholderTextColor={C.gray} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={ws.input} placeholder="Password" placeholderTextColor={C.gray} value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={ws.btnGold} onPress={onLogin}>
          <Text style={ws.btnGoldText}>Log In</Text>
        </TouchableOpacity>
        <View style={ws.switchRow}>
          <Text style={ws.switchText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => setAuthPage("signup")}>
            <Text style={ws.switchLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={ws.container}>
      <TopSpacer />
      <StatusBar barStyle="light-content" />
      <View style={[ws.inner, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontSize: 64 }}>{"\u2708\uFE0F"}</Text>
        <Text style={ws.mainTitle}>ONT Navigator</Text>
        <Text style={ws.mainSub}>Ontario International Airport</Text>
        <TouchableOpacity style={[ws.btnGold, { width: "100%" }]} onPress={() => setAuthPage("signup")}>
          <Text style={ws.btnGoldText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ws.btnOutline, { width: "100%" }]} onPress={() => setAuthPage("login")}>
          <Text style={ws.btnOutlineText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogin}>
          <Text style={ws.guestText}>Continue as guest {"\u2192"}</Text>
        </TouchableOpacity>
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
