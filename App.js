import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { C } from "./src/constants/theme";
import { AppProvider, useAppContext } from "./src/context/AppContext";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import FlightsScreen from "./src/screens/FlightsScreen";
import TSAScreen from "./src/screens/TSAScreen";
import WalletScreen from "./src/screens/WalletScreen";
import DutyFreeScreen from "./src/screens/DutyFreeScreen";
import ParkingScreen from "./src/screens/ParkingScreen";
import TicketScreen from "./src/screens/TicketScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

function AppNavigator() {
  const { currentScreen, setCurrentScreen, myFlight, setMyFlight } = useAppContext();

  const goHome = () => setCurrentScreen("home");

  const tabs = [
    { key: "home", label: "Home", icon: "\uD83C\uDFE0" },
    { key: "map", label: "Map", icon: "\uD83D\uDDFA\uFE0F" },
    { key: "flights", label: "Flights", icon: "\u2708\uFE0F" },
    { key: "ticket", label: "Ticket", icon: "\uD83C\uDFAB" },
  ];

  if (currentScreen === "welcome") return (
    <View style={{ flex: 1, backgroundColor: C.navy }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <WelcomeScreen onLogin={() => setCurrentScreen("home")} />
    </View>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen setScreen={setCurrentScreen} />;
      case "map":
        return <MapScreen myFlight={myFlight} goHome={goHome} />;
      case "flights":
        return <FlightsScreen myFlight={myFlight} setMyFlight={setMyFlight} goHome={goHome} />;
      case "tsa":
        return <TSAScreen goHome={goHome} />;
      case "wallet":
        return <WalletScreen goHome={goHome} />;
      case "dutyfree":
        return <DutyFreeScreen goHome={goHome} />;
      case "parking":
        return <ParkingScreen goHome={goHome} />;
      case "ticket":
        return <TicketScreen myFlight={myFlight} setMyFlight={setMyFlight} goHome={goHome} />;
      case "profile":
        return <ProfileScreen setScreen={setCurrentScreen} />;
      default:
        return <HomeScreen setScreen={setCurrentScreen} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.navy }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <View style={{
        backgroundColor: C.navy,
        paddingTop: 8,
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderTopColor: C.navyLight,
      }}>
        {tabs.map((t) => {
          const isActive = currentScreen === t.key || (t.key === "home" && ["tsa", "wallet", "dutyfree", "parking", "profile"].includes(currentScreen));
          return (
            <TouchableOpacity key={t.key} onPress={() => setCurrentScreen(t.key)} style={{ alignItems: "center", paddingHorizontal: 12, paddingVertical: 4 }}>
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

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
